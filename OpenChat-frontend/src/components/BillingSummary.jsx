import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function BillingSummary({ isOpen, onClose, onProceed, model, addons, models, features, advancedFeatures }) {
  const selectedModel = models.find(m => m.name === model);
  const selectedFeatures = features.filter(f => addons.includes(f.name));
  const selectedAdvancedFeatures = advancedFeatures.filter(f => addons.includes(f.name));

  const calculateTotal = () => {
    const modelPrice = selectedModel ? parseInt(selectedModel.price.replace('rs', '')) || 0 : 0;
    const addonsPrice = [...selectedFeatures, ...selectedAdvancedFeatures].reduce((total, addon) => total + (parseInt(addon.price.replace('rs', '')) || 0), 0);
    return modelPrice + addonsPrice;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-b from-indigo-50 via-white to-rose-50 border border-gray-300 rounded-lg shadow-lg p-6">
        <DialogHeader className="bg-indigo-50 border-b border-indigo-100 p-4 rounded-t-lg">
          <DialogTitle className="text-2xl font-bold text-indigo-700">Billing Summary :-</DialogTitle>
        </DialogHeader>
        <div className="mt-4 max-h-[60vh] overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-indigo-700">Selected Model :-</h3>
              <p>{selectedModel ? `${selectedModel.name} - ${selectedModel.price}/month` : 'No model selected'}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-indigo-700">Selected Features :-</h3>
              {selectedFeatures.length > 0 ? (
                <ul className="list-disc list-inside">
                  {selectedFeatures.map(feature => (
                    <li key={feature.name} className="text-gray-700">{feature.name} - {feature.price}/month</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700">No features selected</p>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-indigo-700">Selected Advanced Features :-</h3>
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
            <div className="pt-4 border-t border-indigo-100">
              <h3 className="text-xl font-bold text-indigo-700">Total: {calculateTotal()}rs/month</h3>
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-between mt-6 p-4  border-t border-gray-200 rounded-b-lg">
          <Button variant="outline" onClick={onClose} className="bg-white border-gray-300 text-indigo-700 hover:bg-indigo-50">
            Close
          </Button>
          <Button onClick={onProceed} className="bg-gradient-to-r from-indigo-500 to-rose-500 text-white hover:from-indigo-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-300 shadow-lg">
            Proceed to Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
