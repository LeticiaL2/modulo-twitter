import React, { useState } from 'react'
import { ActionsContainer, Container, FormTweetContainer, InputTweetContainer } from '../PostTweet/styles';
import UserPhoto from '../../atoms/UserPhoto';
import Input from '../../atoms/Input';
import Span from '../../atoms/Span';
import Button from '../../atoms/Button';

function PostRetweet({ onPostRetweet, tweetId }) {
  const [enteredRetweet, setEnteredRetweet] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const maxLetters = 280


  const handleTweetChange = (e) => {
    setEnteredRetweet(e.target.value)
    setIsButtonDisabled(e.target.value === '')
  };

  const handlePostRetweetData = (e) => {
    e.preventDefault();
    if (enteredRetweet === '') return

    const retweetData = {
      texto: enteredRetweet,
    }
    onPostRetweet(retweetData, tweetId)
    setEnteredRetweet('')
    setIsButtonDisabled(true)
  };

  return (
    <Container>
      <UserPhoto src="https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_1280.png" />
      <FormTweetContainer onSubmit={handlePostRetweetData}>
        <InputTweetContainer>
          <Input
            type="text"
            placeholder="Add a quote"
            value={enteredRetweet}
            onChange={handleTweetChange}
            maxLength={maxLetters}
          />
        </InputTweetContainer>
        <ActionsContainer>
          <Span>{maxLetters - enteredRetweet.length} / {maxLetters}</Span>
          <Button disabled={isButtonDisabled}>
            Post
          </Button>
        </ActionsContainer>
      </FormTweetContainer>
    </Container>
  );
}

export default PostRetweet