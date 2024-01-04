import Home from '../../assets/icons/Home.svg'
import AddSmall from '../../assets/icons/AddSmall.svg'
import DropdownChevronUp from '../../assets/icons/DropdownChevronUp.svg'

export function BoardTabs({}) {
  return <section className="board-tabs">
        <div className="tabs">
          <button className='btn-icon medium-transparent flex gap8'><img src={Home} alt="" />Main Table</button>
          <button className='btn-icon medium-transparent'><img src={AddSmall} alt="" /></button>
        </div>
        <div className="expend-collapse">
          <button className='btn-icon medium-transparent'><img src={DropdownChevronUp} alt="" /></button>
        </div>
      </section>;
}
