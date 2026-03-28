import { Link } from 'react-router-dom';
import { Play, Plus, Heart } from 'lucide-react';
import useStore from '../store/useStore';
import styles from './ContentCard.module.css';

const ContentCard = ({ item, size = 'md' }) => {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useStore();
  const inWatchlist = watchlist.includes(item.id);

  const toggleWatchlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWatchlist) removeFromWatchlist(item.id);
    else addToWatchlist(item.id);
  };

  const handleAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const posterSrc = `https://picsum.photos/seed/${item.id}/300/450`;

  return (
    <Link to={`/title/${item.id}`} className={`${styles.card} ${styles[size]} card`}>
      <img src={posterSrc} alt={item.title} className={styles.poster} loading="lazy" />
      
      {item.trending && (
        <div className={styles.trendingBadge}>{item.trending}</div>
      )}

      {item.progress !== null && item.progress !== undefined && (
        <div className={styles.progressRing}>
          <svg viewBox="0 0 44 44" width="44" height="44">
            <circle cx="22" cy="22" r="20" className={styles.track} />
            <circle 
              cx="22" cy="22" r="20" 
              className={styles.indicator} 
              strokeDasharray="125.6" 
              strokeDashoffset={125.6 - (125.6 * item.progress) / 100}
            />
          </svg>
        </div>
      )}

      <div className={styles.overlay}>
        <div className={styles.content}>
          <h4 className={styles.title}>{item.title}</h4>
          <div className={styles.meta}>
            <span>{item.year}</span>
            <span className={styles.dot}>&middot;</span>
            <span>{item.runtime}m</span>
          </div>
          <div className={styles.actions}>
            <button className={styles.btnRed} onClick={handleAction}>
              <Play size={16} fill="currentColor" />
            </button>
            <button className={styles.btnGhost} onClick={toggleWatchlist}>
              {inWatchlist ? <Heart size={16} fill="currentColor" color="var(--brand-red)" /> : <Plus size={16} />}
            </button>
            <button className={styles.btnGhost} onClick={handleAction}>
              {inWatchlist ? null : <Heart size={16} />}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ContentCard;
