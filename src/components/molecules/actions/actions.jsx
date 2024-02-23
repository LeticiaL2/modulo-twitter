import React, { useState, useEffect } from "react";
import ButtonIcon from "../../atoms/button-icon/button-icon";
import axios from "axios";
import Dropdown from "../../atoms/dropdown/dropdown";
import { Container, ButtonActionContainer } from "./styles";
import OptionDropdown from "../../atoms/option-dropdown/option-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../../redux/ducks/snackbar";
import SnackBarComponent from "../../atoms/snackbar/snackbar";

const Actions = ({
  onClickCommentModal,
  onClickRetweetModal,
  tweetId,
  comentarios,
  liked,
  likes,
  retweets,
  retweeted,
  userData,
  refreshTweets,
}) => {
  const [likedBoolean, setLikedBoolean] = useState(liked);
  const [likesCount, setLikesCount] = useState(likes);

  const [retweetedBoolean, setRetweetedBoolean] = useState(retweeted);
  const [retweetsCount, setRetweetsCount] = useState(retweets);

  const [openDropdown, setOpenDropdown] = useState(false);

  const isRetweeted = retweetedBoolean;

  const dispatch = useDispatch();
  const { open, message } = useSelector((state) => state.snackbar);

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
    refreshTweets();
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
    refreshTweets();

    dispatch(openSnackbar("Retweet realizado com sucesso!"));

    console.log("Ação realizada com sucesso:", response.data);
  };

  const handleUndoRetweet = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const response = await axios.delete(
        `http://localhost:8000/tweets/${userData.id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      refreshTweets();

      dispatch(openSnackbar("Retweet desfeito com sucesso!"));

      console.log("Ação realizada com sucesso:", response.data);
    } catch (error) {
      console.error("Erro ao tentar desfazer retweet:", error);
    }
  };

  return (
    <Container>
      <ButtonActionContainer>
        <ButtonIcon
          onClick={handleComment}
          iconType="reply"
          count={comentarios}
          $color={"rgb(113, 118, 123)"}
        />
      </ButtonActionContainer>

      <ButtonActionContainer>
        <ButtonIcon
          onClick={handleToggleDropdown}
          iconType="retweet"
          count={retweetsCount}
          $fill={isRetweeted ? "green" : "rgb(113, 118, 123)"}
        />
        <Dropdown
          showDropdown={openDropdown}
          setShowDropdown={setOpenDropdown}
          tweetPai={userData}
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

      <ButtonActionContainer>
        <ButtonIcon
          iconType={likedBoolean ? "heart-filled" : "heart"}
          count={likesCount}
          onClick={handleButtonLike}
          $color={likedBoolean ? "red" : "rgb(113, 118, 123)"}
        />
      </ButtonActionContainer>

      <SnackBarComponent open={open} message={message} />
    </Container>
  );
};

export default Actions;
