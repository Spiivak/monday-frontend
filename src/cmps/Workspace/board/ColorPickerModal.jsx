export function ColorPickerModal({ handleColor }) {
  const optinalcolors = [
    '#ffcb00',
    '#007038',
    '#469e9b',
    '#579bfc',
    '#9aadbd',
    '#bba5e8',
    '#8050ab',
    '#4f3a65',
    '#92334c',
    '#bb3354',
    '#ff7575',
  ]
  return (
    <div
      className="flex wrap gap8"
      style={{
        cursor: 'default',
        width: '150px',
        height: '150px',
        backgroundColor: 'white',
        position: 'absolute',
        border: '1px solid black',
        top: '40px',
        left: '0px',
        padding: '8px',
        zIndex: 10000,
      }}
    >
      {optinalcolors.map((color, index) => (
        <div
          onClick={() => handleColor(color)}
          key={index}
          style={{
            cursor: 'pointer',
            width: '25px',
            height: '25px',
            borderRadius: '7px',
            backgroundColor: color,
          }}
        ></div>
      ))}
    </div>
  )
}
