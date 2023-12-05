import React from "react";
import { Container } from "./styles";
import TweetCard from "../../organism/tweet-card/tweet-card";

function ListComments({ comentariosArray, fetchTweets }) {
  console.log("comentariosArray:", comentariosArray);

  return (
    <>
      {comentariosArray.map((tweet, index) => (
        <Container key={index}>
          <TweetCard
            id={tweet.id}
            nome={tweet.nome}
            usuario={tweet.usuario}
            texto={tweet.texto}
            comentarios={tweet.comentarios}
            retweets={tweet.retweets}
            likes={tweet.likes}
            date={tweet.data_criacao}
            tweetPai={tweet.tweetPai}
            liked={tweet.liked}
            comentariosArray={tweet.comentariosArray}
          />
        </Container>
      ))}
    </>
  );
}

export default ListComments;
