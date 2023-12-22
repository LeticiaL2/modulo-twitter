import { formatDistanceToNow } from 'date-fns'
import React, { useState } from 'react'
import MoreIcon from '../../atoms/SVGIcons/MoreIcon'
import TweetUserContent from '../../atoms/TweetUserContent'
import TweetUserInfo from '../../atoms/TweetUserInfo'
import { Container, HeaderContainer } from './styles'
import { getUserLocalStorage } from '../../../contexts/util'
import DropdownMenu from '../../atoms/DropdownMenu'
import DropdownItem from '../../atoms/DropdownItem'
import DeleteIcon from '../../atoms/SVGIcons/DeleteIcon'

const BodyTweet = ({ userData, username, onClickRemoveTweet }) => {
  const { usuario, nome, texto: content, data: date, retweetPai } = userData
  const [openMoreDropdown, setOpenMoreDropdown] = useState(false)
  const userLogged = getUserLocalStorage().usuario

  const formattedDate = formatDistanceToNow(new Date(date), { addSuffix: true })

  const handleMoreDropdown = (e) => {
    e.stopPropagation()
    setOpenMoreDropdown(!openMoreDropdown)
  }

  const handleDeleteTweet = async (e) => {
    e.stopPropagation()
    onClickRemoveTweet()
  }

  return (
    <Container>
      <HeaderContainer>
        <TweetUserInfo nome={nome} usuario={usuario} dataFormatada={formattedDate}/>
        {username === userLogged ? <div style={{position: 'relative'}} onClick={handleMoreDropdown}>
          <MoreIcon />
          <DropdownMenu showDropdown={openMoreDropdown} setOpenDropdown={setOpenMoreDropdown}>
            <DropdownItem icon={<DeleteIcon />} onClick={handleDeleteTweet}>Delete</DropdownItem>
          </DropdownMenu>
        </div> : null}
      </HeaderContainer>
      <TweetUserContent content={content} retweetPai={retweetPai}/>
    </Container>

  )
}

export default BodyTweet