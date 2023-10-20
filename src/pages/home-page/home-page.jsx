import React, {useState, useEffect} from "react";
import axios from "axios";
import TweetInput from  "../../components/molecules/tweet-input-box/tweet-input-box";
import ListTweets from "../../components/organism/list-tweets/list-tweets";
import perfil from '../../assets/perfil.png'
import {Container, BoxCenter} from "./styles"
import HeaderHome from "../../components/molecules/header-home/header-home"
import GlobalStyles from "../../styles/global-style";

function HomePage() {
  
    const [tweets, setTweets] = useState([]);
  
    const addTweet = async (tweetObject) => {
      try {
        const response = await axios.post("http://localhost:3001/tweets", tweetObject);
        setTweets(response.data)
      } catch (error) {
        console.error("Erro ao adicionar o tweet:", error);
      }
    };
  
    const fetchTweets = async () => {
      try {
        const response = await axios.get("http://localhost:3001/tweets");
        setTweets(response.data);
      } catch (error) {
        console.error("erro ao buscar tweets:", error);
      }
    };
  
    useEffect(() => {
      fetchTweets();
    }, []);
    
    
    
   

    console.log(tweets);

    return (
        <Container>
          <GlobalStyles/>
              <BoxCenter>
                <HeaderHome/>
                <TweetInput 
                buttonText="Post"
                src={perfil}
                nameProfile="Rafael"
                user="@rafinha"
                qtdReply={"0"}
                qtdRt={"0"}
                qtdFav={"0"}
                qtdView={"0"}
                onTweet={addTweet}/>
                 <ListTweets/>
              </BoxCenter>
        </Container>
      );
    }


    export default HomePage;