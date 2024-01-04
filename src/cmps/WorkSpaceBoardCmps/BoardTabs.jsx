import { AddSmallIcon, HomeIcon, NavigationChevronUpIcon } from '../Icons';

export function BoardTabs({}) {
  return <section className="board-tabs">
        <div className="tabs">
          <button className='btn-icon medium-transparent flex gap8'><HomeIcon/>Main Table</button>
          <button className='btn-icon medium-transparent'><AddSmallIcon/></button>
        </div>
        <div className="expend-collapse">
          <button className='btn-icon medium-transparent'><NavigationChevronUpIcon/></button>
        </div>
      </section>;
}
