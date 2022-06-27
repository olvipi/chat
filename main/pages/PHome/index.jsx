import React from 'react'
import { observer, emit } from 'startupjs'
import { Button, Content } from '@startupjs/ui'
import { faCommentMedical } from '@fortawesome/free-solid-svg-icons'
import { Chats } from 'components'
import './index.styl'

export default observer(function PHome() {
  return (
    <>
      <Content styleName='root' full>
        <Chats />
      </Content>
      <Button
        styleName='bootom-button'
        color='primary'
        icon={faCommentMedical}
        shape='circle'
        variant='flat'
        onPress={() => emit('url', '/contacts')}
      />
    </>
  )
})
