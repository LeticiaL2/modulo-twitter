import styles from './style.module.scss';
import DeleteIcon from '../../atoms/SVGIcons/DeleteIcon/DeleteIcon';
import { deleteTweet } from '../../../services/tweetService';
import { useEffect, useRef } from 'react';

function MoreModal({ closeModal, commentId, setRefreshCheck }) {
  const modalRef = useRef();

  const handleDelete = async (event) => {
    event.preventDefault();
    const response = await deleteTweet(commentId);

    if (response.status) {
      setRefreshCheck(true);
    } else {
      alert(response.message);
    }
    closeModal();
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div ref={modalRef} className={styles['more-modal']}>
      <div className={styles['more-delete']} onClick={handleDelete}>
        <DeleteIcon className={styles['more-delete-icon']}></DeleteIcon>
        <span className={styles['more-delete-text']}>Excluir</span>
      </div>
    </div>
  );
}

export default MoreModal;
