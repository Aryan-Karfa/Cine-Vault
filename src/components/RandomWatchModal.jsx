import { useState, useEffect } from 'react';
import { X, Play } from 'lucide-react';
import StarRating from './StarRating';
import { CONTENT_ITEMS } from '../data/mockData';
import useStore from '../store/useStore';
import styles from './RandomWatchModal.module.css';

const RandomWatchModal = ({ onClose }) => {
  const [phase, setPhase] = useState('filters'); // 'filters', 'spinning', 'result'
  const [slotIndex, setSlotIndex] = useState(0);
  const [resultItem, setResultItem] = useState(null);
  
  // Local filter states
  const [genres, setGenres] = useState(['Sci-Fi', 'Action']);
  const [mood, setMood] = useState('Chill');
  const [rating, setRating] = useState(3);
  
  const { watchlist, addToWatchlist } = useStore();

  const handleSpin = () => {
    setPhase('spinning');
    // Simulate slot machine spin
    let spins = 0;
    let delay = 80;
    
    const spinCycle = () => {
      spins++;
      setSlotIndex(Math.floor(Math.random() * 6));
      
      if (spins < 8) {
        setTimeout(spinCycle, delay);
      } else if (spins < 12) {
        delay = 200;
        setTimeout(spinCycle, delay);
      } else if (spins < 14) {
        delay = 400;
        setTimeout(spinCycle, delay);
      } else {
        // Settle
        const randomResult = CONTENT_ITEMS[Math.floor(Math.random() * CONTENT_ITEMS.length)];
        setResultItem(randomResult);
        setPhase('result');
      }
    };
    
    spinCycle();
  };

  const slotImages = [
    'https://picsum.photos/seed/cv001/160/240',
    'https://picsum.photos/seed/cv010/160/240',
    'https://picsum.photos/seed/cv020/160/240',
    'https://picsum.photos/seed/cv030/160/240',
    'https://picsum.photos/seed/cv040/160/240',
    'https://picsum.photos/seed/cv050/160/240',
  ];

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={`${styles.modal} modal`} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={20} />
        </button>

        <h2 className={styles.heading}>
          <span className={styles.brand}>RANDOM</span> WATCH
        </h2>
        <p className={styles.subhead}>Let fate curate your next cinematic journey.</p>

        {phase === 'filters' && (
          <div className={styles.filterPhase}>
            <div className={styles.group}>
              <label>SELECT MOOD</label>
              <div className={styles.chipRow}>
                {['Action', 'Drama', 'Chill', 'Intense'].map(m => (
                  <button 
                    key={m} 
                    className={`${styles.chip} ${mood === m ? styles.chipActive : ''}`}
                    onClick={() => setMood(m)}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.group}>
              <label>GENRE TAGS</label>
              <div className={styles.chipRow}>
                {['Sci-Fi', 'Noir', 'Horror', 'Indie'].map(g => {
                  const isActive = genres.includes(g);
                  return (
                    <button 
                      key={g} 
                      className={`${styles.chip} ${isActive ? styles.chipActive : ''}`}
                      onClick={() => {
                        if (isActive) setGenres(genres.filter(x => x !== g));
                        else setGenres([...genres, g]);
                      }}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div className={styles.group}>
              <label>MIN RATING</label>
              <StarRating interactive value={rating} onChange={setRating} />
            </div>

            <button className={styles.spinBtn} onClick={handleSpin}>
              SPIN THE WHEEL
            </button>
          </div>
        )}

        {phase === 'spinning' && (
          <div className={styles.spinPhase}>
            <div className={styles.slotWindow}>
              <div className={styles.slotReel} style={{ transform: `translateY(-${slotIndex * 240}px)` }}>
                {slotImages.map((src, i) => (
                  <img key={i} src={src} alt="slot" className={styles.slotImg} />
                ))}
              </div>
            </div>
          </div>
        )}

        {phase === 'result' && resultItem && (
          <div className={styles.resultPhase}>
            <img 
              src={`https://picsum.photos/seed/${resultItem.id}/160/240`} 
              alt={resultItem.title} 
              className={styles.resultPoster} 
            />
            <div className={styles.resultInfo}>
              <h3 className={styles.resultTitle}>{resultItem.title.toUpperCase()}</h3>
              <div className={styles.resultMeta}>
                <span>{resultItem.year}</span>
                <span className={styles.dot}>&middot;</span>
                <span>{resultItem.runtime} MINS</span>
                <span className={styles.dot}>&middot;</span>
                <span style={{color: 'var(--accent-green)'}}>★ {resultItem.score.toFixed(1)}/5</span>
              </div>
              <p className={styles.resultGenres}>{resultItem.genres.join(', ')}</p>
              
              <div className={styles.resultActions}>
                <button className={styles.playBtn} onClick={onClose}><Play size={16} fill="white" /> PLAY NOW</button>
                <div style={{display: 'flex', gap: '8px', width: '100%'}}>
                   <button className={styles.ghostBtn} onClick={() => {
                     addToWatchlist(resultItem.id);
                   }}>
                     + WATCHLIST
                   </button>
                   <button className={styles.ghostBtn} onClick={handleSpin}>
                     SPIN AGAIN
                   </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RandomWatchModal;
