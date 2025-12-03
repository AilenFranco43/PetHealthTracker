import React, { useState } from 'react';

import TabNavigation from '../components/common/TabNavigation'
import AddButton from '../components/common/AddButton'
import BottomNav from '../components/common/BottomNav'
import VaccinasTab from '../components/health/VaccinasTab'
import ChequeosTab from '../components/health/ChequeosTab'
import TratamientosTab from '../components/health/TratamientosTab'
import Header from '../components/common/Header';

const HealthSection = () => {

     const [activeTab, setActiveTab] = useState('vaccines');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
    

      <Header/>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <AddButton activeTab={activeTab} />
        
        <div className="space-y-4">
          {activeTab === 'vaccines' && <VaccinasTab />}
          {activeTab === 'checkups' && <ChequeosTab />}
          {activeTab === 'treatments' && <TratamientosTab />}
        </div>
      </div>

      <BottomNav />
      <div className="h-20 lg:hidden"></div>
    </div>
  )
}

export default HealthSection