import React, { useState } from "react";
import UserPhoto from "../../atoms/user-photo/user-photo";
import ButtonIcon from "../../atoms/button-icon/button-icon";
import { LinkContainerTweet, ContainerTweetCard, TopTweetCard, ContentContainer, FooterTweetCard, NameProfile, User, ContentTweet, ShowMore } from "./styles";
import { formatDistanceToNow, formatISO } from "date-fns";

function TweetCard(props) {
  const [expanded, setExpanded] = useState(false);
  const charLimit = 140;
  const { text } = props;

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleTweetClick = (e) => {
    if (expanded) {
      e.preventDefault();
    }
  };

  const displayText = text.length > charLimit ? `${text.slice(0, charLimit)}...` : text;
  
  function formatTimeAgo(date) {
    const now = new Date();
    const secondsAgo = Math.floor((now - date) / 1000);
    if (secondsAgo < 60) {
      return `${secondsAgo}s`;
    } else {
      const minutesAgo = Math.floor(secondsAgo / 60);
      if (minutesAgo < 60) {
        return `${minutesAgo}m`;
      } else {
        const hoursAgo = Math.floor(minutesAgo / 60);
        if (hoursAgo < 24) {
          return `${hoursAgo}h`;
        } else {
          const options = { day: 'numeric', month: 'short' };
          return date.toLocaleDateString(undefined, options);
        }
      }
    }
  }

  const timeAgo = formatTimeAgo(new Date(props.date));

  return (
    <LinkContainerTweet to={`/tweet/${props.id}`} state={{ tweetInfo: props }}>
      <ContainerTweetCard>
        <TopTweetCard>
          <UserPhoto />
          <NameProfile>{props.nameProfile}</NameProfile>
          <User>{props.user} • {timeAgo}</User>
        </TopTweetCard>
        <ContentContainer>
          <ContentTweet>
            {displayText}
            {text.length > charLimit && (
              <ShowMore onClick={handleToggleExpand}>
                {expanded ? "Mostrar Menos" : "Mostrar Mais"}
              </ShowMore>
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
    </LinkContainerTweet>
  );
}

export default TweetCard;
