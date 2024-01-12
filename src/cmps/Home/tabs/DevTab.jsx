import React from 'react'
import Planning from '../../../assets/img/tabs/Road.png'
import Backlog from '../../../assets/img/tabs/backlog.png'
import Sprint from '../../../assets/img/tabs/sprint.png'
import Retro from '../../../assets/img/tabs/retro.png'
import Bug from '../../../assets/img/tabs/bug.png'
import Agile from '../../../assets/img/tabs/projects (2).png'
import Release from '../../../assets/img/tabs/release.png'
import Other from '../../../assets/img/tabs/other (1).png'

export function DevTab() {
  return (
    <div className="dev-tab flex group">
      <div className="roadmap-planning star-wrapper">
        <input type="checkbox" name="" id="" />
        <img src={Planning} alt="" />
        <span>Roadmap planing</span>
      </div>
      <div className="feature-backlog star-wrapper">
        <input type="checkbox" name="" id="" />
        <img src={Backlog} alt="" />
        <span>Feature backlog</span>
      </div>
      <div className="spring-management star-wrapper">
        <input type="checkbox" name="" id="" />
        <img src={Sprint} alt="" />
        <span>Sprint management</span>
      </div>
      <div className="retrospectives star-wrapper">
        <input type="checkbox" name="" id="" />
        <img src={Retro} alt="" />
        <span>Retrospectives</span>
      </div>
      <div className="bug-tracking star-wrapper">
        <input type="checkbox" name="" id="" />
        <img src={Bug} alt="" />
        <span>Bug Tracking</span>
      </div>
      <div className="agile-projects star-wrapper">
        <input type="checkbox" name="" id="" />
        <img src={Agile} alt="" />
        <span>Agile Projects</span>
      </div>
      <div className="release-plan star-wrapper">
        <input type="checkbox" name="" id="" />
        <img src={Release} alt="" />
        <span>Release Plan</span>
      </div>
      <div className="other star-wrapper">
        <input type="checkbox" name="" id="" />
        <img src={Other} alt="" />
        <span>Other</span>
      </div>
    </div>
  )
}
