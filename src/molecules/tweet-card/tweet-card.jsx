import React from "react";
import "./tweet-card.css"; 
import UserPhoto from "../../atoms/user-photo/user-photo";
import perfil from  "../../assets/perfil.png"
import fav from  "../../assets/fav.png"
import reply from  "../../assets/reply.png"
import rt from  "../../assets/rt.png"
import view from  "../../assets/view.png"


function TweetCard(props) {
  return (
    <div className="area-tweets__tweets">
      <div className="area-tweets__tweets__topo">
          <div className="nome_perfil">
              <UserPhoto src={perfil} />
          </div>
          <div className="nick">
              <h2>{props.nameProfile}</h2>
          </div>
          <div className="usuario"> 
              <p>{props.user}</p>
          </div>
      </div>
      <div className="texto">
          <p>{props.text}</p>
      </div>
      <div className="icones">
          <button className="botao_icone"> <img src={reply} className="icone-twitter" alt="icone reply"/>{props.qtdReply}</button>
          <button className="botao_icone"> <img src={rt} className="icone-twitter" alt="icone rt"/>{props.qtdRt}</button>
          <button className="botao_icone"> <img src={fav} className="icone-twitter" alt="icone fav"/>{props.qtdFav}</button>
          <button className="botao_icone"> <img src={view} className="icone-twitter" alt="icone view"/>{props.qtdView}</button>
      </div>
    </div>
  );
};

export default TweetCard;