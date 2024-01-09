import React from 'react'
import { utilService } from '../../../services/util.service'
import { BoardIcon, BoltIcon, FavoriteIcon, MwmIcon, NavigationChevronDownIcon, TestIcon } from '../../Icons'
import { useSelector } from 'react-redux'
import QuickBoard from '../../../assets/img/icons/quick_search_recent_board.svg'
import templates from '../../../assets/img/icons/templates-banner.png'
import Confeti from '../../../assets/img/icons/header-background-v2.svg'
import { useNavigate } from 'react-router'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Typography, styled } from '@mui/material'
import { ToolTip } from '../../ToolTip'

export function WorkspaceIndex() {
  const navigate = useNavigate()
  const boards = useSelector((storeState) => storeState.boardModule.boards)

  return (
    <section className='workspace-index test'>
      <div className="workspace-index-header full flex align-center space-between">

        <div className="greeting-section flex align-center">
          <div className="greetings">
            <span className='greeting'>{utilService.getGreeting()}, Spiivak</span>
            <p>Quickly access your recent boards, inboxs and workspaces</p>
          </div>
          <img src={Confeti} alt="" />
        </div>

        <div className="greeting-actions flex gap16">
          <button className='btn-txt medium-primary'>Give feedback</button>
          <button className='btn-ctn medium-primary flex gap8'>
            <BoltIcon />
            Quick Search
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="workspace-content">
          <h1 className='flex align-center gap8'><NavigationChevronDownIcon /> Recently Visited</h1>
          <div className="workspace-list">

            {boards.map(board => (
              <div key={board._id} className='workspace-card' onClick={() => navigate(`${board._id}`)}>
                <div className="img">
                  <img src={QuickBoard} alt="" />
                </div>
                <div className="board-title flex align-center space-between">
                  <div className="title flex align-center gap8">
                    <BoardIcon />
                    <span>{board.title}</span>
                  </div>
                  <ToolTip
                    title="Add to favorites"
                  >

                    <button className='btn-icon medium-transparent'>
                      <FavoriteIcon />
                    </button>
                  </ToolTip>
                </div>
                <div className="breadcrumbs flex gap8">
                  <MwmIcon />
                  <span className='flex gap4'>work management <NavigationChevronDownIcon /> Sprint 4</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="workspace-side">
          <div className='boost flex column'>
            <img src={templates} alt="" />
            <p>Boost your workflow in minutes with ready-made templates</p>
            <button className='btn-outline medium-sec'>Explore templates</button>
          </div>
        </div>
      </div>
    </section>
  )
}
