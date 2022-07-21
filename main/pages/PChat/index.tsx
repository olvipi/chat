import React, { FC } from 'react'
import { ScrollView } from 'react-native'
import { observer, useQuery, useLocal } from 'startupjs'
import { Content } from '@startupjs/ui'
import { IMessage } from 'helpers/types'
import PCFooter from './PCFooter'
import PCMessage from './PCMessage'
import './index.styl'

const PChat: FC = () => {
  const [chatId] = useLocal('$render.params.chatId')
  const [messages = []] = useQuery<IMessage[]>('messages', {
    chatId,
    $sort: { createdAt: 1 },
  })

  return (
    <Content styleName='root' full>
      <PCFooter />
      <ScrollView style={{ flexGrow: 0 }}>
        {messages.map(messageObj => (
          <PCMessage key={messageObj.id} messageObj={messageObj} />
        ))}
      </ScrollView>
    </Content>
  )
}

export default observer(PChat)
