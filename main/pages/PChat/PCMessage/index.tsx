import React, { FC } from 'react'
import { observer, useSession } from 'startupjs'
import { Div, Row, Span } from '@startupjs/ui'
import { IMessage } from 'helpers/types'
import { d } from 'helpers/rename'
import './index.styl'

interface PCMessageProps {
  messageObj: IMessage
}

const PCMessage: FC<PCMessageProps> = ({ messageObj }) => {
  const [userId] = useSession('userId')

  const isOwnMessage = userId === messageObj.userId

  return (
    <Row styleName='root' align={isOwnMessage ? 'right' : 'left'}>
      <Div styleName={['container', { isOwnMessage }]}>
        <Span styleName='message'>{d(messageObj.text || '')}</Span>
      </Div>
    </Row>
  )
}

export default observer(PCMessage)
