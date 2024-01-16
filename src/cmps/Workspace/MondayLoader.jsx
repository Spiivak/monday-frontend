import { useSelector } from 'react-redux'
import Loader from '../../assets/img/board-loader.gif'
import { WorkspaceHeader } from './header/WorkSpaceHeader'

export function MondayLoader() {
  // const isLoading = useSelector((storeState) => store.boardModule.isLoading)
  // if (!isLoading) return null
  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: '100000',
      }}
    >
      <WorkspaceHeader />
      <section
        style={{
          height: 'calc(100% - 48px)',
          gap: '8px',
          display: 'flex',
        }}
      >
        <section
          style={{
            backgroundColor: 'white',
            width: '255px',
            height: '100%',
            borderTopRightRadius: '8px',
          }}
        ></section>
        <section
          style={{
            borderTopLeftRadius: '8px',
            flex: 1,
            height: '100%',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={Loader} />
        </section>
      </section>
    </div>
  )
}
