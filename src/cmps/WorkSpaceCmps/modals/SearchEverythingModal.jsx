import { useEffect, useRef, useState } from 'react'
import { AddIcon, AddSmallIcon, ArchiveIcon, BookmarkIcon, CloseIcon, CloseSmallIcon, DoubleCheckIcon, FeedbackIcon, FileIcon, InfoIcon, MentionIcon, MenuIcon, NavigationChevronDownIcon, PersonIcon, SearchIcon, SettingsIcon, WorkIcon } from '../../Icons';
import { ContextBtn } from '../../ContextBtn';
import { NavLink } from 'react-router-dom';
import { HotTub, Light } from '@mui/icons-material';

export function SearchEverythingModal({ onClose }) {
  const { readUpdates, setReadUpdates } = useState(false)


  const modalRef = useRef()

  const handleClickOutside = (event) => {
    const isSearchButton = event.target.closest('[data-search-button="true"]');
    if (!modalRef.current || (!modalRef.current.contains(event.target) && !isSearchButton)) {
      onClose()
    }
  }

  useEffect(() => {
    const handleOutsideClick = (event) => handleClickOutside(event)
    window.addEventListener('mousedown', handleOutsideClick)

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [onClose])

  return (
    <>
      <div className="overlay"></div>

      <div className="search-modal flex column" ref={modalRef}>
        <div className="header flex column">
          <div className="search-input">
      <button onClick={onClose} className='relative btn-icon small-transparent' style={{ top: '-16px', right: '-1525px' }}><CloseIcon /></button>
            <input type="text" placeholder='Search Everything' />
          </div>
          <div className="filter-options flex space-between">
            <div className="right flex align-center gap8">
              <NavLink><button className='btn-txt medium-sec'>All</button></NavLink>
              <NavLink><button className='btn-txt medium-sec'>Croos Boards / 25</button></NavLink>
              <NavLink><button className='btn-txt medium-sec'>Updates</button></NavLink>
              <NavLink><button className='btn-txt medium-sec'>Files</button></NavLink>
              <NavLink><button className='btn-txt medium-sec'>People</button></NavLink>
              <NavLink><button className='btn-txt medium-sec'>Tags</button></NavLink>
            </div>
            <div className="left">
              <button className='btn-txt medium-sec'>Filter by date</button>
            </div>
          </div>
        </div>
        <div className="main-content flex wrap a">
          <div className="card">
            <div className="title flex align-center">
              <AddIcon />
              <h2>Hot Tags</h2>
            </div>
            <div className="content flex">
              
              <ul>
                <li className='flex gap8'><AddIcon />You can add a Tag column to any board. The most used tags will appear here.</li>
              </ul>
            </div>
          </div>
          <div className="card">
            <div className="title flex align-center">
              <AddIcon />
              <h2>Related to me</h2>
            </div>
            <div className="content flex">
              <ul className='flex column '>
                <li className='flex align-center gap8 btn-txt medium-sec'><AddSmallIcon /> I'm assigned to</li>
                <li className='flex align-center justify-start gap8 btn-txt medium-sec'><FileIcon />My Files</li>
                <li className='flex align-center gap8 btn-txt medium-sec'><ArchiveIcon /> Archived Boards</li>
                <li className='flex align-center gap8 btn-txt medium-sec'><MentionIcon /> I was mentioned</li>
                <li className='flex align-center gap8 btn-txt medium-sec'><MentionIcon />I was mentioned and didn't reply</li>
              </ul>
            </div>
          </div>
          <div className="card">
            <div className="title flex align-center gap8">
              <AddIcon />
              <h2>Saved Searches</h2>
            </div>
            <div className="content ">
              <ul>
                <li className='flex align-center justify-start gap8 btn-txt medium-sec'>
                  <div className="wrapper flex space-between gap16 align-center">
                    <div className="search-icon flex">

                      <SearchIcon />
                    </div>
                    <span>Placeholder</span>
                    <div className="exit-icon flex">
                      <CloseSmallIcon />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="card">
            <div className="title flex align-center">
              <AddIcon />
              <h2>Recent Searches</h2>
            </div>
            <div className="content flex align-center">
              <ul>
                <li className='flex gap8'><Light /> Here you'll find your recent searches. (Did you know? 93% of the time, people search for the same thing)</li>
              </ul>
            </div>
          </div>
          <div className="card">
            <div className="title flex align-center">
              <AddIcon />
              <h2>Quick Search Tip</h2>
            </div>
            <div className="content flex align-center">
              <ul>
                <li className='flex gap8'><Light /> Use this keyboard shortcut to find boards, dashboards and workspaces faster</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
