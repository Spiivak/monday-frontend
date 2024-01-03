import React, { useState } from 'react'
import { HomeHeader } from '../cmps/HomeCmps/HomeHeader'
import QuerterlyRoadmap from '../assets/img/quarterly-roadmap.avif'
import { Tabs } from '../cmps/HomeCmps/Tabs'
import { WorkManagementTab } from '../cmps/HomeCmps/tabs/WorkManagementTab';
import { SalesCrmTab } from '../cmps/HomeCmps/tabs/SalesCrmTab';
import { DevTab } from '../cmps/HomeCmps/tabs/DevTab';

import TimeLine from '../assets/img/Timeline_column.png'
import Status from '../assets/img/Status_column.png'
import Battery from '../assets/img/Battery.png'
import Integration from '../assets/img/Integration.avif'
import Pie from '../assets/img/Pie.png'
import Mobile from '../assets/img/MobileApp.avif'
import Automation from '../assets/img/Automation.avif'
import Comment from '../assets/img/Talk.avif'
import Dashboard from '../assets/img/Dash.avif'
import Video from '../assets/img/7_status.mp4'
import { BuildingBlocksTabs } from '../cmps/HomeCmps/tabs/BuildingBlocksTabs';
import { BuildingBlocksContent } from '../cmps/HomeCmps/tabs/BuildingBlocksContent';

import Holt from '../assets/img/companies/HoltCat.avif'
import Canva from '../assets/img/companies/canva.png'
import CocaCola from '../assets/img/companies/coca_cola.png'
import Oxy from '../assets/img/companies/oxy.png'
import Lionstage from '../assets/img/companies/lionsgate.avif'
import Carrefour from '../assets/img/companies/carrefour.png'
import OBD from '../assets/img/companies/bd.png'
import Glossier from '../assets/img/companies/glossier.png'
import Universal from '../assets/img/companies/universal.png'




export function HomePage() {
  const [activeTab, setActiveTab] = useState('work-management-tab');
  const [buildingBlocksTab, setBuildingBlocksTab] = useState('boards');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleBuildingBlocksTabClick = (tab) => {
    setBuildingBlocksTab(tab);
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'work-management-tab':
        return <WorkManagementTab />
      case 'sales-crm-tab':
        return <SalesCrmTab />
      case 'dev-tab':
        return <DevTab />
      default:
        return null;
    }
  }
  return (
    <section className='home-page page'>
      <HomeHeader />
      <main>
        <section className="hero-section">
          <h1 className='hero-section-header'>A platform built for a <br /> new way of working</h1>
          <h2 className='hero-section-header2'>What would you like to manage?</h2>
          <Tabs activeTab={activeTab} onTabClick={handleTabClick} />
          <div className="tabs-preview flex column">
            {renderTabContent()}
            <div className="tabs-preview-actions flex column align-center">
              <button className='get-started-btn'>Get Started</button>
              <span className='tabs-preview-info'>No credit card needed ✦ Unlimited time on Free plan</span>
            </div>
          </div>
          <div style={{ minHeight: '32vw' }}>
            <img src={QuerterlyRoadmap} alt="" />
          </div>
        </section>
        <section className="top-logos-section flex column align-center justify-center">
          <h2>Trusted by 180,000+ customers worldwide</h2>
          <div className="logos flex justify-center">
            <div className="images-logos-wrapper">
              <div className="images-gallery">
                <div className="images-gallery-row">
                  <div className="img-gallery"><picture><img src={Holt} alt="Holt" /></picture></div>
                  <div className="img-gallery"><picture><img src={Canva} alt="Canva" /></picture></div>
                  <div className="img-gallery"><picture><img src={CocaCola} alt="Coca Cola" /></picture></div>
                  <div className="img-gallery"><picture><img src={Oxy} alt="Oxy" /></picture></div>
                  <div className="img-gallery"><picture><img src={Lionstage} alt="Lionstage" /></picture></div>
                  <div className="img-gallery"><picture><img src={Carrefour} alt="carrefour" /></picture></div>
                  <div className="img-gallery"><picture><img src={OBD} alt="OBD" /></picture></div>
                  <div className="img-gallery"><picture><img src={Glossier} alt="Glossier" /></picture></div>
                  <div className="img-gallery"><picture><img src={Universal} alt="Universal" /></picture></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="boost-your-team">
          <h2>The Work OS that lets you
            shape workflows, your way
          </h2>
          <div className="boost-your-team-cta">
            <span>Boost your team’s alignment, efficiency, and productivity by customizing any workflow to fit your needs.</span>
            <button>Get Started</button>
          </div>
        </section>
        <section className="preview-images-section">
          <img src={TimeLine} alt="" />
          <img src={Status} alt="" />
          <img src={Battery} alt="" />
          <img src={Integration} alt="" />
          <img src={Pie} alt="" />
          <img src={Mobile} alt="" />
          <img src={Automation} alt="" />
          <img src={Comment} alt="" />
          <img src={Dashboard} alt="" />
        </section>
        <section className="scroll-paralex">
          <div className="paralex1">
            <h2>Streamline your work for
              maximum productivity
            </h2>
            <p>
              Centralize all your work, processes, tools, and files into one Work OS. Connect teams, bridge silos, and maintain one source of truth across your organization.
            </p>
            <div className="user-comment">
              <div className="avatar">
                <img src="" alt="Avatar" />
              </div>
              <div className="comment">
                <span>“
                  We use monday.com for a plethora of use cases, the opportunities this platform provides are limitless.”</span>
                <span>Jane Tham</span> | <span>VP of Collaboration Technologies</span>
                <span>Universal Music Group</span>
              </div>
            </div>
          </div>
          <div className="paralex2">
            <h2>Bring teams together to drive business impact</h2>
            <p>
              Collaborate effectively organization-wide to get a clear picture of all your work. Stay in the loop with easy-to-use automations and real-time notifications.
            </p>
            <div className="user-comment">
              <div className="avatar">
                <img src="" alt="Avatar" />
              </div>
              <div className="comment">
                <span>“Since adopting monday.com, our global marketing department has seen a 40% improvement in cross-team collaboration.”</span>
                <span>Sarah Pharr</span> | <span>AVP Marketing</span>
                <span>Genpact</span>
              </div>
            </div>
          </div>
          <div className="paralex3">
            <h2>Stay on track toreach your goals, faster</h2>
            <p>
              Get a high-level overview of your organization with customizable dashboards. Make confident decisions and easily scale workflows for your evolving needs.
            </p>
            <button>Get Started</button>
            <div className="user-comment">
              <div className="avatar">
                <img src="" alt="Avatar" />
              </div>
              <div className="comment">
                <span>“monday.com allows banks to be synchronized between the top-level management figures and local KPIs.”</span>
                <span>Baptiste Ancey</span> | <span>Head of Innovation</span>
                <span>Indosuez Wealth Management</span>
              </div>
            </div>
          </div>
        </section>
        <section className="workflow-section">
          <h2>Everything you need for any workflow</h2>
          <span>Easily build your ideal workflow with monday.com building blocks.</span>
          <div className="building-blocks-tabs">
            <BuildingBlocksTabs activeTab={buildingBlocksTab} onTabClick={handleBuildingBlocksTabClick} />
            <BuildingBlocksContent activeTab={buildingBlocksTab} />
          </div>
        </section>
        <section className="monday-products">
          <div className="monday-products-wrapper">
            <img src="" alt="Monday products" />
            <h2>End-to-end products to run
              the core of your business
            </h2>
            <p>Tailored products designed for every aspect of your teams' needs.
            </p>
          </div>
          <div className="monday-products-cards">
            <div className="monday-work-management">
              <img src="" alt="logo" />
              <p>For professionals and teams managing tasks & workflows</p>
              <p>Manage tasks, projects, and processes to fuel collaboration and efficiency at scale.</p>
              <hr />
              <span>Top use cases:</span>
              <ul>
                <li>Project management</li>
                <li>Portfolio management</li>
                <li>Resource management</li>
                <li>Goals & strategy</li>
              </ul>
              <button>Get Started</button>
              <button>Learn More</button>
            </div>
            <div className="monday-sales-crm">
              <img src="" alt="logo" />
              <p>For sales professionals and customer-facing teams</p>
              <p>Track and manage all aspects of your sales cycle, customer data, and more in one place.</p>
              <hr />
              <span>Top use cases:</span>
              <ul>
                <li>Contact management</li>
                <li>Sales pipeline</li>
                <li>Post-sales management</li>
                <li>Lead management</li>
              </ul>
              <button>Get Started</button>
              <button>Learn More</button>
            </div>
            <div className="monday-dev">
              <img src="" alt="logo" />
              <p>For product and development professionals and teams</p>
              <p>Build agile workflows to drive impact across your product, design, and R&D teams.</p>
              <hr />
              <span>Top use cases:</span>
              <ul>
                <li>Roadmap planning</li>
                <li>Scrum & Kanban</li>
                <li>Bug tracking</li>
                <li>Sprint dashboards</li>
              </ul>
              <button>Get Started</button>
              <button>Learn More</button>
            </div>
          </div>
        </section>
        <section className="monday-efficiency">
          <div className="monday-efficiency-explore">
            <img src="" alt="monday efficiency" />
            <h2>Explore proven ways to work more efficiently </h2>
            <button>Browse by use case</button>
          </div>
          <div className="monday-efficiency-simplify">
            <p>Simplify OKR tracking </p>
            <img src="" alt="arrow" />
            <span>80%</span>
            <p>of goals achieved with OKRs on monday.com</p>
            <button>Learn More</button>
            <iframe src=""></iframe>
          </div>
          <div className="monday-efficiency-explore">
            <p>Onboard clients successfully </p>
            <img src="" alt="arrow" />
            <span>74%</span>
            <p>Improvement in customer retention</p>
            <button>Learn More</button>
            <iframe src=""></iframe>
          </div>
        </section>
      </main>
    </section>
  )
}
