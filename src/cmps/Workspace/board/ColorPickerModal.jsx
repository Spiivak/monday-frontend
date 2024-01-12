export function ColorPickerModal({ handleColor }) {
  const optinalcolors = [

    '#037F4C',
    '#00C875',
    '#9CD326',
    '#CAB641',
    '#FFCB00',
    '#784BD1',
    '#A25DDC',
    '#0086C0',
    '#66CCFF',
    '#BB3354',
    '#E2445C',
    '#FF158A',
    '#FF5AC4',
    '#FF642E',
    '#FDAB3D',
    '#7F5347',
    '#C4C4C4',
    '#808080',
  ]
  return (
    <div
      className="flex wrap"
      style={{
        cursor: 'default',
        width: '142px',
        height: '140px',
        backgroundColor: 'white',
        position: 'absolute',
        border: '1px solid #c3c6d4',
        top: '32px',
        gap: '2px',
        left: '64px',
        padding: '5px',
        display: '',
        zIndex: 10000,
      }}
    >
      {optinalcolors.map((color, index) => (
        <div
          onClick={() => handleColor(color)}
          key={index}
          style={{
            cursor: 'pointer',
            width: '24px',
            height: '24px',
            borderRadius: '4px',
            backgroundColor: color,
          }}
        ></div>
      ))}
    </div>
  )
}
