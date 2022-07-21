import React, { FC } from 'react'
import { $root, observer, useDoc, useQuery, useSession } from 'startupjs'
import { IChat, IMessage, IUser } from 'helpers/types'
import { ListItem } from 'components'
import { d } from 'helpers/rename'

interface PHChatItemProps {
  chat: IChat
}

const PHChatItem: FC<PHChatItemProps> = observer(
  ({ chat }: PHChatItemProps) => {
    const [userId] = useSession('userId')
    const contactId = chat.contacts.find(item => item !== userId)
    const [contact] = useDoc<IUser>('users', contactId || '')
    const [[lastMessage]] = useQuery<IMessage[]>('messages', {
      chatId: chat.id,
      $limit: 1,
      $sort: { createdAt: -1 },
    })

    return (
      <ListItem
        title={`${contact.firstName} ${contact.lastName}`}
        description={lastMessage?.text ? d(lastMessage?.text) : ''}
        time={lastMessage?.updatedAt}
        onPress={() => $root.emit('url', `/chats/${chat.id}`)}
      />
    )
  }
)

export default PHChatItem
