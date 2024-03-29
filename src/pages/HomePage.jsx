import React, { useEffect, useState } from 'react'
import { HomeHeader } from '../cmps/Home/HomeHeader'
import QuerterlyRoadmap from '../assets/img/quarterly-roadmap.avif'
import { Tabs } from '../cmps/Home/Tabs'
import { WorkManagementTab } from '../cmps/Home/tabs/WorkManagementTab'
import { SalesCrmTab } from '../cmps/Home/tabs/SalesCrmTab'
import { DevTab } from '../cmps/Home/tabs/DevTab'

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
import { BuildingBlocksTabs } from '../cmps/Home/tabs/BuildingBlocksTabs'
import { BuildingBlocksContent } from '../cmps/Home/tabs/BuildingBlocksContent'

import Holt from '../assets/img/companies/HoltCat.avif'
import Canva from '../assets/img/companies/canva.png'
import CocaCola from '../assets/img/companies/coca_cola.png'
import Oxy from '../assets/img/companies/oxy.png'
import Lionstage from '../assets/img/companies/lionsgate.avif'
import Carrefour from '../assets/img/companies/carrefour.png'
import OBD from '../assets/img/companies/bd.png'
import Glossier from '../assets/img/companies/glossier.png'
import Universal from '../assets/img/companies/universal.png'
import GoalsDashboard from '../assets/img/goals_dashboard.mp4'
import WmDark from '../assets/img/wm-dark.png'
import MondayProducts from '../assets/img/mp.png'
import MWork from '../assets/img/mwm.png'
import MSales from '../assets/img/msc.png'
import MDev from '../assets/img/mdev.png'
import Logo from '../assets/img/tabs/anotherday-logo.png'

import { CheckIcon } from '../cmps/Icons'
import { Hidden } from '@mui/material'


import Baptise from '../assets/img/baptiste.avif'
import Jane from '../assets/img/jane.avif'
import Sarah from '../assets/img/sarah.avif'

export function HomePage() {
  const [activeTab, setActiveTab] = useState('work-management-tab')
  const [buildingBlocksTab, setBuildingBlocksTab] = useState('boards')

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  const handleBuildingBlocksTabClick = (tab) => {
    setBuildingBlocksTab(tab)
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
        return null
    }
  }

  useEffect(() => {
    const video = document.querySelector('.paralex-video video');


    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition >= 2500 && scrollPosition <= 4100) {
        const parallaxSpeed = 6;
        const translateY = (scrollPosition - 2400) * parallaxSpeed / 9;

        // Apply the parallax effect to your video element
        video.style.transform = `translateY(${translateY}px)`;
        video.style.overflow = 'hidden';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <section className="home-page page">
      <HomeHeader />
      <main>
        <section className="hero-section">
          <h1 className="hero-section-header">
            A platform built for a <br /> new way of working
          </h1>
          <h2 className="hero-section-header2">
            What would you like to manage?
          </h2>
          <Tabs activeTab={activeTab} onTabClick={handleTabClick} />
          <div className="tabs-preview flex column">
            <div className="tab">
            {renderTabContent()}
            </div>
            <div className="tabs-preview-actions flex column align-center">
              <button className="get-started-btn">Get Started</button>
              <span className="tabs-preview-info">
                No credit card needed ✦ Unlimited time on Free plan
              </span>
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
                  <div className="img-gallery">
                    <picture>
                      <img src={Holt} alt="Holt" />
                    </picture>
                  </div>
                  <div className="img-gallery">
                    <picture>
                      <img src={Canva} alt="Canva" />
                    </picture>
                  </div>
                  <div className="img-gallery">
                    <picture>
                      <img src={CocaCola} alt="Coca Cola" />
                    </picture>
                  </div>
                  <div className="img-gallery">
                    <picture>
                      <img src={Oxy} alt="Oxy" />
                    </picture>
                  </div>
                  <div className="img-gallery">
                    <picture>
                      <img src={Lionstage} alt="Lionstage" />
                    </picture>
                  </div>
                  <div className="img-gallery">
                    <picture>
                      <img src={Carrefour} alt="carrefour" />
                    </picture>
                  </div>
                  <div className="img-gallery">
                    <picture>
                      <img src={OBD} alt="OBD" />
                    </picture>
                  </div>
                  <div className="img-gallery">
                    <picture>
                      <img src={Glossier} alt="Glossier" />
                    </picture>
                  </div>
                  <div className="img-gallery">
                    <picture>
                      <img src={Universal} alt="Universal" />
                    </picture>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="boost-your-team flex">
          <div className="flex justify-center">
            <h2>The Work OS that lets you shape workflows, your way</h2>
            <div className="boost-your-team-cta flex column">
              <span>
                Boost your team’s alignment, efficiency, and productivity by
                customizing any workflow to fit your needs.
              </span>
              <div className="flex">
                <button className="get-started-btn">Get Started</button>
              </div>
            </div>
          </div>
        </section>
        <section className="preview-images-section">
          <div className="masonry-grid">
            <div className="grid-container">
              <div className="item item1 timeline">
                <img src={TimeLine} alt="" />
              </div>
              <div className="item item2 status">
                <img src={Status} alt="" />
              </div>
              <div className="item item3 battery">
                <img src={Battery} alt="" />
              </div>
              <div className="item item4 integration">
                <img src={Integration} alt="" />
              </div>
              <div className="item item5 pie">
                <img src={Pie} alt="" />
              </div>
              <div className="item item6 mobile">
                <img src={Mobile} alt="" />
              </div>
              <div className="item item7 automation">
                <img src={Automation} alt="" />
              </div>
              <div className="item item8 comment">
                <img src={Comment} alt="" />
              </div>
              <div className="item item9 dashboard">
                <img src={Dashboard} alt="" />
              </div>
            </div>
          </div>
        </section>
        <section className="scroll-paralex">
          <div className="container">
            <div className="cards">
              <div className="paralex-cards">
                <div className="paralex1">
                  <div className="heading">
                    <h2>
                      Streamline your work for
                      <br />
                      maximum productivity
                    </h2>
                  </div>
                  <div className="paragraph">
                    <p>
                      Centralize all your work, processes, tools, and files into
                      one Work OS. Connect teams, bridge silos, and maintain one
                      source of truth across your organization.
                    </p>
                  </div>
                  <div className="user-comment flex align-center">
                    <div className="avatar">
                      <img src={Jane} alt="Avatar" style={{ minWidth: '72px', height: '72px'}} />
                    </div>

                    <div className="comment">
                      <div className="avatar-comment">
                        <span className="span-comment">
                          “We use anotherday.com for a plethora of use cases, the
                          opportunities this platform provides are limitless.”
                        </span>
                      </div>
                      <div className="avatar-role-name">
                        <div className="avatar-name">
                          <span className="span-avatar-name">Jane Tham</span> |{' '}
                          <span className="span-avatar-name">
                            VP of Collaboration Technologies
                          </span>
                        </div>
                        <span className="span-avatar-role">
                          Universal Music Group
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="paralex2">
                  <div className="heading">
                    <h2>
                      Bring teams together to
                      <br />
                      drive business impact
                    </h2>
                  </div>
                  <div className="paragraph">
                    <p>
                      Collaborate effectively organization-wide to get a clear
                      picture of all your work. Stay in the loop with
                      easy-to-use automations and real-time notifications.
                    </p>
                  </div>
                  <div className="user-comment flex align-center">
                    <div className="avatar">
                    <img src={Sarah} alt="Avatar" style={{ minWidth: '72px', height: '72px'}} />
                    </div>
                    <div className="comment">
                      <div className="avatar-comment">
                        <span className="span-comment">
                          “Since adopting anotherday.com, our global marketing
                          department has seen a 40% improvement in cross-team
                          collaboration.”
                        </span>
                      </div>
                      <div className="avatar-role-name">
                        <div className="avatar-name">
                          <span className="span-avatar-name">Sarah Pharr</span>{' '}
                          |{' '}
                          <span className="span-avatar-name">
                            AVP Marketing
                          </span>
                        </div>
                        <span className="span-avatar-role">Genpact</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="paralex3">
                  <div className="heading">
                    <h2>Stay on track toreach your goals, faster</h2>
                  </div>
                  <div className="paragraph">
                    <p>
                      Get a high-level overview of your organization with
                      customizable dashboards. Make confident decisions and
                      easily scale workflows for your evolving needs.
                    </p>
                  </div>
                  <button className="btn-get-started-stroke">
                    Get Started
                  </button>
                  <div className="user-comment flex align-center">
                    <div className="avatar">
                    <img src={Baptise} alt="Avatar" style={{ minWidth: '72px', height: '72px'}} />
                    </div>
                    <div className="comment">
                      <div className="avatar-comment">
                        <span className="span-comment">
                          “monday.com allows banks to be synchronized between
                          the top-level management figures and local KPIs.”
                        </span>
                      </div>
                      <div className="avatar-role-name">
                        <div className="avatar-name">
                          <span className="span-avatar-name">
                            Baptiste Ancey
                          </span>{' '}
                          |{' '}
                          <span className="span-avatar-name">
                            Head of Innovation
                          </span>
                        </div>
                        <span className="span-avatar-role">
                          Indosuez Wealth Management
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="paralex-video">
              <div className="video">
                <video src={GoalsDashboard} alt="" />
              </div>
            </div>
          </div>
        </section>
        <section className="workflow-section">
          <div className="worflow-section-wrapper flex column align-center">
            <h2>Everything you need for any workflow</h2>
            <span>
              Easily build your ideal workflow with anotherday.com building blocks.
            </span>
          </div>
          <div className="building-blocks-tbs flex column align-center">
            <div className="tabs">
              <BuildingBlocksTabs
                activeTab={buildingBlocksTab}
                onTabClick={handleBuildingBlocksTabClick}
              />
            </div>
            <div>
              <BuildingBlocksContent activeTab={buildingBlocksTab} />
            </div>
          </div>
        </section>
        <div className="monday-products-wrapper flex column justify-center align-center">
          <div className='flex align-center gap8'>
          <img src={Logo} alt="anotherday products" style={{ width: '300px'}} />
          </div>
          <h2>End-to-end products to run the core of your business</h2>
          <p className="subtitle">
            Tailored products designed for every aspect of your teams' needs.
          </p>
        </div>
        <section className="monday-products flex justify-center">
          <div className="monday-products-cards flex gap16">
            <div className="monday-work-management product-card flex column">
              <div className="product-card-header">
                <picture>
                  <img src={MWork} alt="logo" />
                </picture>
                <p>For professionals and teams managing tasks & workflows</p>
              </div>
              <p>
                Manage tasks, projects, and processes to fuel collaboration and
                efficiency at scale.
              </p>
              <div className="product-card-divider"></div>
              <div className="product-card-use-cases">
                <span className="product-card-use-cases-title">
                  Top use cases:
                </span>
                <ul className="">
                  <li className="flex gap8">
                    <CheckIcon />
                    Project management
                  </li>
                  <li className="flex gap8">
                    <CheckIcon />
                    Portfolio management
                  </li>
                  <li className="flex gap8">
                    <CheckIcon />
                    Resource management
                  </li>
                  <li className="flex gap8">
                    <CheckIcon />
                    Goals & strategy
                  </li>
                </ul>
              </div>
              <button className="btn-get-started-stroke">Get Started</button>
              <button className="btn-learn-more">Learn More</button>
            </div>
            <div className="monday-sales-crm product-card flex column">
              <div className="product-card-header">
                <picture>
                  <img src={MSales} alt="logo" />
                </picture>
                <p>For sales professionals and customer-facing teams</p>
              </div>
              <p>
                Track and manage all aspects of your sales cycle, customer data,
                and more in one place.
              </p>
              <div className="product-card-divider"></div>
              <div className="product-card-use-cases">
                <span className="product-card-use-cases-title">
                  Top use cases:
                </span>
                <ul>
                  <li className="flex gap8">
                    <CheckIcon />
                    Contact management
                  </li>
                  <li className="flex gap8">
                    <CheckIcon />
                    Sales pipeline
                  </li>
                  <li className="flex gap8">
                    <CheckIcon />
                    Post-sales management
                  </li>
                  <li className="flex gap8">
                    <CheckIcon />
                    Lead management
                  </li>
                </ul>
              </div>
              <button className="btn-get-started-stroke">Get Started</button>
              <button className="btn-learn-more">Learn More</button>
            </div>
            <div className="monday-dev product-card flex column">
              <div className="product-card-header">
                <picture>
                  <img src={MDev} alt="logo" />
                </picture>
                <p>For product and development professionals and teams</p>
              </div>
              <p>
                Build agile workflows to drive impact across your product,
                design, and R&D teams. Mister Biton.
              </p>
              <div className="product-card-divider"></div>
              <div className="product-card-use-cases">
                <span className="product-card-use-cases-title">
                  Top use cases:
                </span>
                <ul>
                  <li className="flex gap8">
                    <CheckIcon />
                    Roadmap planning
                  </li>
                  <li className="flex gap8">
                    <CheckIcon />
                    Scrum & Kanban
                  </li>
                  <li className="flex gap8">
                    <CheckIcon />
                    Bug tracking
                  </li>
                  <li className="flex gap8">
                    <CheckIcon />
                    Sprint dashboards
                  </li>
                </ul>
              </div>
              <button className="btn-get-started-stroke">Get Started</button>
              <button className="btn-learn-more">Learn More</button>
            </div>
          </div>
        </section>
      </main>
    </section>
  )
}
