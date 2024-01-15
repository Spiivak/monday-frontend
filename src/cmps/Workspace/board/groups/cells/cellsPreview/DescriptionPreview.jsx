import { DescriptionIcon } from '../../../../../Icons'

export function DescriptionPreview({ setOpenMultiLine, displayValue }) {
  return (
    <div
      className="description-preview"
      onClick={() => setOpenMultiLine(true)}
      style={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      {displayValue || (
        <span
          style={{
            position: 'absolute',
            bottom: '0px',
            right: '90px',
            color: '#00000044',
          }}
        >
          <DescriptionIcon />
        </span>
      )}
    </div>
  )
}
