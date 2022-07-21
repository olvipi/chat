import React, { FC, PropsWithChildren, ReactNode } from 'react'
import { observer, useValue, useLocal, $root } from 'startupjs'
import { Button, Div, H1, Layout, Menu, Row, SmartSidebar } from '@startupjs/ui'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import './index.styl'

interface MenuItemProps {
  url: string
  children: ReactNode
}

const MenuItem: FC<MenuItemProps> = observer(
  ({ url, children }: MenuItemProps) => {
    const [currentUrl] = useLocal<string>('$render.url')
    return (
      <Menu.Item
        active={currentUrl === url}
        onPress={() => $root.emit('url', url)}
      >
        {children}
      </Menu.Item>
    )
  }
)

const renderSidebar = () => (
  <Menu styleName='sidebar-menu'>
    <MenuItem url='/users'>Users</MenuItem>
  </Menu>
)

const AdminLayout: FC<PropsWithChildren> = observer(({ children }) => {
  const [opened, $opened] = useValue(false)

  return (
    <Layout>
      <SmartSidebar
        styleName='sidebar'
        $open={$opened}
        renderContent={renderSidebar}
      >
        <Row styleName='menu'>
          <Button
            color='secondaryText'
            icon={faBars}
            onPress={() => $opened.set(!opened)}
          />
          <H1 styleName='logo'>Title</H1>
        </Row>
        <Div styleName='body'>{children}</Div>
      </SmartSidebar>
    </Layout>
  )
})

export default AdminLayout
