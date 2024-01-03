import notificationSvg from '../../assets/icons/Notifications.svg'
import inboxSvg from '../../assets/icons/Inbox.svg'
import inviteMembersSvg from '../../assets/icons/Invite.svg'
import searchSvg from '../../assets/icons/Search.svg'
import helpSvg from '../../assets/icons/Help.svg'

export function BoardHeader() {
  return (
    <header className="board-header">
      <div className="switcher-logo"></div>
      <div className="work-management-logo"></div>
      monday work management
      <button>See plans</button>

      <section className="header-action-btns">
        <button>
          <img src={notificationSvg} alt="notification" />
        </button>
        <button>
          <img src={inboxSvg} alt="inbox" />
        </button>
        <button>
          <img src={inviteMembersSvg} alt="invite" />
        </button>
        |
        <button>
          <img src={searchSvg} alt="search" />
        </button>
        <button><img src={helpSvg} alt="help" /></button>
        <button><img src="" alt="" />Avatar</button>
      </section>
    </header>
  )
}
