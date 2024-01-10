import { useEffect, useRef } from 'react'

export function FilterModal({ onClose }) {
  const modalRef = useRef()

  const handleClickOutside = (event) => {
    const isFilterButton = event.target.closest('[data-filter-button="true"]')
    if (
      !modalRef.current ||
      (!modalRef.current.contains(event.target) && !isFilterButton)
    ) {
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
    <section className="filter-modal" ref={modalRef}>
      <div className="filter-container flex column">
        <div className="filter-heading">
          <span>Filter by</span>
        </div>

        <div className="select-header">
          <div className="option flex align-center">
            <div className="test flex gap8">
              <input type="checkbox" />
              <label htmlFor="main">Main</label>
            </div>
          </div>
          <div className="option flex align-center">
            <div className="test flex gap8">
              <input type="checkbox" />
              <label htmlFor="private">Private</label>
            </div>
          </div>
          <div className="option flex align-center">
            <div className="test flex gap8">
              <input type="checkbox" />
              <label htmlFor="shareable">Shareable</label>
            </div>
          </div>
        </div>
        <div className="filter-divider"></div>
        <div className="select-body">
          <div className="option flex align-center">
            <div className="test flex gap8">
              <input type="checkbox" />
              <label htmlFor="">Subscribed or owner</label>
            </div>
          </div>
          <div className="option flex align-center">
            <div className="test flex gap8">
              <input type="checkbox" />
              <label htmlFor="owner-only">Owner only</label>
            </div>
          </div>
        </div>
        <div className="filter-divider"></div>
        <div className="select-footer">
          <div className="option flex align-center">
            <div className="test flex gap8">
              <input type="checkbox" />
              <label htmlFor="dashboards-only">Dashboards only</label>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
