import { useState, useEffect } from 'react';
import { Play, Plus } from 'lucide-react';
import { CONTENT_ITEMS } from '../data/mockData';
import useStore from '../store/useStore';
import NavBar from '../components/NavBar';
import MoodPicker from '../components/MoodPicker';
import HorizontalRow from '../components/HorizontalRow';
import RandomWatchFAB from '../components/RandomWatchFAB';
import styles from './HomePage.module.css';

const HERO_ITEMS = CONTENT_ITEMS.filter(item => item.trending && item.trending <= 5);

const HomePage = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const { activeMood, watchlist, addToWatchlist } = useStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setHeroIndex(prev => (prev + 1) % HERO_ITEMS.length);
        setIsFading(false);
      }, 600); // Wait for fade out
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const heroItem = HERO_ITEMS[heroIndex];

  // Filtering Rows
  const filterByMood = (data) => {
    if (!activeMood) return data;
    return data.filter(item => item.mood.includes(activeMood));
  };

  const getFilteredItems = () => filterByMood(CONTENT_ITEMS);

  const continueWatching = getFilteredItems().filter(item => item.progress);
  const trendingNow = getFilteredItems().filter(item => item.trending).sort((a,b) => a.trending - b.trending);
  const becauseWatched = getFilteredItems().filter(item => item.score > 4.5);
  const topPicks = getFilteredItems().filter(item => item.ratingCount > 15000);

  const genres = ['Action', 'Comedy', 'Thriller', 'Drama', 'Horror', 'Sci-Fi', 'Documentary', 'Romance'];

  return (
    <>
      <NavBar />
      
      <div 
        className={`${styles.hero} grain`}
        style={{
          backgroundImage: `url(https://picsum.photos/seed/${heroItem.id}bg/1280/720)`
        }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroOverlayTop} />
        
        <div className={`${styles.heroContent} ${isFading ? styles.fadingOut : styles.fadingIn}`}>
          <h1 className={`${styles.heroTitle} hero-title`}>{heroItem.title}</h1>
          <p className={`${styles.heroTagline} hero-tagline`}>{heroItem.synopsis}</p>
          
          <div className={styles.heroBadges}>
            <span className={styles.badgeChip}>{heroItem.rating}</span>
            {heroItem.genres.map(g => <span key={g} className={styles.badgeChip}>{g}</span>)}
            <span className={styles.badgeChip}>{heroItem.runtime}m</span>
            <span className={styles.badgeChip}>{heroItem.year}</span>
          </div>
          
          <div className={`${styles.heroActions} hero-actions`}>
            <button className={`${styles.btnRed} btn-primary`}>
              <Play fill="currentColor" size={20} /> Play
            </button>
            <button 
              className={styles.btnGhost}
              onClick={() => addToWatchlist(heroItem.id)}
            >
              <Plus size={20} /> Watchlist
            </button>
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <MoodPicker />
        
        <div className={styles.rowsContainer}>
          <HorizontalRow label="Continue Watching" items={continueWatching} />
          <HorizontalRow label="Trending Now" items={trendingNow} />
          <HorizontalRow label="Because You Watched" items={becauseWatched} />
          
          <div className={styles.topPicksHeader}>
            <div className={styles.avatarsStack}>
              <img src="https://i.pravatar.cc/32?u=1" alt="friend 1" />
              <img src="https://i.pravatar.cc/32?u=2" alt="friend 2" />
              <img src="https://i.pravatar.cc/32?u=3" alt="friend 3" />
            </div>
            <span className={styles.consensusChip}>★ 4.1 consensus</span>
          </div>
          <HorizontalRow label="Top Picks from Friends" items={topPicks} />

          {genres.map(g => (
            <HorizontalRow 
              key={g} 
              label={g} 
              items={getFilteredItems().filter(item => item.genres.includes(g))} 
            />
          ))}
        </div>
      </div>
      
      <RandomWatchFAB />
    </>
  );
};

export default HomePage;
