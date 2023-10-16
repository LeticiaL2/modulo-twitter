import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import TweetInput from  "../../molecules/tweet-input-box/tweet-input-box";
import ListTweets from "../../organism/list-tweets/list-tweets";
import perfil from '../../assets/perfil.png'
import "./home-page.css"
import { AuthContext } from "../../contexts/auth";
import Button from "../../atoms/button/button";
import Header from "../../atoms/header/header";

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
    
    const {logout} = useContext(AuthContext)
    
    const handleLogout = () => {
      logout();
    };

    console.log(tweets);

    return (
        <div className="home-page">
          
          <div className="container-home">
            
            <div className="header_home">
                <div className="logo">
                    <Header/>
                </div>
                
                <div className="button_logout">
                    <Button className="logout" text="Sair" onClick={handleLogout}/>
                </div>
            </div>

          
    
            <div className="container_caixa_central_home">
              <div className="caixa_central_home">
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
                
              </div>
            </div>
            
          </div>
          
        </div>
      );
    }


    export default HomePage;