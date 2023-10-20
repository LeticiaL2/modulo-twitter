import React, { useState } from "react";
import Button from "../../atoms/button/button";
import UserPhoto from "../../atoms/user-photo/user-photo";
import perfil from  "../../../assets/perfil.png";
import { TweetBoxInput, FooterContainerInput, FormContainer, TextInput, UserContainer, CharCount } from "./styles";

function TweetInput (props) {
    
    const [tweetText, setTweetText] = useState("");
    const charLimit = 240;
    const [remainingChars, setRemainingChars] = useState(charLimit);

    function handleTweetChange(e) {
        const newText = e.target.value;
        setTweetText(newText);
        
        const remaining = charLimit - newText.length;
        setRemainingChars(remaining);
      }

    


    function handleButtonClick() {
        if (remainingChars >=0) {
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

        setRemainingChars(charLimit);
        }
    }

    const isTweetTooLong = remainingChars < 0;
    const buttonStyle = isTweetTooLong

    const charCountStyle = {
        color: remainingChars < 0 ? "red" : "rgb(113, 118, 123)",
      };

    


    return(
            <TweetBoxInput>
                <UserContainer>
                    <UserPhoto />
                    <FormContainer >
                        <TextInput
                            className="tweet_input_box"
                            placeholder="What is happening?!"
                            value={tweetText}
                            onChange={handleTweetChange}
                        /> </FormContainer>
                </UserContainer>

                
                
                        <FooterContainerInput>
                        <CharCount style={charCountStyle}>
                            {remainingChars} / {charLimit}
                        </CharCount>

                                <Button  
                                style={buttonStyle}
                                $text="Post"
                                onClick={handleButtonClick}
                                disabled={isTweetTooLong}
                                />
                        </FooterContainerInput>
               
            </TweetBoxInput>
    )
}

export default TweetInput;