import PostInput from '../../molecules/PostInput/PostInput';
import CommentCard from '../CommentCard/CommentCard';
import styles from './style.module.scss';

const InteractionModal = ({
  isOpen,
  handleClose,
  comment,
  handleComment,
  tweetText,
  setTweetText,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles['interaction-modal--overlay']}>
      <div className={styles['interaction-modal--container']}>
        <div className={styles['interaction-modal--header']}>
          <button
            className={styles['interaction-modal--header-btn']}
            onClick={handleClose}
          >
            X
          </button>
        </div>
        <div className={styles['interaction-modal--parent']}>
          <CommentCard comment={comment} noBorders={true} />
        </div>
        <div className={styles['interaction-modal--footer']}>
          <PostInput
            placeholder="Postar sua resposta"
            buttonText="Responder"
            classNamePrefix="interaction-modal"
            handlePostTweet={handleComment}
            tweetText={tweetText}
            setTweetText={setTweetText}
            noBorders={true}
          />
        </div>
      </div>
    </div>
  );
};

export default InteractionModal;
