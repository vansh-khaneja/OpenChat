import os
from groq import Groq
import firebase_admin
from firebase_admin.firestore import Increment

from firebase_admin import credentials, firestore
cred = credentials.Certificate('file.json')

import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv('GROQ_API_KEY')

client = Groq(api_key=GROQ_API_KEY)
firebase_admin.initialize_app(cred)
db = firestore.client()


import psycopg2
import os

# Retrieve credentials from environment variables or directly input them
def fetch_all_data():
    data = []
    users_ref = db.collection('users')
    docs = users_ref.stream()
    for doc in docs:
        doc_data = doc.to_dict()
        data.append(doc_data)
    return data


def fetch_api_data(data,api_key):
    for doc in data:
        if 'api_key' in doc and doc['api_key'] == api_key:
            return doc
    return None




model_name = ""




def execute_query(query,url):
    conn = psycopg2.connect(
        url
    )

    # Create a cursor
    cursor = conn.cursor()

    try:
        # Execute the query
        cursor.execute(query)

        # Commit the changes for non-SELECT queries (like UPDATE)
        conn.commit()

        # Check if the query is SELECT and fetch rows
        if query.strip().lower().startswith('select'):
            rows = cursor.fetchall()
            return rows if rows else "No data found."
        else:
            return "Command executed successfully."

    except Exception as e:
        return f"Error: {str(e)}"
    finally:
        cursor.close()
        conn.close()


def rephrase_ans(question,response,api_key,chat_history):
    data = fetch_all_data()

    user_data = fetch_api_data(data,api_key)
    print("user",user_data)
    company_name = user_data["companyName"]
    selected_features = user_data["selectedFeatures"]


    if(user_data["selectedModel"] =="Llama 3"):
        model_name = "llama3-8b-8192"
    elif(user_data["selectedModel"] =="Llama 3.1"):
        model_name = "llama-3.1-70b-versatile"
    else:
        model_name = "gemma2-9b-it"
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": f"you are text to ecommerce customer support assisant for {company_name}"
            },
            {
                "role": "user",
                "content": f"This is the question {question} given by customer and this the database response {response}  along with thi chat history {chat_history} if needed for context for the given question rephrase the answer based on the question and dont start with something heres rephrased answer just give the answer what you formed.",
            }
        ],

        model=model_name,
        temperature=0.5,
    )
    return chat_completion.choices[0].message.content

import re
def find_order_id(text):
    # Regular expression to find an order ID (a sequence of digits)
    match = re.search(r'\b\d{4}\b', text)
    if match:
        return 0
    else:
        return 1



def guard_check(answer):
    print("=== LLAMA GUARD FILTER ===")

    client = Groq(api_key=GROQ_API_KEY)
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": answer,
            }
                ],
                model="llama-guard-3-8b",
            )
    return chat_completion.choices[0].message.content


def is_list(data):
  """Checks if the given data is a list."""
  return isinstance(data, list)


def inc_insights(feature_name,api_key_value):

    collection_name = 'users'


    query = db.collection(collection_name).where('api_key', '==', api_key_value)
    results = query.stream()

    for doc in results:
        print(f"Updating document {doc.id}")
        # You can now update fields in the matching document
        doc_ref = db.collection(collection_name).document(doc.id)
        
        doc_ref.update({
            feature_name: Increment(1)
        })
        print(f"Document {doc.id} updated successfully.")