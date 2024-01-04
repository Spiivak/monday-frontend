import Person from '../../assets/icons/Person.svg'
import Filter from '../../assets/icons/Filter.svg'
import DropdownChevronDown from '../../assets/icons/DropdownChevronDown.svg'
import Sort from '../../assets/icons/Sort.svg'
import Hide from '../../assets/icons/Hide.svg'
import Search from '../../assets/icons/Search.svg'
import Group from '../../assets/icons/Group.svg'
import Menu from '../../assets/icons/Menu.svg'

export function BoardFilter({}) {
  return <section className="board-filter">
        <button className='btn-ctn medium-primary flex gap8'>New Item <img src={DropdownChevronDown} alt="" /></button>
        <button className='btn-icon medium-transparent flex gap8'><img src={Search} alt="" />Search</button>
        <button className='btn-icon medium-transparent flex gap8'><img src={Person} alt="" />Person</button>
        <button className='btn-icon medium-transparent flex gap8'><img src={Filter} alt="" />Filter <img src={DropdownChevronDown} alt="" /></button>
        <button className='btn-icon medium-transparent flex gap8'><img src={Sort} alt="" />Sort</button>
        <button className='btn-icon medium-transparent flex gap8'><img src={Hide} alt="" />Hide</button>
        <button className='btn-icon medium-transparent flex gap8'><img src={Group} alt="" />Group by</button>
        <button className='btn-icon medium-transparent'><img src={Menu} alt="" /></button>
      </section>
}
