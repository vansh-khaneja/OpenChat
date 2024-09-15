import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

export default function FeatureCard({ feature, isSelected, onSelect }) {
  return (
    <Card 
      className={`shadow-md hover:shadow-lg transition-all duration-300 ${
        isSelected 
          ? 'border-indigo-500 bg-indigo-50' 
          : 'border-gray-300 hover:border-rose-300 hover:bg-rose-50'
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold text-indigo-700">{feature.name}</CardTitle>
        <Checkbox
          checked={isSelected}
          onCheckedChange={onSelect}
          className="border-indigo-500 text-indigo-500 focus:ring-indigo-500"
        />
      </CardHeader>
      <CardContent className="pt-2">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="secondary" className="text-sm font-semibold bg-rose-100 text-rose-600">
            {feature.price}
          </Badge>
        </div>
        {feature.details && (
          <ul className="space-y-1 mt-2">
            {feature.details.map((detail, index) => (
              <li key={index} className="flex items-start text-sm">
                <ChevronRight className="mr-1 h-4 w-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{detail}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}