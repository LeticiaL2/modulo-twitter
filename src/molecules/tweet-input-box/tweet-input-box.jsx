import React, { useState } from "react";
import "./tweet-input-box.css"; 
import Button from "../../atoms/button/button";
import UserPhoto from "../../atoms/user-photo/user-photo";
import perfil from  "../../assets/perfil.png";


function TweetInput (props) {
    
    const [tweetText, setTweetText] = useState("");


    function handleButtonClick() {
        const tweetObject = {
            textTweet: tweetText,
            profilePhoto: perfil,
            nameProfile: props.nameProfile, 
            user: props.user, 
            qtdReply: props.qtdReply, 
            qtdRt: props.qtdRt, 
            qtdFav: props.qtdFav, 
            qtdView: props.qtdView
        };

        console.log(tweetObject);

        props.onTweet(tweetObject);
        
        setTweetText("");
        
    }

    return(
        <>
            <div className="tweet-box">
                <div className="user-photo-container">
                    <UserPhoto src ={perfil} />
                    <form className="container-form_box" >
                        <input
                            type="text"
                            className="tweet_input_box"
                            placeholder="What is happening?!"
                            value={tweetText}
                            onChange={(e) => setTweetText(e.target.value)}
                        /> </form>
                </div>
                        <div className="footer_input">
                            <div className="button_input_box">
                                <Button text={props.buttonText} onClick={handleButtonClick}/>
                            </div>
                        </div>
                    
            </div>
          
        </>
    )
}

export default TweetInput;