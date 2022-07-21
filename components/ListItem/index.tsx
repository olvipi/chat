import React, { FC } from 'react'
import { ViewStyle } from 'react-native'
import { Avatar, Row, Div, H6, Span } from '@startupjs/ui'
import './index.styl'
import moment from 'moment'

interface ListItemProps {
  style?: ViewStyle
  avatar?: string
  title?: string
  description?: string
  time?: number
  onPress?: () => void
}

const ListItem: FC<ListItemProps> = ({
  style,
  avatar,
  title,
  description,
  time,
  onPress,
}) => {
  return (
    <Row styleName='root' style={style} align='between' onPress={onPress}>
      <Row styleName='left'>
        <Avatar size='s' src={avatar} name={title} />
        <Div styleName='main'>
          <H6 bold>{title}</H6>
          <Span styleName='description' numberOfLines={1}>
            {description}
          </Span>
        </Div>
      </Row>
      {time && (
        <Row styleName='right' wrap>
          <Span styleName='time' description italic>
            {`${moment(time).format('ll')} `}
          </Span>
          <Span styleName='time' description italic>
            {moment(time).format('HH:mm')}
          </Span>
        </Row>
      )}
    </Row>
  )
}

export default ListItem
