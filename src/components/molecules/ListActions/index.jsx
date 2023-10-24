import React from 'react'
import { Action, Container } from './styles'
import CommentIcon from '../../atoms/SVGIcons/CommentIcon'
import RetweetIcon from '../../atoms/SVGIcons/RetweetIcon'
import LikeIcon from '../../atoms/SVGIcons/LikeIcon'
import AnalyticsIcon from '../../atoms/SVGIcons/AnalyticsIcon'
import ShareIcon from '../../atoms/SVGIcons/ShareIcon'
import { colors } from '../../../styles/colors'

const ListActions = ({userData}) => {
  return (
    <Container>
      <Action $actionColor={colors.blue}>
        <CommentIcon />
        <span>{userData.actions.comments}</span>
      </Action>
      <Action $actionColor={colors.green}>
        <RetweetIcon />
        <span>{userData.actions.retweets}</span>
      </Action>
      <Action $actionColor={colors.red}>
        <LikeIcon />
        <span>{userData.actions.likes}</span>
      </Action>
      <Action $actionColor={colors.blue}>
        <AnalyticsIcon />
        <span>{userData.actions.views}</span>
      </Action>
      <Action $actionColor={colors.blue}>
        <ShareIcon />
      </Action>
    </Container>
  )
}

export default ListActions