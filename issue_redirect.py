from groq import Groq
import re
from utils import fetch_api_data,fetch_all_data,inc_insights
from utils import execute_query


import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv('GROQ_API_KEY')

client = Groq(api_key=GROQ_API_KEY)

# Load the JSON data from file

# Accessing different parts of the data



model_name = ""
connect = 0

def fetch_issue(query,model,url,chat_history):
    #cleaned_his = remove_quotes(chat_history)
    phone_number = extract_ten_digit_number(str(chat_history))
    clean_his = remove_quotes(str(chat_history))
    print(phone_number)
    print(clean_his)


    if(phone_number=="No 10-digit number found"):
        return "Please provide your phone number so i can connect you with team"
    else:
    #phone_number = execute_query(f"SELECT phone_number FROM customers WHERE user_id = {user_id}")[0][0]
    #chat_history = remove_quotes(chat_history)
    #print(user_id,phone_number)
        execute_query(f"INSERT INTO issues (phone_number, chat_history) VALUES ({phone_number}, '{str(clean_his)}');",url)
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "you are expert customer support agent which transfers the chat to manager who will call up the cutomer with in few minutes"
                },
                {
                    "role": "user",
                    "content": "Just reply somthing like we have forwarded your issue or you will recieve a call shortly",
                }
            ],

            model=model,
            temperature=0.5,
        )
        print(chat_completion.choices[0].message.content)
        return chat_completion.choices[0].message.content


def issue_data_retrieve(state):
    global connect
    print("sit")
    """
    Retrieve documents

    Args:
        state (dict): The current graph state

    Returns:
        state (dict): New key added to state, documents, that contains retrieved documents
    """
    print("---RETRIEVE---")
    question = state["question"]
    api_key = state["api_key"]
    chat_history = state["chat_history"]
    print(chat_history)
    data = fetch_all_data()
    inc_insights("connect_insights",api_key)


    user_data = fetch_api_data(data,api_key)
    selected_features = user_data["selectedFeatures"]
    postgresUrl = user_data["postgresUrl"]

    if("Connect" in selected_features):
        connect = 1

    if(user_data["selectedModel"] =="Llama 3"):
        model_name = "llama3-8b-8192"
    elif(user_data["selectedModel"] =="Llama 3.1"):
        model_name = "llama-3.1-70b-versatile"
    else:
        model_name = "gemma2-9b-it"



    if(connect==0):
        return {"answer": "Subscriber hasn't purchased this feature yet", "question": question}
    # Retrieval
    answer = fetch_issue(question,model_name,postgresUrl,chat_history)
    print(answer)
    return {"answer": answer, "question": question}



def extract_ten_digit_number(text):
    # Regular expression to find a 3-digit number
    match = re.search(r'\b\d{10}\b', text)
    
    if match:
        return match.group()
    else:
        return "No 10-digit number found"

def remove_quotes(input_string):
    # Remove double quotes
    no_double_quotes = input_string.replace('"', '')
    # Remove single quotes
    no_quotes = no_double_quotes.replace("'", '')
    return no_quotes


# query = "This is the issue user id 103"

# user_id = extract_three_digit_number(query)
# phone_number = execute_query(f"SELECT phone_number FROM customers WHERE user_id = {user_id}")[0][0]
# execute_query(f"INSERT INTO issues (user_id, phone_number, chat_history) VALUES ({user_id}, {phone_number}, '{query}');")

# print( user_id, phone_number)
#execute_query(f"INSERT INTO issues (user_id, phone_number, chat_history) VALUES ({user_id}, {phone_number}, '{query}');")


# fetch_issue("[User : My issues is not resolved can you please conect me to the support team,Chat : Please provide the phone number, User :my phone number is 7529928842] ")ewA