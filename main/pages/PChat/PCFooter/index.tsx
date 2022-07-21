import React, { FC, useState } from 'react'
import { observer, useLocal, useModel, useSession } from 'startupjs'
import { Button, Row, TextInput } from '@startupjs/ui'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { e } from 'helpers/rename'
import { InputWrapper } from 'components'
import './index.styl'

const PCFooter: FC = () => {
  const [message, setMessage] = useState<string>('')
  const [chatId] = useLocal<string>('$render.params.chatId')
  const [userId] = useSession<string>('userId')
  const $messages = useModel('messages')

  const sendMessage = async () => {
    await $messages.addMessage(chatId, userId, e(message.trim()))
    setMessage('')
  }

  return (
    <InputWrapper>
      <Row styleName='footer' vAlign='end'>
        <TextInput
          styleName='input'
          multiline
          resize
          numberOfLines={1}
          value={message || ''}
          onChangeText={setMessage}
        />
        <Button
          color='primary'
          disabled={!message.trim()}
          icon={faPaperPlane}
          size='l'
          variant='text'
          onPress={sendMessage}
        />
      </Row>
    </InputWrapper>
  )
}

export default observer(PCFooter)
