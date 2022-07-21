import React, { FC } from 'react'
import { ScrollView } from 'react-native'
import { $root, observer, useModel, useQuery, useSession } from 'startupjs'
import { Content } from '@startupjs/ui'
import { ListItem } from 'components'
import { IUser } from 'helpers/types'
import './index.styl'

const PContacts: FC = () => {
  const [user] = useSession<IUser>('user')
  const [users] = useQuery<IUser[]>('users', { _id: { $ne: user?.id } })
  const $chats = useModel('chats')

  const createChat = async (contactId: string) => {
    const chatId: string = await $chats.getChatId(user.id, contactId)
    $root.emit('url', `/chats/${chatId}`)
  }

  return (
    <Content styleName='root' full>
      <ScrollView>
        {users?.map(item => (
          <ListItem
            key={item.id}
            title={`${item.firstName} ${item.lastName}`}
            description={item.description || ' '}
            avatar={item.avatarUrl}
            onPress={() => createChat(item.id)}
          />
        ))}
      </ScrollView>
    </Content>
  )
}
export default observer(PContacts)
