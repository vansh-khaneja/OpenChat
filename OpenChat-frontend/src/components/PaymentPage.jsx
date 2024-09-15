import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ClipboardIcon } from '@heroicons/react/24/outline';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '@/components/firebase-config'; // Ensure correct path
import { useRouter } from 'next/navigation'

export default function PaymentPage({ isOpen, onClose, userData, selectedFeatures, models, features, advancedFeatures }) {
  const [apiKey, setApiKey] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter()

  const selectedModel = models.find(m => m.name === selectedFeatures.model);
  const selectedRegularFeatures = features.filter(f => selectedFeatures.feature.includes(f.name));
  const selectedAdvancedFeatures = advancedFeatures.filter(f => selectedFeatures.advancedFeature.includes(f.name));

  const handleNavigate = () => {
    router.push('/testing')
  }
  const calculateTotal = () => {
    const modelPrice = selectedModel ? parseInt(selectedModel.price.replace('rs', '')) || 0 : 0;
    const regularFeaturesPrice = selectedRegularFeatures.reduce((total, feature) => total + (parseInt(feature.price.replace('rs', '')) || 0), 0);
    const advancedFeaturesPrice = selectedAdvancedFeatures.reduce((total, feature) => total + (parseInt(feature.price.replace('rs', '')) || 0), 0);
    return modelPrice + regularFeaturesPrice + advancedFeaturesPrice;
  };

  const generateApiKey = () => {
    return Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
        const newApiKey = generateApiKey();
        setApiKey(newApiKey);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Prepare data to be sent
        const purchaseData = {
            ...userData,
            selectedModel: selectedModel.name,
            selectedFeatures: selectedRegularFeatures.map(f => f.name),
            selectedAdvancedFeatures: selectedAdvancedFeatures.map(f => f.name),
            api_key: newApiKey,
            totalCost: calculateTotal(),
            timestamp: new Date()
        };

        // Log the data to be sent
        console.log('Sending data to Firebase:', purchaseData);

        // Send data to Firebase
        if (userData.id) {
            const docRef = doc(db, 'users', userData.id); // Use userData.id as document ID
            await setDoc(docRef, purchaseData, { merge: true });
            console.log('Purchase data sent to Firebase with ID:', userData.id);
        } else {
            console.error('User ID is missing.');
        }
    } catch (error) {
        console.error('Error processing payment:', error);
    } finally {
        setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey).then(() => {
      alert('API Key copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy API Key:', err);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] bg-gradient-to-b from-indigo-50 via-white to-rose-50 border border-gray-300 rounded-lg shadow-lg p-6">
        <DialogHeader className="bg-indigo-50 border-b border-indigo-100 p-2 rounded-t-lg">
          <DialogTitle className="text-xl font-bold text-indigo-700">Purchase Details :-</DialogTitle>
        </DialogHeader>
        <div className="mt-1 max-h-[60vh] overflow-y-auto">
          <div className="space-y-6">
            {userData ? (
              <div>
                <h3 className="text-base font-semibold text-indigo-700">Company Details :-</h3>
                <p>Company Name: {userData.companyName}</p>
                <p>Bot Name: {userData.botName}</p>
                <p>Postgres URL: {userData.postgresUrl}</p>
                {/* Include more fields if needed */}
              </div>
            ) : (
              <Alert variant="destructive" className="text-indigo-700">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>User data is missing. Please go back and fill in your details.</AlertDescription>
              </Alert>
            )}
            <div>
              <h3 className="text-base font-semibold text-indigo-700">Selected Model</h3>
              <p>{selectedModel ? `${selectedModel.name} - ${selectedModel.price}/month` : 'No model selected'}</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-indigo-700">Selected Features :-</h3>
              {selectedRegularFeatures.length > 0 ? (
                <ul className="list-disc list-inside">
                  {selectedRegularFeatures.map(feature => (
                    <li key={feature.name} className="text-gray-700">{feature.name} - {feature.price}/month</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700">No features selected</p>
              )}
            </div>
            <div>
              <h3 className="text-base font-semibold text-indigo-700">Selected Advanced Features :-</h3>
              {selectedAdvancedFeatures.length > 0 ? (
                <ul className="list-disc list-inside">
                  {selectedAdvancedFeatures.map(feature => (
                    <li key={feature.name} className="text-gray-700">{feature.name} - {feature.price}/month</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700">No advanced features selected</p>
              )}
            </div>
            <div className="border-t border-indigo-100 text-center pt-4">
              <h3 className="text-xl font-bold text-indigo-700">Total: {calculateTotal()}rs/month</h3>
            </div>
          </div>
        </div>
        {apiKey ? (
          <Alert className="flex flex-col items-center text-center mt-4 bg-gradient-to-r from-indigo-100 to-rose-100">
            <div className="flex flex-col items-center">
              <AlertTitle className="text-base font-semibold text-indigo-700">API Key Generated</AlertTitle>
              <div className="flex items-center">
                <AlertDescription className="mr-2 font-bold text-gray-700">
                  Your API Key: &nbsp;
                  {apiKey}
                </AlertDescription>
                <Button variant="outline" onClick={copyToClipboard} className="flex items-center bg-white border-gray-300 text-indigo-700 hover:bg-indigo-50">
                  <ClipboardIcon className="w-4 h-4 mr-2" />
                  Copy
                </Button>

                <Button 
            variant="outline" onClick={handleNavigate} className="flex items-center bg-indigo-500 border-gray-300 text-white hover:bg-indigo-50 ml-3"
          >
            Test API
          </Button>
              </div>
            </div>
          </Alert>
        ) : (
          <DialogFooter className="flex justify-between mt-4 p-2  border-t border-gray-200 rounded-b-lg">
            <Button variant="outline" onClick={onClose} className="bg-white border-gray-300 text-indigo-700 hover:bg-indigo-50">
              Cancel
            </Button>
            <Button onClick={handlePayment} disabled={isProcessing || !userData} className="bg-gradient-to-r from-indigo-500 to-rose-500 text-white hover:from-indigo-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-300 shadow-lg">
              {isProcessing ? 'Processing...' : 'Process Payment'}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
