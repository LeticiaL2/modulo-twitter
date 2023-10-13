import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import TweetInput from  "../../molecules/tweet-input-box/tweet-input-box";
import ListTweets from "../../organism/list-tweets/list-tweets";
import perfil from '../../assets/perfil.png'
import logo from '../../assets/logo.png'
import "./home-page.css"
import { AuthContext } from "../../contexts/auth";


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
              <img className="logo_X_Home" src={logo} alt="" />
            </div>

            <div className="logout_container">
              <div className="button_logout_container">
               <button className="button_logout" onClick={handleLogout}>Sair</button>
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