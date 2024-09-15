import React from 'react';
import PropTypes from 'prop-types';
import { ChevronRight } from 'lucide-react';

const FeatureSection = ({
  title,
  features,
  type,
  selectedFeatures = [], // Default to empty array
  onFeatureSelect,
  columns,
  additionalDetails
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className={`grid gap-4 ${columns}`}>
        {features.map(feature => (
          <div
            key={feature.name}
            className={`flex flex-col border rounded-lg cursor-pointer ${selectedFeatures.includes(feature.name) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            onClick={() => onFeatureSelect(feature.name)}
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold">{feature.name}</h3>
              <p className="text-lg font-bold mt-2">{feature.price}</p>
            </div>
            {additionalDetails && (
              <div className="p-4 border-t">
                <ul className="list-disc list-inside space-y-2">
                  {feature.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="mr-2 h-4 w-4 text-gray-500" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Prop validation
FeatureSection.propTypes = {
  title: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      details: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  ).isRequired,
  type: PropTypes.string.isRequired,
  selectedFeatures: PropTypes.arrayOf(PropTypes.string), // Ensure this is an array
  onFeatureSelect: PropTypes.func.isRequired,
  columns: PropTypes.string.isRequired,
  additionalDetails: PropTypes.bool
};

export default FeatureSection;
