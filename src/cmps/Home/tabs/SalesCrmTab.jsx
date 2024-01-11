import React from 'react'
import WmDark from '../../../assets/img/wm-dark.png'

import Sakes from '../../../assets/img/tabs/sales_pipeline.png'
import Contact from '../../../assets/img/tabs/contact.png'
import Lead from '../../../assets/img/tabs/lead.png'
import Capturing from '../../../assets/img/tabs/Capture.png'
import Projects from '../../../assets/img/tabs/projects (1).png'
import Marketing from '../../../assets/img/tabs/marketing (1).png'
import Onboarding from '../../../assets/img/tabs/onboarding.png'
import Other from '../../../assets/img/tabs/other.png'


export function SalesCrmTab() {
  return (
    <div className="sales-crm-tab flex group">
      <div className="sales-pipeline star-wrapper">
        <input type="checkbox" name="" id="" />
        <img src={Sakes} alt="" />
        <span>Sakes pipeline</span>
      </div>
      <div className="contact-management star-wrapper">
        <input type="checkbox" name="" id="" />
        <img src={Contact} alt="" />
        <span>Contact Management</span>
      </div>
      <div className="lead-management star-wrapper">
        <input type="checkbox" name="" id="" />
        <img src={Lead} alt="" />
        <span>Lead management</span>
      </div>
      <div className="lead-capturing star-wrapper">
        <input type="checkbox" name="" id="" />
        <img src={Capturing} alt="" />
        <span>Lead Capturing</span>
      </div>
      <div className="customer-projects star-wrapper">
        <input type="checkbox" name="" id="" />
        <img src={Projects} alt="" />
        <span>Customer Projects</span>
      </div>
      <div className="marketing-activities star-wrapper">
        <input type="checkbox" name="" id="" />
        <img src={Marketing}  alt="" />
        <span>Marketing activities</span>
      </div>
      <div className="customer-onboarding star-wrapper">
        <input type="checkbox" name="" id="" />
        <img src={Onboarding} alt="" />
        <span>Customer onboarding</span>
      </div>
      <div className="other star-wrapper">
        <input type="checkbox" name="" id="" />
        <img src={Other} alt="" />
        <span>Other</span>
      </div>
    </div>
  )
}
