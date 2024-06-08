import React from 'react';

const Features = () => {
  const features = [
    { id: 1, text: 'Cost friendly' },
    { id: 2, text: 'Safe and strong cylinders' },
    { id: 3, text: 'Quick gas connection' },
    { id: 4, text: 'Accurate & superior quality LPG delivered at your footsteps' },
    { id: 5, text: 'Strict adherence to safety rules and guidelines' },
    { id: 6, text: 'Most preferred & customer friendly LPG suppliers' },
  ];

  return (
    <div className="relative p-8 bg-gray-50">
      <h2 className="text-4xl font-bold text-orange-500 text-center mb-8">Why Us</h2>
      <div className="grid grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <div className="w-12 h-12 bg-orange-500 flex items-center justify-center text-white font-bold rounded-full">
              {feature.id}
            </div>
            <p className="ml-4">{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
