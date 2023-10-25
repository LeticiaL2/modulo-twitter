import React from "react";
import {ContainerReply, Container, TopTweetCard, NameProfile, User, ContentContainer, ContentTweet, FooterTweetCard} from './styles'
import ButtonIcon from "../../atoms/button-icon/button-icon"
import { formatTimeAgo } from "../../../utils/dateUtils";
import UserPhoto from "../../atoms/user-photo/user-photo";


const ReplyCard = ({ replies }) => {


  if (!replies) {
    return <></>;
  }

  

  return (
    <ContainerReply>
      {replies.map((reply) => {
        const timeAgo = formatTimeAgo(new Date(reply.date));
        return (
          <Container key={reply.id}>
            <TopTweetCard>
              <UserPhoto />
              <NameProfile>{reply.nameProfile}</NameProfile>
              <User>{reply.user} • {timeAgo}</User>
            </TopTweetCard>

            <ContentContainer>
              <ContentTweet>
                {reply.textTweet}
              </ContentTweet>
            </ContentContainer>

            <FooterTweetCard>
              <ButtonIcon iconType="reply" count={reply.qtdReply} />
              <ButtonIcon iconType="retweet" count={reply.qtdRt} />
              <ButtonIcon iconType="heart" count={reply.qtdFav} />
              <ButtonIcon iconType="eye" count={reply.qtdView} />
            </FooterTweetCard>
          </Container>
        );
      })}
    </ContainerReply>
  );
};

export default ReplyCard;
