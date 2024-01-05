// BuildingBlocksTabs.js
import React from 'react'
import Board from '../../../assets/icons/Board.svg'
import Views from '../../../assets/icons/Status.svg'
import Dashboard from '../../../assets/icons/Dashboard.svg'
import Integrations from '../../../assets/icons/Integrations.svg'
import Robot from '../../../assets/icons/Robot.svg'
import Apps from '../../../assets/icons/Apps.svg'
import Doc from '../../../assets/icons/Doc.svg'
import { NavLink } from 'react-router-dom'

const tabsData = [
  { id: 'boards', label: 'Boards', svg: Board },
  { id: 'views', label: 'Views', svg: Views },
  { id: 'dashboards', label: 'Dashboards', svg: Dashboard },
  { id: 'integrations', label: 'Integrations', svg: Integrations },
  { id: 'automations', label: 'Automations', svg: Robot },
  { id: 'apps', label: 'Apps', svg: Apps },
  { id: 'docs', label: 'Docs', svg: Doc },
]

export function BuildingBlocksTabs({ activeTab, onTabClick }) {
  return (
    <div className="building-blocks-tabs flex justify-center align-center">
      {tabsData.map((tab) => (
        <NavLink>
          <div
            key={tab.id}
            className={`tab ${tab.id} flex column align-center ${
              activeTab === tab.id ? 'active' : ''
            }`}
            onClick={() => onTabClick(tab.id)}
          >
            <picture>
              <img src={tab.svg} alt={tab.label} />
            </picture>
            <span>{tab.label}</span>
          </div>
        </NavLink>
      ))}
    </div>
  )
}
