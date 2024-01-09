export function DescriptionPreview({ setOpenMultiLine, displayValue }) {
  return (
    <div
      onClick={() => setOpenMultiLine(true)}
      style={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        padding: '5px',
      }}
    >
      {displayValue || (
        <span style={{ color: '#00000044' }}>Add description</span>
      )}
    </div>
  )
}
