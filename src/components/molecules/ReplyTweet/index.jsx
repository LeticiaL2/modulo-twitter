import React, { useContext, useState } from 'react'
import Button from '../../atoms/Button'
import Input from '../../atoms/Input'
import Span from '../../atoms/Span'
import UserPhoto from '../../atoms/UserPhoto'
import { ActionsContainer, Container, FormContainer, FormTweetContainer, InputTweetContainer, ReplyToContainer } from './styles'
import { TweetDetailContext } from '../../../contexts/tweetDetail'


function ReplyTweet({ postUser }) {
  const { handleAddComment } = useContext(TweetDetailContext)
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
    handleAddComment(replyData)
    setEnteredReply('')
    setIsButtonDisabled(true)
  };

  return (
    <Container>
      <FormContainer >
        <UserPhoto src="https://cdn.pixabay.com/photo/2021/01/04/10/41/icon-5887126_1280.png" />
        <FormTweetContainer onSubmit={handlePostReplyData}>
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
        </FormTweetContainer>
      </FormContainer>
    </Container>
  );
}

export default ReplyTweet;
