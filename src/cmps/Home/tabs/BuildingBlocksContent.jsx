// BuildingBlocksContent.js
import React from 'react'
import Boards from '../../../assets/img/7_status.mp4'
import Views from '../../../assets/img/1_Views.mp4'
import Integrations from '../../../assets/img/4_Integrations.mp4'
import Dashboards from '../../../assets/img/2_Dashboards.mp4'
import Automations from '../../../assets/img/3_Automations.mp4'
import Apps from '../../../assets/img/5_Apps.mp4'
import Docs from '../../../assets/img/6_Docs.mp4'

const tabsData = {
  boards: {
    label: 'Boards',
    video: Boards,
    content:
      'Everything starts with a visual board — the core of monday.com Work OS. Tailor it your way and manage anything from projects to departments.',
  },
  views: {
    label: 'Views',
    video: Views,
    content:
      'Visualize and plan your work more efficiently with multiple views: Kanban board, calendar, timeline, Gantt chart, and more.',
  },
  dashboards: {
    label: 'Dashboards',
    video: Dashboards,
    content:
      'Get the insights you need to make decisions with confidence. Keep track of progress, timelines, and budgets with custom dashboards.',
    link: 'Learn more',
  },
  integrations: {
    label: 'Integrations',
    video: Integrations,
    content:
      'Connect monday.com with all your favorite tools and get more work done. Integrate Slack, Dropbox, Adobe Creative Cloud, and more.',
    link: 'Learn more',
  },
  automations: {
    label: 'Automations',
    video: Automations,
    content:
      'Streamline processes to focus on the work that matters. Choose from a variety of automation recipes or create your own in minutes.',
    link: 'Learn more',
  },
  apps: {
    label: 'Apps',
    video: Apps,
    content:
      'Expand the capabilities of your Work OS with monday apps. Enhance your workflows with custom views, widgets, integrations, and more.',
    link: 'Learn more',
  },
  docs: {
    label: 'Docs',
    video: Docs,
    content:
      'Transform text into action items, in just a few clicks. Connect, collaborate, and execute ideas and workflows in real-time from any doc.',
    link: 'Learn more',
  },
}

export function BuildingBlocksContent({ activeTab }) {
  return (
    <div className="iframe-info flex gap16">
      <div className="iframe-info-video">
        <video src={tabsData[activeTab].video} autoPlay></video>
      </div>
      <div className="info">
        <h2>{tabsData[activeTab].label}</h2>
        <p>{tabsData[activeTab].content}</p>
        {tabsData[activeTab]?.link && <a href="">{tabsData[activeTab].link}</a>}
      </div>
    </div>
  )
}
