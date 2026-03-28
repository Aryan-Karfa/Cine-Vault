import { useState } from 'react';
import { Heart, MessageSquare } from 'lucide-react';
import StarRating from './StarRating';
import styles from './ReviewCard.module.css';

const ReviewCard = ({ review }) => {
  const [revealed, setRevealed] = useState(!review.spoiler);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img src={review.avatar} alt={review.username} className={styles.avatar} />
        <div className={styles.userInfo}>
          <span className={styles.username}>{review.username}</span>
          <span className={styles.date}>{review.date}</span>
        </div>
        <div className={styles.stars}>
          <StarRating value={review.stars} size="sm" />
        </div>
      </div>
      
      <div className={styles.bodyWrapper}>
        <p className={`${styles.body} ${!revealed ? styles.blurred : ''}`}>
          {review.body}
        </p>
        {!revealed && (
          <button className={styles.spoilerOverlay} onClick={() => setRevealed(true)}>
            <span className={styles.warning}>&#9888;</span> Spoiler — click to reveal
          </button>
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.action}>
          <Heart size={14} />
          <span>{review.likes}</span>
        </div>
        <div className={styles.action}>
          <MessageSquare size={14} />
          <span>{Math.floor(review.likes / 5)}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
