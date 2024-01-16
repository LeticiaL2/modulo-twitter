import React, { useState } from 'react'
import Button from '../../atoms/Button'
import Input from '../../atoms/Input'
import Span from '../../atoms/Span'
import UserPhoto from '../../atoms/UserPhoto'
import { ActionsContainer, Container, FormTweetContainer, InputTweetContainer } from './styles'


function PostTweet({ handleAddTweet }) {
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
    handleAddTweet(tweetData)
    setEnteredTweet('')
    setIsButtonDisabled(true)
  };

  return (
    <Container>
      <UserPhoto src="https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_1280.png" />
      <FormTweetContainer onSubmit={handlePostTweetData}>
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
          <Span>{maxLetters - enteredTweet.length} / {maxLetters}</Span>
          <Button disabled={isButtonDisabled}>
            Post
          </Button>
        </ActionsContainer>
      </FormTweetContainer>
    </Container>
  );
}

export default PostTweet;
