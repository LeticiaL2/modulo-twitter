import React, { useState } from "react";
import UserPhoto from "../../atoms/user-photo/user-photo";
import ButtonIcon from "../../atoms/button-icon/button-icon";
import { ContainerTweetCard, TopTweetCard, ContentContainer, FooterTweetCard, NameProfile, User, ContentTweet, ShowMoreButton } from "./styles";

function TweetCard(props) {
  const [expanded, setExpanded] = useState(false);
  const charLimit = 140;
  const { text } = props;

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const displayText = expanded ? text : text.slice(0, charLimit);

  return (
    <ContainerTweetCard>
      <TopTweetCard>
        <UserPhoto />
        <NameProfile>{props.nameProfile}</NameProfile>
        <User>{props.user}</User>
      </TopTweetCard>
      <ContentContainer>
        <ContentTweet>
          {displayText}
          {text.length > charLimit && (
            <ShowMoreButton onClick={handleToggleExpand}>
              {expanded ? "Mostrar Menos" : "Mostrar Mais"}
            </ShowMoreButton>
          )}
        </ContentTweet>
      </ContentContainer>
      <FooterTweetCard>
        <ButtonIcon iconType="reply" count={props.qtdReply} />
        <ButtonIcon iconType="retweet" count={props.qtdRt} />
        <ButtonIcon iconType="heart" count={props.qtdFav} />
        <ButtonIcon iconType="eye" count={props.qtdView} />
      </FooterTweetCard>
    </ContainerTweetCard>
  );
}

export default TweetCard;
