import React, { useState, useEffect } from 'react';
import BloodPressureWidget from '../widgets/BloodPressureWidget';
import BloodSugarWidget from '../widgets/BloodSugarWidget';
import BottomNav from '../components/BottomNav';


function DashBoard() {

  return (
    <>
      <div className="flex"><BloodPressureWidget /><BloodSugarWidget /></div>
      <BottomNav/>
    </>
  );
}

export default DashBoard;
