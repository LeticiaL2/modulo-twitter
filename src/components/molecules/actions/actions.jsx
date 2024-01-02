import React, { useState, useEffect, useContext } from "react";
import ButtonIcon from "../../atoms/button-icon/button-icon";
import axios from "axios";
import Dropdown from "../../atoms/dropdown/dropdown";
import { Container, ButtonActionContainer } from "./styles";
import OptionDropdown from "../../atoms/option-dropdown/option-dropdown";
import { TweetContext } from "../../../pages/home-page/home-page";

const Actions = ({
  onClickCommentModal,
  onClickRetweetModal,
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

  const [tweetPaiId, setTweetPaiId] = useState();

  const [openDropdown, setOpenDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isRetweeted = retweetedBoolean;
  const retweetId = tweetId;

  const { refreshTweet } = useContext(TweetContext);

  useEffect(() => {
    setLikedBoolean(liked);
    setLikesCount(likes);
    setRetweetedBoolean(retweeted);
    setRetweetsCount(retweets);
  }, [liked, retweeted, likes, retweets]);

  console.log(retweetedBoolean);

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
  };

  const handleButtonRetweet = async () => {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const response = await axios.post(
      `http://localhost:8000/tweets/${tweetId}/retweet`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    refreshTweet();

    console.log("Ação realizada com sucesso:", response.data);

    if (response.data.status) {
      setRetweetedBoolean((prev) => !prev);
      setRetweetsCount((prev) => prev + 1);
      setTweetPaiId(response.data.conteudo.tweetId);
    }
  };

  /* const handleDeleteRetweet = async () => {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    if (isRetweeted && retweetId) {
      const response = await axios.delete(
        `http://localhost:8000/tweets/${tweetPaiId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Retweet desfeito com sucesso:", response.data);
      console.log("id tweet", retweetId);

      setRetweetedBoolean((prev) => !prev);
      setRetweetsCount((prev) => prev - 1);
    }
  }; */

  console.log("actions data", tweet);

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
          {!retweeted ? (
            <OptionDropdown iconType={"Retweet"} onClick={handleButtonRetweet}>
              Retweet
            </OptionDropdown>
          ) : (
            <OptionDropdown iconType={"Retweet"}>Undo Repost</OptionDropdown>
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
