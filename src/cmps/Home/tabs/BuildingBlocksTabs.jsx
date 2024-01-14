// BuildingBlocksTabs.js
import React from 'react'
// import Board from '../../../assets/icons/Board.svg'
// import Views from '../../../assets/icons/Status.svg'
// import Dashboard from '../../../assets/icons/Dashboard.svg'
// import Integrations from '../../../assets/icons/Integrations.svg'
// import Robot from '../../../assets/icons/Robot.svg'
// import Apps from '../../../assets/icons/Apps.svg'
// import Doc from '../../../assets/icons/Doc.svg'

import {
  DocIcon,
  DashboardIcon,
  AppsIcon,
  RobotIcon,
  IntegrationsIcon,
  BoardIcon,
} from '../../Icons'
import { NavLink } from 'react-router-dom'

const tabsData = [
  { id: 'boards', label: 'Boards', svg: <BoardIcon /> },
  { id: 'views', label: 'Views', svg: <BoardIcon /> },
  { id: 'dashboards', label: 'Dashboards', svg: <DashboardIcon /> },
  { id: 'integrations', label: 'Integrations', svg: <IntegrationsIcon /> },
  { id: 'automations', label: 'Automations', svg: <RobotIcon /> },
  { id: 'apps', label: 'Apps', svg: <AppsIcon /> },
  { id: 'docs', label: 'Docs', svg: <DocIcon /> },
]

export function BuildingBlocksTabs({ activeTab, onTabClick }) {
  return (
    <div className="building-blocks-tabs flex justify-center align-center">
      {tabsData.map((tab) => (
        <NavLink key={tab.id}>
          <div
            className={`tab ${tab.id} flex column align-center ${
              activeTab === tab.id ? 'active' : ''
            }`}
            onClick={() => onTabClick(tab.id)}
          >
            {tab.svg}
            <span>{tab.label}</span>
          </div>
        </NavLink>
      ))}
    </div>
  )
}
