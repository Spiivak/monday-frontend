import React from 'react'
export function ActionBtn({ iconSvg }) {
  return (
    <button className="action-btn">
      <img src={iconSvg} alt={iconSvg} />
    </button>
  )
}
