import React, { FC } from 'react'
import { observer, useQuery } from 'startupjs'
import {
  Button,
  Icon,
  Row,
  Span,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@startupjs/ui'
import { faLock, faLockOpen, faPen } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import { IUser } from 'helpers/types'
import './index.styl'

enum dataTypes {
  'string' = 'string',
  'bool' = 'bool',
  'date' = 'date',
  'action' = 'action',
}

const schema = [
  {
    index: 'firstName',
    title: 'Name',
    type: dataTypes.string,
  },
  {
    index: 'lastName',
    title: 'Last Name',
    type: dataTypes.string,
  },
  {
    index: 'blocked',
    title: 'Blocked User',
    type: dataTypes.bool,
  },
  {
    index: 'createdAt',
    title: 'Created',
    type: dataTypes.date,
  },
  {
    index: 'updatedAt',
    title: 'Updated',
    type: dataTypes.date,
  },
  {
    index: '',
    title: 'Actions',
    type: dataTypes.action,
  },
]

const getFormattedText = (value: any, type: dataTypes) => {
  if (type === dataTypes.date) return value ? moment(value).format('L') : ''

  if (type === dataTypes.bool)
    return (
      <Icon
        styleName={value ? 'attention' : 'success'}
        icon={value ? faLock : faLockOpen}
      />
    )

  return value
}

const hoverOptions = {
  style: { cursor: 'default' },
  hoverStyle: { backgroundColor: '#ebf8fd' },
  activeStyle: { opacity: 1, backgroundColor: '#ebf8fd' },
  onPress: () => undefined,
}

interface UsersProps {
  onStartEdit: (user: IUser) => void
}

const Users: FC<UsersProps> = observer(({ onStartEdit }) => {
  const [users = []] = useQuery<IUser[]>('users', {})

  return (
    <Table styleName='root'>
      <Thead>
        <Tr>
          {schema.map(item => (
            <Th key={`${item.index}_th`} {...hoverOptions}>
              <Span bold italic>
                {item.title}
              </Span>
            </Th>
          ))}
        </Tr>
      </Thead>

      <Tbody>
        {users.map(user => (
          <Tr key={user.id} {...hoverOptions}>
            {schema.map(item => (
              <Td key={`${item.index}_th`} {...hoverOptions}>
                {item.type === dataTypes.action ? (
                  <Row align='right'>
                    <Button
                      color='additional4'
                      icon={faPen}
                      variant='text'
                      onPress={() => onStartEdit(user)}
                    />
                  </Row>
                ) : (
                  getFormattedText(user[item.index], item.type)
                )}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
})

export default Users
