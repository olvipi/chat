import React, { FC } from 'react'
import { ScrollView } from 'react-native'
import { observer, useQuery, $root, useSession } from 'startupjs'
import { Button, Content } from '@startupjs/ui'
import { faCommentMedical } from '@fortawesome/free-solid-svg-icons'
import { IChat } from 'helpers/types'
import PHListItem from './PHListItem'
import './index.styl'

const PHome: FC = () => {
  const [userId] = useSession('userId')
  const [chats = []] = useQuery<IChat[]>('chats', {
    contacts: { $in: [userId] },
  })

  return (
    <>
      <Content styleName='root' full>
        <ScrollView>
          {chats.map(item => (
            <PHListItem key={item.id} chat={item} />
          ))}
        </ScrollView>
      </Content>
      <Button
        styleName='bottom-button'
        color='primary'
        icon={faCommentMedical}
        shape='circle'
        variant='flat'
        onPress={() => $root.emit('url', '/contacts')}
      />
    </>
  )
}

export default observer(PHome)
