import React from 'react';
import WmDark from '../../assets/img/wm-dark.png';
import CrmDark from '../../assets/img/crm-dark.png';
import DevDark from '../../assets/img/dev-dark.png';

import WmColor from '../../assets/img/tabs/wm_color.png';
import CrmColor from '../../assets/img/tabs/CRM_color.png';
import DevColor from '../../assets/img/tabs/dev_color.png';

const tabsData = [
  {
    id: 'work-management-tab',
    label: 'Work Management',
    description: 'Run all aspects of work',
    darkImg: WmDark,
    colorImg: WmColor,
  },
  {
    id: 'sales-crm-tab',
    label: 'Sales CRM',
    description: 'Manage your sales',
    darkImg: CrmDark,
    colorImg: CrmColor,
  },
  {
    id: 'dev-tab',
    label: 'Development',
    description: 'Run development tasks',
    darkImg: DevDark,
    colorImg: DevColor,
  },
];

export function Tabs({ activeTab, onTabClick }) {
  return (
    <div className="tabs flex">
      {tabsData.map((tab) => (
        <div
          key={tab.id}
          className={`${tab.id} flex gap8 ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabClick(tab.id)}
        >
          <img
            src={activeTab === tab.id ? tab.colorImg : tab.darkImg}
            alt=""
          />
          <div className="tab-content flex column justify-center">
            <h2 className="tabs-header">{tab.label}</h2>
            <span className="tabs-desc">{tab.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
