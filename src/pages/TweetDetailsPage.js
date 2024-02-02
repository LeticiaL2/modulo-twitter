import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './TweetDetailsPage.scss';
import { postComment } from '../services/commentService';

function formatDate(dateString) {
  const date = new Date(dateString);

  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const timeStr = date.toLocaleTimeString('en-US', timeOptions);

  const dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  let dateStr = date.toLocaleDateString('pt-BR', dateOptions);

  dateStr = dateStr.replace('.', '');

  return `${timeStr} · ${dateStr}`;
}

function formatDateForComments(dateString) {
  const now = new Date();
  const dateFormat = new Date(dateString);
  const diffMs = now - dateFormat;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);

  if (diffHours < 24) {
    if (diffHours < 1) {
      if (diffMins < 1) {
        return ' · ' + diffSecs + ' s';
      }
      return ' · ' + diffMins + ' min';
    } else {
      return ' · ' + diffHours + ' h';
    }
  } else {
    const options = { day: 'numeric', month: 'short' };
    let date = new Date(dateString);
    date = date.toLocaleDateString('pt-BR', options);
    date = date.replace('.', '');
    date = ' · ' + date;
    return date;
  }
}

function Comment({ comment }) {
  return (
    <a href={`/feed/${comment.id}`} className="comment-card--link">
      <div className="comment-card">
        <div className="comment-card--left">
          <img src="/user.png" className="comment-card--user-image" />
        </div>
        <div className="comment-card--right">
          <div className="comment-card--header">
            <div className="comment-card--name">{comment.nome}</div>
            <div className="comment-card--username">@{comment.usuario}</div>
            <div className="comment-card--date">{comment.data}</div>
          </div>
          <div className="comment-card--content">{comment.texto}</div>
          <div className="comment-card--footer">
            <div className="comment-card--comment">
              <a className="comment-card--comment-anchor" href="/feed">
                <svg className="comment-card--comment-svg" viewBox="0 0 24 24">
                  <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
                </svg>
              </a>
              <span className="comment-card--comment-count">
                {comment.comentarios}
              </span>
            </div>
            <div className="comment-card--retweet">
              <a className="comment-card--retweet-anchor" href="/feed">
                <svg className="comment-card--retweet-svg" viewBox="0 0 24 24">
                  <path d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"></path>
                </svg>
              </a>
              <span className="comment-card--retweet-count">
                {comment.retweets}
              </span>
            </div>
            <div className="comment-card--like">
              <a className="comment-card--like-anchor" href="/feed">
                <svg className="comment-card--like-svg" viewBox="0 0 24 24">
                  {/* TODO: Quando usuario atual dar like no tweet, trocar o SVG para o comentado e vice-versa */}
                  {/* <path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path> */}
                  <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                </svg>
              </a>
              <span className="comment-card--like-count">{comment.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

function TweetDetails() {
  const [tweetData, setTweetData] = useState(null);
  const { id } = useParams();
  const [newCommentText, setNewCommentText] = useState('');
  const [commentPosted, setCommentPosted] = useState(false);

  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3003/api/v1/tweets/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );

        const tweet = response.data.conteudo;
        tweet.data = formatDate(tweet.data);

        tweet.comentariosLista.forEach((commentTweet) => {
          commentTweet.data = formatDateForComments(commentTweet.data);
        });

        setTweetData(response.data.conteudo);
      } catch (error) {
        console.error('Erro ao buscar Tweets:', error);
      }
    };

    fetchTweet();
  }, [id, commentPosted]);

  if (!tweetData) {
    return <div>Carregando...</div>;
  }

  const handlePostComment = async () => {
    const newComment = await postComment(newCommentText, id);
    setTweetData({
      ...tweetData,
      comentariosLista: [newComment, ...tweetData.comentariosLista],
    });
    setNewCommentText('');
    setCommentPosted(true);
  };

  return (
    <div className="tweet-details--container">
      <div className="tweet-details--section" id="left-section"></div>
      <div className="tweet-details--section" id="middle-section">
        <div className="tweet-details--header">
          <div className="tweet-details--back-arrow-container">
            <a className="tweet-details--back-anchor" href="/feed">
              <svg className="tweet-details--back-arrow" viewBox="0 0 24 24">
                <path d="M 7.414 13 l 5.043 5.04 l -1.414 1.42 L 3.586 12 l 7.457 -7.46 l 1.414 1.42 L 7.414 11 H 21 v 2 H 7.414 Z"></path>
              </svg>
            </a>
          </div>
          <div className="tweet-details--header-title">Post</div>
        </div>
        <div className="main-card">
          <div className="main-card--header">
            <div className="main-card--header--user">
              <img src="/user.png" className="main-card--user-image" />
              <div className="main-card--user-info">
                <div className="main-card--name">{tweetData.nome}</div>
                <div className="main-card--username">@{tweetData.usuario}</div>
              </div>
            </div>
          </div>
          <div className="main-card--content">{tweetData.texto}</div>
          <div className="main-card--date">{tweetData.data}</div>
          <div className="main-card--footer">
            <div className="main-card--comment">
              <a className="main-card--comment-anchor" href="/feed">
                <svg className="main-card--comment-svg" viewBox="0 0 24 24">
                  <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
                </svg>
              </a>
              <span className="main-card--comment-count">
                {tweetData.comentarios}
              </span>
            </div>
            <div className="main-card--retweet">
              <a className="main-card--retweet-anchor" href="/feed">
                <svg className="main-card--retweet-svg" viewBox="0 0 24 24">
                  <path d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"></path>
                </svg>
              </a>
              <span className="main-card--retweet-count">
                {tweetData.retweets}
              </span>
            </div>
            <div className="main-card--like">
              <a className="main-card--like-anchor" href="/feed">
                <svg className="main-card--like-svg" viewBox="0 0 24 24">
                  {/* TODO: Quando usuario atual dar like no tweet, trocar o SVG para o comentado e vice-versa */}
                  {/* <path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path> */}
                  <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                </svg>
              </a>
              <span className="main-card--like-count">{tweetData.likes}</span>
            </div>
          </div>
        </div>
        <div className="tweet-details--input-container">
          <div className="tweet-details--input-top">
            <img src="/user.png" className="tweet-details--input-user-image" />
            <textarea
              className="tweet-details--input-textarea"
              value={newCommentText}
              onChange={(event) => setNewCommentText(event.target.value)}
              placeholder="Postar sua resposta"
            />
          </div>
          <div className="tweet-details--input-bottom">
            <button
              className="tweet-details--input-button"
              disabled={newCommentText.length === 0}
              onClick={handlePostComment}
            >
              Responder
            </button>
          </div>
        </div>
        <div className="tweet-details--comments-container">
          {tweetData.comentariosLista.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
      <div className="tweet-details--section" id="right-section"></div>
    </div>
  );
}

export default TweetDetails;
