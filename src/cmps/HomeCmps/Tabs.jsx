// Tabs.js
import React from 'react';

const tabsData = [
  { id: 'work-management-tab', label: 'Work Management', description: 'Run all aspects of work' },
  { id: 'sales-crm-tab', label: 'Sales CRM', description: 'Manage your sales' },
  { id: 'dev-tab', label: 'Development', description: 'Run development tasks' },
];

export function Tabs({ activeTab, onTabClick }) {
  return (
    <div className="tabs">
      {tabsData.map((tab) => (
        <div key={tab.id} className={`${tab.id} ${activeTab === tab.id ? 'active' : ''}`} onClick={() => onTabClick(tab.id)}>
          <img src="" alt="" />
          <h2>{tab.label}</h2>
          <span>{tab.description}</span>
        </div>
      ))}
    </div>
  );
}
