import React from 'react'

const ServiceCard = ({ icon: Icon, title, description, color }) => { 
  return (
    <div className="p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border h-full space-y-6">

      <div
        className={`w-14 h-14 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center shadow-lg`}
      >
        <Icon className="text-white w-7 h-7" />
      </div>

      <h3 className="text-xl text-gray-900">
        {title}
      </h3>

      <p className="text-base text-gray-600 leading-relaxed">
        {description}
      </p>

    </div>
  );
}

export default ServiceCard
