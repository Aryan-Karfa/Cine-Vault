import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Plus, Heart, Share2, MoreHorizontal, Check } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { CONTENT_ITEMS } from '../data/mockData';
import useStore from '../store/useStore';
import NavBar from '../components/NavBar';
import HorizontalRow from '../components/HorizontalRow';
import StarRating from '../components/StarRating';
import ReviewCard from '../components/ReviewCard';
import RandomWatchFAB from '../components/RandomWatchFAB';
import styles from './TitleDetailPage.module.css';

const TitleDetailPage = () => {
  const { id } = useParams();
  const { watchlist, addToWatchlist, removeFromWatchlist } = useStore();
  const [showMoreSynop, setShowMoreSynop] = useState(false);
  const [saveListOpen, setSaveListOpen] = useState(false);
  
  // Use first item as fallback if not found
  const item = CONTENT_ITEMS.find(x => x.id === id) || CONTENT_ITEMS[0];
  const inWatchlist = watchlist.includes(item.id);
  
  const handleWatchlist = () => {
    if (inWatchlist) removeFromWatchlist(item.id);
    else addToWatchlist(item.id);
  };

  const histogramData = [
    { name: '5', val: 45 },
    { name: '4', val: 30 },
    { name: '3', val: 15 },
    { name: '2', val: 7 },
    { name: '1', val: 3 },
  ];

  const similarItems = CONTENT_ITEMS.filter(x => x.genres.some(g => item.genres.includes(g)) && x.id !== item.id).slice(0, 8);
  const dirItems = CONTENT_ITEMS.filter(x => x.director === item.director && x.id !== item.id).slice(0, 8);

  const mockCast = item.cast.map((name, i) => ({
    id: `c${i}`,
    name,
    role: i === 0 ? 'Lead' : 'Supporting',
    avatar: `https://i.pravatar.cc/150?u=${name}`
  }));

  return (
    <div className={styles.page}>
      <NavBar />
      
      <div className={styles.hero}>
        <img src={`https://picsum.photos/seed/${item.id}bg/1280/720`} alt="backdrop" className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        
        <div className={styles.heroContent}>
          <h1 className={styles.title}>{item.title}</h1>
          <div className={styles.metaRow}>
            <span>{item.year}</span>
            <span className={styles.ratingBadge}>{item.rating}</span>
            <span>{item.runtime}m</span>
            <div className={styles.genreTags}>
              {item.genres.map(g => <span key={g} className={styles.genreTag}>{g}</span>)}
            </div>
          </div>
          
          <div className={styles.actionBar}>
            <button className={`${styles.actionBtn} ${styles.btnPrimary}`}>
              <Play size={20} fill="currentColor" /> Play
            </button>
            <button className={styles.actionBtn}>
              <Play size={20} /> Trailer
            </button>
            <button className={styles.actionBtn} onClick={handleWatchlist}>
              {inWatchlist ? <Check size={20} /> : <Plus size={20} />} {inWatchlist ? 'Added' : 'My List'}
            </button>
            <button className={styles.iconBtn}><Heart size={20} /></button>
            <button className={styles.iconBtn}><Share2 size={20} /></button>
            <button className={styles.iconBtn}><MoreHorizontal size={20} /></button>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.synopsisContainer}>
          <h3 className={styles.sectionHeading}>SYNOPSIS</h3>
          <p className={`${styles.synopsisText} ${showMoreSynop ? styles.expanded : ''}`}>
            {item.synopsis}
          </p>
          <button className={styles.showMoreBtn} onClick={() => setShowMoreSynop(!showMoreSynop)}>
            {showMoreSynop ? 'Show less' : 'Show more'}
          </button>
        </div>

        <div className={styles.castSection}>
          <h3 className={styles.sectionHeading}>CAST & CREW</h3>
          <div className={styles.castRow}>
            {mockCast.map(member => (
              <div key={member.id} className={styles.castCard}>
                <img src={member.avatar} alt={member.name} className={styles.castImg} />
                <span className={styles.castName}>{member.name}</span>
                <span className={styles.castRole}>{member.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.reviewPanel}>
        <div className={styles.reviewLayout}>
          <div className={styles.reviewLeft}>
            <div className={styles.scoreHeader}>
               <h2 className={styles.scoreText}>COMMUNITY</h2>
               <button className={styles.writeReviewBtn}>WRITE REVIEW</button>
            </div>
            
            <div className={styles.leftContentLayout}>
               <div className={styles.scoreLeft}>
                 <div className={styles.scoreBig}>{item.score.toFixed(1)}</div>
                 <StarRating value={item.score} size="md" />
                 <div className={styles.scoreCount}>based on {item.ratingCount.toLocaleString()} ratings</div>
               </div>
               
               <div className={styles.histogram}>
                 <ResponsiveContainer width={120} height={100}>
                    <BarChart layout="vertical" data={histogramData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                      <XAxis type="number" hide />
                      <YAxis type="category" dataKey="name" stroke="var(--text-tertiary)" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                      <Bar dataKey="val" radius={[0, 4, 4, 0]} barSize={8}>
                        {histogramData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill="var(--accent-green)" />
                        ))}
                      </Bar>
                    </BarChart>
                 </ResponsiveContainer>
               </div>
            </div>
          </div>

          <div className={styles.reviewRight}>
            <h3 className={styles.sectionHeading}>TOP REVIEWS</h3>
            {item.reviews.slice(0, 3).map(rev => (
              <ReviewCard key={rev.id} review={rev} />
            ))}
            <button className={styles.viewAllReviews}>View all {item.ratingCount} reviews &rarr;</button>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.activityStrip}>
          <div className={styles.avatarsStack}>
            <img src="https://i.pravatar.cc/32?u=99" alt="friend 1" />
            <img src="https://i.pravatar.cc/32?u=98" alt="friend 2" />
            <img src="https://i.pravatar.cc/32?u=97" alt="friend 3" />
          </div>
          <span className={styles.activityText}><strong>3 friends</strong> watched this <span className={styles.thisWeek}>this week</span></span>
          
          <div className={styles.saveListWrapper} onClick={() => setSaveListOpen(!saveListOpen)}>
            <button className={styles.saveListBtn}>Save to list ▾</button>
            {saveListOpen && (
              <div className={styles.saveMenu}>
                <div className={styles.menuItem}>Want to Watch {inWatchlist && <Check size={14} />}</div>
                <div className={styles.menuItem}>Sci-Fi Classics</div>
                <div className={styles.menuDivider}></div>
                <div className={styles.menuItemCreate}>+ Create new list</div>
              </div>
            )}
          </div>
        </div>

        <HorizontalRow label="More Like This" items={similarItems} size="md" />
        <HorizontalRow label={`More from ${item.director}`} items={dirItems} size="md" />
      </div>

      <RandomWatchFAB />
    </div>
  );
};

export default TitleDetailPage;
