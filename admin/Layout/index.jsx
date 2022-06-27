import React from 'react'
import { observer, emit, useValue, useLocal } from 'startupjs'
import { Button, Div, H1, Layout, Menu, Row, SmartSidebar } from '@startupjs/ui'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import './index.styl'


const MenuItem = observer(({ url, children }) => {
  const [currentUrl] = useLocal('$render.url')
  return (
    <Menu.Item
      active={currentUrl === url}
      onPress={() => emit('url', url)}
    >{children}</Menu.Item>
  )
})

export default observer(function ({ children }) {
  const [opened, $opened] = useValue(false)

  const renderSidebar = () => (
    <Menu styleName='sidebar-menu'>
      <MenuItem url='/users'> Users</MenuItem>
    </Menu>

  )

  return (
    <Layout>
      <SmartSidebar styleName='sidebar'
        $open={$opened}
        renderContent={renderSidebar}
      >
        <Row styleName='menu'>
          <Button color='secondaryText' icon={faBars} onPress={() => $opened.set(!opened)} />
          <H1 styleName='logo'>Title</H1>
        </Row>
        <Div styleName='body'>{children}</Div>
      </SmartSidebar>
    </Layout>
  )
})
