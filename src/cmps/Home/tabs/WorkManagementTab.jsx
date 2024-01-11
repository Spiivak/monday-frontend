import React from 'react'
import Creative from '../../../assets/img/tabs/Creative.png'
import Operations from '../../../assets/img/tabs/ops.png'
import Marketing from '../../../assets/img/tabs/marketing.png'
import PMang from '../../../assets/img/tabs/Projects.png'
import Task from '../../../assets/img/tabs/Tasks.png'
import HR from '../../../assets/img/tabs/HR.png'
import IT from '../../../assets/img/tabs/IT.png'
import Worflow from '../../../assets/img/tabs/more.png'
export function WorkManagementTab() {
  return (
    <div className="work-management-tab flex group">
      <div className="creative-design star-wrapper">
        <input type="checkbox" name="" id="" />
        <img src={Creative} alt="" />
        <span>Creative & design</span>
      </div>
      <div className="operations star-wrapper">
        <input type="checkbox" name="" id="" />
        <img src={Operations} alt="" />
        <span>Operations</span>
      </div>
      <div className="marketing star-wrapper">
        <input type="checkbox" name="" id="" />
        <img src={Marketing} alt="" />
        <span>Marketing</span>
      </div>
      <div className="project-management star-wrapper">
        <input type="checkbox" name="" id="" />
        <img src={PMang} alt="" />
        <span>Project management</span>
      </div>
      <div className="task-management star-wrapper">
        <input type="checkbox" name="" id="" />
        <img src={Task} alt="" />
        <span>Task management</span>
      </div>
      <div className="hr star-wrapper">
        <input type="checkbox" name="" id="" />
        <img src={HR} alt="" />
        <span>HR</span>
      </div>
      <div className="it star-wrapper">
        <input type="checkbox" name="" id="" />
        <img src={IT} alt="" />
        <span>IT</span>
      </div>
      <div className="more-workflow star-wrapper">
        <input type="checkbox" name="" id="" />
        <img src={Worflow} alt="" />
        <span>More workflow</span>
      </div>
    </div>
  )
}
