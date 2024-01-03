// BuildingBlocksTabs.js
import React from 'react';

const tabsData = [
  { id: 'boards', label: 'Boards' },
  { id: 'views', label: 'Views' },
  { id: 'dashboards', label: 'Dashboards' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'automations', label: 'Automations' },
  { id: 'apps', label: 'Apps' },
  { id: 'docs', label: 'Docs' },
];

export function BuildingBlocksTabs({ activeTab, onTabClick }) {
  return (
    <div className="building-blocks-tabs">
      {tabsData.map((tab) => (
        <div key={tab.id} className={`${tab.id} ${activeTab === tab.id ? 'active' : ''}`} onClick={() => onTabClick(tab.id)}>
          <img src="" alt={tab.label} />
          <span>{tab.label}</span>
        </div>
      ))}
    </div>
  );
}
