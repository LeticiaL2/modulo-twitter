import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";
import TweetInput from "../../components/molecules/tweet-input-box/tweet-input-box";
import ListTweets from "../../components/organism/list-tweets/list-tweets";
import { Container, BoxCenter } from "./styles";
import HeaderHome from "../../components/molecules/header-home/header-home";
import GlobalStyles from "../../styles/global-style";
import { AuthContext } from "../../contexts/auth";
import { get, post } from "../../api/api";

export const TweetContext = createContext();

function HomePage() {
  const { user } = useContext(AuthContext);
  const [tweets, setTweets] = useState([]);

  const getTweets = async () => {
    try {
      const response = await get("tweets");

      setTweets(response);
      console.log("Dados da API:", response);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  useEffect(() => {
    getTweets();
  }, []);

  const addTweet = async (tweetObject) => {
    try {
      const response = await post("tweets", tweetObject);
      console.log("Resposta da API após o POST:", response);

      getTweets();
    } catch (error) {
      console.error("Erro ao realizar o POST na API:", error);
    }
  };

  /* const addTweet = async (tweetObject) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));

      const response = await axios.post(
        "http://localhost:8000/tweets",
        tweetObject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTweetsLoaded(true);
      setTweets((prevTweets) => [response.data, ...prevTweets]);
    } catch (error) {
      console.error("Erro ao adicionar o tweet:", error);
    }
  }; */

  /*  const fetchTweets = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));

      const response = await axios.get("http://localhost:8000/tweets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTweets(response.data);
    } catch (error) {
      console.error("erro ao buscar tweets:", error);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);  */

  const contextValue = useMemo(() => ({ refreshTweet: getTweets }), []);

  return (
    <TweetContext.Provider value={contextValue}>
      <Container>
        <GlobalStyles />
        <BoxCenter>
          <HeaderHome buttonText="Sair" />
          <TweetInput
            $border="1px solid #565656"
            buttonText="Post"
            placeholder="What is happening?!"
            onTweet={addTweet}
          />
          <ListTweets tweets={tweets} />
        </BoxCenter>
      </Container>
    </TweetContext.Provider>
  );
}

export default HomePage;
