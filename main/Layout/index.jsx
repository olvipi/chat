import React from 'react'
import { observer, emit, useValue, useLocal } from 'startupjs'
import { Button, Div, H5, Icon, Layout, Popover, Menu, Row } from '@startupjs/ui'
import { onLogout } from '@startupjs/auth'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import APP from '../../app.json'
import './index.styl'

const { displayName } = APP

const APP_NAME = displayName.charAt(0).toUpperCase() + displayName.slice(1)


export default observer(function ({ children }) {
  const [url] = useLocal('$render.url')


  const renderContent = () => (
    <Menu styleName='sidebar-menu'>
      <Menu.Item onPress={onLogout}>Log Out</Menu.Item>
    </Menu>

  )

  return (
    <Layout>
      <Row styleName='menu' align='between'>
        {/* <Button
          styleName={['button', { active: url === '/' }]}
          size='l'
          shape='squared'
          variant='text'
          onPress={() => emit('url', '/')}
        >
          CONTACTS
        </Button>
        <Button
          styleName={['button', { active: url === '/chats' }]}
          size='l'
          shape='squared'
          variant='text'
          onPress={() => emit('url', '/chats')}
        >
          CHATS
        </Button> */}
        <H5 styleName='logo'>Chat</H5>
        <Popover styleName='caption' renderContent={renderContent}>
          <Icon styleName='icon' icon={faEllipsisV} />
        </Popover>
      </Row>
      <Div styleName='body'>{children}</Div>
    </Layout>
  )
})
