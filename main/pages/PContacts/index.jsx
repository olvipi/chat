import React from 'react'
import { observer } from 'startupjs'
import { Content } from '@startupjs/ui'
import { Contacts } from 'components'
import './index.styl'


export default observer(function PContacts() {
  return (
    <Content styleName='root' full>
      <Contacts />
    </Content>
  )
})
