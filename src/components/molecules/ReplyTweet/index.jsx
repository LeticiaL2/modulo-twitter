import React, { useState } from 'react'
import Button from '../../atoms/Button'
import Input from '../../atoms/Input'
import UserPhoto from '../../atoms/UserPhoto'
import { ActionsContainer, Container, FormContainer, FormTweet, InputTweetContainer, ReplyToContainer } from './styles'
import Span from '../../atoms/Span'


function ReplyTweet({ onReplyTweet, postUser }) {
  const [enteredReply, setEnteredReply] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const maxLetters = 280

  const handleReplyChange = (e) => {
    setEnteredReply(e.target.value)
    setIsButtonDisabled(e.target.value === '')
  };

  const handlePostReplyData = (e) => {
    e.preventDefault();
    if (enteredReply === '') return

    const replyData = {
      texto: enteredReply,
    }
    onReplyTweet(replyData)
    setEnteredReply('')
    setIsButtonDisabled(true)
  };

  return (
    <Container>
      <FormContainer >
        <UserPhoto src="https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_1280.png" />
        <FormTweet onSubmit={handlePostReplyData}>
          <ReplyToContainer>Replying to <Span>@{postUser}</Span></ReplyToContainer>
          <InputTweetContainer>
            <Input
              type="text"
              placeholder="Post your reply"
              value={enteredReply}
              onChange={handleReplyChange}
              maxLength={maxLetters}
            />
          </InputTweetContainer>
          <ActionsContainer>
            <Span>{maxLetters - enteredReply.length} / {maxLetters}</Span>
            <Button disabled={isButtonDisabled}>
              Reply
            </Button>
          </ActionsContainer>
        </FormTweet>
      </FormContainer>
    </Container>
  );
}

export default ReplyTweet;
