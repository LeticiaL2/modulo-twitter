import React, { useState, useContext } from 'react'
import { Container, FormTweet, InputTweetContainer, ActionsContainer } from './styles'
import Button from '../../atoms/Button'
import Input from '../../atoms/Input'
import UserPhoto from '../../atoms/UserPhoto'
import { AuthContext } from '../../../contexts/auth'


function PostTweet({ onAddTweet }) {
  const { user } = useContext(AuthContext)
  const [enteredTweet, setEnteredTweet] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const maxLetters = 280


  const handleTweetChange = (e) => {
    setEnteredTweet(e.target.value)
    setIsButtonDisabled(e.target.value === '')
  };

  const handlePostTweetData = (e) => {
    e.preventDefault();
    if (enteredTweet === '') return

    const tweetData = {
      texto: enteredTweet,
    }
    onAddTweet(tweetData)
    setEnteredTweet('')
    setIsButtonDisabled(true)
  };

  return (
    <Container>
      <UserPhoto src="https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_1280.png" />
      <FormTweet onSubmit={handlePostTweetData}>
        <InputTweetContainer>
          <Input
            type="text"
            placeholder="What's happening?!"
            value={enteredTweet}
            onChange={handleTweetChange}
            maxLength={maxLetters}
          />
        </InputTweetContainer>
        <ActionsContainer>
          <span>{maxLetters - enteredTweet.length} / {maxLetters}</span>
          <Button disabled={isButtonDisabled}>
            Post
          </Button>
        </ActionsContainer>
      </FormTweet>
    </Container>
  );
}

export default PostTweet;
