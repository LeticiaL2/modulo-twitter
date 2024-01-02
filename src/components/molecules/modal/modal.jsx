import { React, useContext } from "react";
import {
  Container,
  ContainerModal,
  HeaderContainer,
  IconClose,
  Draft,
} from "./styles";
import Retweet from "../retweet/retweet";
import { IoClose } from "react-icons/io5";

import InputReply from "../input-reply/input-reply";
import perfil from "../../../assets/perfil.png";
import axios from "axios";
import TweetInput from "../tweet-input-box/tweet-input-box";
import { Button } from "../../atoms/button-icon/styles";
import { TweetContext } from "../../../pages/home-page/home-page";

const Modal = ({ showModal, setShowModal, userData, isComment }) => {
  const { refreshTweet } = useContext(TweetContext);

  async function replyWithQuote(texto) {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const response = await axios.post(
        `http://localhost:8000/tweets/${userData.id}/retweet`,
        texto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowModal(false);
      console.log("Resposta da requisição:", response.data);
      refreshTweet();
    } catch (error) {
      console.error("Erro ao realizar a requisição:", error);
      console.log("Erro detalhado:", error.response);
    }
  }

  async function addComment(texto) {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const response = await axios.post(
        `http://localhost:8000/tweets/${userData.id}/comentarios`,
        texto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowModal(false);
      console.log("Resposta da requisição:", response.data);
    } catch (error) {
      console.error("Erro ao realizar a requisição:", error);
      console.log("Erro detalhado:", error.response);
    }
  }

  console.log("modal tweet", userData);

  return (
    <>
      {showModal ? (
        <Container showModal={showModal}>
          <ContainerModal showModal={showModal}>
            {isComment ? (
              <>
                <HeaderContainer>
                  <IconClose onClick={() => setShowModal((prev) => !prev)}>
                    <IoClose />
                  </IconClose>
                  <Draft>Draft</Draft>
                </HeaderContainer>
                <Retweet tweetPai={userData} />
                <TweetInput
                  $border="none"
                  buttonText="Reply"
                  placeholder="Post your reply"
                  onTweet={addComment}
                />
              </>
            ) : (
              <>
                <HeaderContainer>
                  <IconClose onClick={() => setShowModal((prev) => !prev)}>
                    <IoClose />
                  </IconClose>
                  <Draft>Draft</Draft>
                </HeaderContainer>
                <Retweet tweetPai={userData} />
                <TweetInput
                  $border="none"
                  buttonText="Post"
                  placeholder="Add a comment"
                  onTweet={replyWithQuote}
                />
              </>
            )}
          </ContainerModal>
        </Container>
      ) : null}
    </>
  );
};

export default Modal;
