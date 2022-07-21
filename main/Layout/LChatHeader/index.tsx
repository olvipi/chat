import React, { FC } from 'react'
import { $root, observer, useDoc } from 'startupjs'
import { Button, Row } from '@startupjs/ui'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { IChat, IUser } from 'helpers/types'
import { ListItem } from 'components'

interface LChatHeaderProps {
  chatId: string
  userId: string
}

const LChatHeader: FC<LChatHeaderProps> = observer(
  ({ chatId, userId }: LChatHeaderProps) => {
    const [chat] = useDoc<IChat>('chats', chatId)
    const contactId = chat?.contacts?.find(item => item !== userId)
    const [user] = useDoc<IUser>('users', contactId || '')

    return (
      <Row vAlign='center'>
        <Button
          color='secondaryText'
          icon={faArrowLeft}
          size='l'
          variant='text'
          onPress={() => $root.emit('url', '/')}
        />
        <ListItem
          style={{ borderWidth: 0 }}
          title={`${user.firstName} ${user.lastName}`}
          description={user.description || ' '}
          avatar={user.avatarUrl}
        />
      </Row>
    )
  }
)

export default LChatHeader
