import React from "react";
import { useLocation } from "react-router-dom";
import {TweetDetailsContainer, TopTweet, TopTweetLeft, TopTweetRight, NameProfile, User, ContentContainer, TweetDate, ContentTweet, FooterTweetCard} from './styles'
import ButtonIcon from "../../atoms/button-icon/button-icon"
import UserPhoto from "../../atoms/user-photo/user-photo";
import ReplyCard from "../../organism/reply-card/reply-card";
import Button from "../../atoms/button/button"
import { format } from "date-fns";

const TweetDetails = () => {
  const location = useLocation();
  const tweetInfo = location.state && location.state.tweetInfo;

  if (!tweetInfo) {
    return <div>Informações do tweet não encontradas.</div>;
  }

  const formattedDate = format(new Date(tweetInfo.date), "HH:mm • MMM, yyyy");

  return (
    <TweetDetailsContainer>

     <TopTweet>
        <TopTweetLeft>
          <UserPhoto />
          <NameProfile>{tweetInfo.nameProfile}</NameProfile>
          <User>{tweetInfo.user}</User>
        </TopTweetLeft>
        <TopTweetRight>
            <Button
            $border="2px solid black"
            $backgroundColor="white"
            $color="black"
            $text="Seguir"/>
            <ButtonIcon 
            iconType="option" 
            $padding="10px"/>
        </TopTweetRight>
     </TopTweet>

     <ContentContainer>
          <ContentTweet>
            {tweetInfo.text}
          </ContentTweet>

          <TweetDate>
            {formattedDate} • {tweetInfo.qtdView} Views
          </TweetDate>
        </ContentContainer>

        <FooterTweetCard>
          <ButtonIcon iconType="reply" count={tweetInfo.qtdReply} />
          <ButtonIcon iconType="retweet" count={tweetInfo.qtdRt} />
          <ButtonIcon iconType="heart" count={tweetInfo.qtdFav} />
          <ButtonIcon iconType="bookmark" count={tweetInfo.qtdBookMark}/>
        </FooterTweetCard>

        <ReplyCard replies={tweetInfo.replies} />
    </TweetDetailsContainer>
  );
};

export default TweetDetails;