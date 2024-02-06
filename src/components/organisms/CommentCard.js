import CommentFooter from '../molecules/CommentFooter';
import CommentHeader from '../molecules/CommentHeader';

function CommentCard({ comment }) {
  return (
    <a href={`/feed/${comment.id}`} className="comment-card--link">
      <div className="comment-card">
        <div className="comment-card--left">
          <img src="/user.png" className="comment-card--user-image" />
        </div>
        <div className="comment-card--right">
          <CommentHeader
            name={comment.nome}
            handle={comment.usuario}
            date={comment.data}
          />
          <div className="comment-card--content">{comment.texto}</div>
          <CommentFooter
            comments={comment.comentarios}
            retweets={comment.retweets}
            likes={comment.likes}
          />
        </div>
      </div>
    </a>
  );
}

export default CommentCard;
