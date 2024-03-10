// BloodPressureWidget.js

import React from 'react';

function BloodPressureWidget() {
  // Replace with actual data fetching logic
  const systolic = 120;
  const diastolic = 80;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-1/6 m-6">
      <h2 className="text-lg font-semibold mb-2">Blood Pressure</h2>
      <div className="flex justify-between">
        <div className="text-gray-600">Systolic</div>
        <div className="text-2xl font-semibold">{systolic}</div>
      </div>
      <div className="flex justify-between mt-2">
        <div className="text-gray-600">Diastolic</div>
        <div className="text-2xl font-semibold">{diastolic}</div>
      </div>
      <div className="w-full mt-4 relative">
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-400 to-yellow-500" style={{ width: `${systolic}%` }}></div>
        </div>
        <div className="absolute top-0 right-0 transform translate-y-1/2 translate-x-1/2 h-3 w-3 bg-white border-2 border-gray-200 rounded-full"></div>
      </div>
    </div>
  );
}

export default BloodPressureWidget;
