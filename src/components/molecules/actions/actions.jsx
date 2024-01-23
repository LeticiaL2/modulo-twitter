import React, { useState, useEffect, useContext } from "react";
import ButtonIcon from "../../atoms/button-icon/button-icon";
import axios from "axios";
import Dropdown from "../../atoms/dropdown/dropdown";
import { Container, ButtonActionContainer } from "./styles";
import OptionDropdown from "../../atoms/option-dropdown/option-dropdown";

const Actions = ({
  onClickCommentModal,
  onClickRetweetModal,
  onClickRetweet,
  onClickUndoRetweet,
  onClickUpdateLike,
  tweetId,
  comentarios,
  liked,
  likes,
  retweets,
  retweeted,
  tweetPai,
  tweet,
  texto,
}) => {
  const [likedBoolean, setLikedBoolean] = useState(liked);
  const [likesCount, setLikesCount] = useState(likes);

  const [retweetedBoolean, setRetweetedBoolean] = useState(retweeted);
  const [retweetsCount, setRetweetsCount] = useState(retweets);

  const [openDropdown, setOpenDropdown] = useState(false);

  const isRetweeted = retweetedBoolean;

  //const { refreshTweet } = useContext(TweetsListContext);

  useEffect(() => {
    setLikedBoolean(liked);
    setLikesCount(likes);
    setRetweetedBoolean(retweeted);
    setRetweetsCount(retweets);
  }, [liked, retweeted, likes, retweets]);

  const handleComment = async () => {
    setOpenDropdown(false);
    onClickCommentModal();
  };

  const handleToggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleRetweetWithQuote = async () => {
    setOpenDropdown(false);
    onClickRetweetModal();
  };

  const handleButtonLike = async () => {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const response = await axios.post(
      `http://localhost:8000/tweets/${tweetId}/likes`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    if (response.data.mensagem.codigo === 201) {
      setLikedBoolean((prev) => !prev);
      setLikesCount((prev) => prev + 1);
    } else {
      setLikedBoolean((prev) => !prev);
      setLikesCount((prev) => prev - 1);
    }
    onClickUpdateLike(liked, likes);
    // refreshTweet();
  };

  const handleButtonRetweet = async () => {
    onClickRetweet();
  };

  const handleUndoRetweet = async () => {
    onClickUndoRetweet();
  };

  return (
    <Container>
      <ButtonIcon
        onClick={handleComment}
        iconType="reply"
        count={comentarios}
      />

      <ButtonActionContainer
        onClick={handleToggleDropdown}
        $color={retweetedBoolean ? "green" : "gray"}
      >
        <ButtonIcon iconType="retweet" count={retweetsCount} />
        <Dropdown
          showDropdown={openDropdown}
          setShowDropdown={setOpenDropdown}
          tweetPai={tweet}
        >
          {!isRetweeted ? (
            <OptionDropdown iconType={"Retweet"} onClick={handleButtonRetweet}>
              Retweet
            </OptionDropdown>
          ) : (
            <OptionDropdown iconType={"Retweet"} onClick={handleUndoRetweet}>
              Undo Repost
            </OptionDropdown>
          )}
          <OptionDropdown onClick={handleRetweetWithQuote} iconType={"Quote"}>
            Quote
          </OptionDropdown>
        </Dropdown>
      </ButtonActionContainer>

      <ButtonIcon
        iconType={likedBoolean ? "heart-filled" : "heart"}
        count={likesCount}
        onClick={handleButtonLike}
        $color={likedBoolean ? "red" : "rgb(113, 118, 123)"}
      />
    </Container>
  );
};

export default Actions;
