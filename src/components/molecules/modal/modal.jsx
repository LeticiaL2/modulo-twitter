import { React } from "react";
import {
  Container,
  ContainerModal,
  HeaderContainer,
  IconClose,
  Draft,
} from "./styles";
import Retweet from "../retweet/retweet";
import { IoClose } from "react-icons/io5";
import { post } from "../../../api/api";
import TweetInput from "../tweet-input-box/tweet-input-box";

const Modal = ({
  showModal,
  setShowModal,
  userData,
  isComment,
  refreshTweets,
}) => {
  async function replyWithQuote(texto) {
    try {
      const response = await post(`tweets/${userData.id}/retweet`, texto);
      setShowModal(false);
      console.log("Resposta da requisição:", response.data);
      refreshTweets();
    } catch (error) {
      console.error("Erro ao realizar a requisição:", error);
      console.log("Erro detalhado:", error.response);
    }
  }

  async function addComment(texto) {
    try {
      const response = await post(`tweets/${userData.id}/comentarios`, texto);
      setShowModal(false);
      console.log("Resposta da requisição:", response.data);
      refreshTweets();
    } catch (error) {
      console.error("Erro ao realizar a requisição:", error);
      console.log("Erro detalhado:", error.response);
    }
  }

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
