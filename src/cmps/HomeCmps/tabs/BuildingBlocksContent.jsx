// BuildingBlocksContent.js
import React from 'react';
import Video from '../../../assets/img/7_status.mp4'

const tabsData = {
  boards: {
    content: 'Everything starts with a visual board — the core of monday.com Work OS. Tailor it your way and manage anything from projects to departments.',
  },
  views: {
    content: 'Content for Views tab.',
  },
  dashboards: {
    content: 'Content for Dashboards tab.',
  },
  integrations: {
    content: 'Content for Integrations tab.',
  },
  automations: {
    content: 'Content for Automations tab.',
  },
  apps: {
    content: 'Content for Apps tab.',
  },
  docs: {
    content: 'Content for Docs tab.',
  },
};

export function BuildingBlocksContent({ activeTab }) {
  return (
    <div className="iframe-info">
      <iframe src={Video}></iframe>
      <div className="info">
        <h2>{tabsData[activeTab].label}</h2>
        <p>{tabsData[activeTab].content}</p>
      </div>
    </div>
  );
}
