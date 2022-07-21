import React, { FC, PropsWithChildren } from 'react'
import { observer, useLocal, useSession, $root } from 'startupjs'
import {
  Button,
  Div,
  H5,
  Icon,
  Layout,
  Popover,
  Menu,
  Row,
} from '@startupjs/ui'
import { onLogout } from '@startupjs/auth'
import { faEllipsisV, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import LChatHeader from './LChatHeader'
import './index.styl'
import { IUser } from 'helpers/types'

const MainLayout: FC<PropsWithChildren> = observer(({ children }) => {
  const [url] = useLocal('$render.url')
  const [chatId] = useLocal('$render.params.chatId')
  const [user] = useSession<IUser>('user')

  const renderContent = () => (
    <Menu styleName='menu'>
      <Menu.Item>{`${user?.firstName} ${user?.lastName}`}</Menu.Item>
      <Menu.Item onPress={onLogout}>Log Out</Menu.Item>
    </Menu>
  )

  const renderHeader = () => {
    switch (url) {
      case '/contacts':
        return (
          <Button
            color='secondaryText'
            icon={faArrowLeft}
            size='l'
            variant='text'
            onPress={() => $root.emit('url', '/')}
          >
            Back
          </Button>
        )
      case `/chats/${chatId}`:
        return <LChatHeader chatId={chatId} userId={user.id} />
      default:
        return (
          <H5 styleName='logo' onPress={() => $root.emit('url', '/')}>
            Chat
          </H5>
        )
    }
  }

  return (
    <Layout styleName='root'>
      <Div styleName='container'>
        <Row styleName='header' align='between'>
          {renderHeader()}
          <Popover styleName='caption' renderContent={renderContent}>
            <Icon styleName='icon' icon={faEllipsisV} />
          </Popover>
        </Row>
        <Div styleName='body'>{children}</Div>
      </Div>
    </Layout>
  )
})

export default MainLayout
