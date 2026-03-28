import { useState, useEffect, useRef } from 'react';
import { Grid, List, X, Filter } from 'lucide-react';
import NavBar from '../components/NavBar';
import ContentCard from '../components/ContentCard';
import StarRating from '../components/StarRating';
import Skeleton from '../components/Skeleton';
import RandomWatchFAB from '../components/RandomWatchFAB';
import { CONTENT_ITEMS } from '../data/mockData';
import styles from './BrowsePage.module.css';

const BrowsePage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const loadingRef = useRef(null);

  // Filters State
  const [activeFilters, setActiveFilters] = useState({
    genre: [],
    type: 'All',
    minRating: 0,
    sort: 'Trending'
  });

  // Mock initial load
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setItems(CONTENT_ITEMS.slice(0, 20));
      setLoading(false);
    }, 600);
  }, []);

  // Infinite Scroll intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loading) {
        if (items.length < CONTENT_ITEMS.length) {
          setLoading(true);
          setTimeout(() => {
            setItems(prev => [...prev, ...CONTENT_ITEMS.slice(prev.length, prev.length + 20)]);
            setLoading(false);
          }, 800);
        }
      }
    });
    if (loadingRef.current) observer.observe(loadingRef.current);
    return () => observer.disconnect();
  }, [loading, items]);

  const toggleGenre = (g) => {
    setActiveFilters(prev => ({
      ...prev,
      genre: prev.genre.includes(g) 
        ? prev.genre.filter(x => x !== g)
        : [...prev.genre, g]
    }));
  };

  const clearFilter = (key, val) => {
    if (key === 'genre') {
      setActiveFilters(prev => ({...prev, genre: prev.genre.filter(x => x !== val)}));
    } else {
      setActiveFilters(prev => ({...prev, [key]: key === 'type' ? 'All' : 0}));
    }
  };

  const getActiveChips = () => {
    let chips = [];
    activeFilters.genre.forEach(g => chips.push({ key: 'genre', val: g, label: g }));
    if (activeFilters.type !== 'All') chips.push({ key: 'type', val: activeFilters.type, label: activeFilters.type });
    if (activeFilters.minRating > 0) chips.push({ key: 'minRating', val: activeFilters.minRating, label: `★ ${activeFilters.minRating}+` });
    return chips;
  };

  const chips = getActiveChips();

  return (
    <div className={styles.page}>
      <NavBar />
      
      <div className={styles.stickyBar}>
        <div className={styles.filterControls}>
          <div className={styles.leftFilters}>
            <div className={styles.filterDropdown}>
              <span>Type: </span>
              <select 
                value={activeFilters.type} 
                onChange={e => setActiveFilters(prev => ({...prev, type: e.target.value}))}
              >
                <option>All</option>
                <option>Movies</option>
                <option>Series</option>
                <option>Shorts</option>
              </select>
            </div>
            
            <div className={styles.filterDropdown}>
              <span>Genre: </span>
              <select 
                value="" 
                onChange={e => {
                  if (e.target.value) toggleGenre(e.target.value);
                }}
              >
                <option value="">Add Genre...</option>
                {['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Documentary', 'Thriller', 'Romance'].map(g => (
                   <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div className={styles.starFilter}>
              <span>Min Rating:</span>
              <StarRating 
                interactive 
                value={activeFilters.minRating} 
                onChange={v => setActiveFilters(prev => ({...prev, minRating: v}))} 
              />
            </div>
          </div>
          
          <div className={styles.rightControls}>
            <div className={styles.filterDropdown}>
              <span>Sort: </span>
              <select 
                value={activeFilters.sort} 
                onChange={e => setActiveFilters(prev => ({...prev, sort: e.target.value}))}
              >
                <option>Trending</option>
                <option>Newest</option>
                <option>Highest Rated</option>
                <option>A-Z</option>
              </select>
            </div>
            
            <div className={styles.viewToggles}>
              <button 
                className={`${styles.toggleBtn} ${viewMode === 'grid' ? styles.activeView : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={18} />
              </button>
              <button 
                className={`${styles.toggleBtn} ${viewMode === 'list' ? styles.activeView : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {chips.length > 0 && (
          <div className={styles.activeChipsBar}>
            {chips.map((chip, i) => (
              <div key={i} className={styles.chip}>
                {chip.label}
                <button onClick={() => clearFilter(chip.key, chip.val)}><X size={12} /></button>
              </div>
            ))}
            <span className={styles.resultCount}>{items.length} titles</span>
          </div>
        )}
      </div>

      <div className={styles.content}>
        {viewMode === 'grid' ? (
          <div className={styles.gridView}>
            {items.map(item => (
              <ContentCard key={item.id} item={item} size="sm" />
            ))}
            {loading && Array.from({length: 6}).map((_, i) => <Skeleton key={i} height={240} />)}
          </div>
        ) : (
          <div className={styles.listView}>
            {items.map(item => (
              <div key={item.id} className={styles.listItem}>
                <img src={`https://picsum.photos/seed/${item.id}/80/120`} alt={item.title} className={styles.listThumb} />
                <div className={styles.listInfo}>
                  <h3 className={styles.listTitle}>{item.title}</h3>
                  <div className={styles.listMeta}>
                    <span>{item.year}</span> &middot; <span>{item.runtime}m</span> &middot; <span>{item.rating}</span>
                  </div>
                  <p className={styles.listSynop}>{item.synopsis}</p>
                  <div className={styles.listBottomRow}>
                    <div className={styles.listGenres}>
                      {item.genres.map(g => <span key={g} className={styles.genreBadge}>{g}</span>)}
                    </div>
                    <StarRating value={item.score} size="sm" />
                  </div>
                </div>
              </div>
            ))}
            {loading && Array.from({length: 3}).map((_, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <Skeleton width="80px" height="120px" />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Skeleton height="20px" width="40%" />
                  <Skeleton height="16px" width="20%" />
                  <Skeleton height="40px" width="80%" />
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div ref={loadingRef} className={styles.sentinel} />
      </div>

      <RandomWatchFAB />
    </div>
  );
};

export default BrowsePage;
