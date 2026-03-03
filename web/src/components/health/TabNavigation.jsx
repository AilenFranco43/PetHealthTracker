import React from 'react';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'vaccines', label: 'Vacunas' },
    { id: 'checkups', label: 'Chequeos' },
    { id: 'treatments', label: 'Tratamientos' }
  ];

  return (
    <div className="bg-gray-200 rounded-xl p-1 mb-6 flex gap-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex-1 h-9 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
            activeTab === tab.id 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;