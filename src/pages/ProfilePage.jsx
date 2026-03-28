import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Film, Ghost, Moon, Timer, Star } from 'lucide-react';
import useStore from '../store/useStore';
import NavBar from '../components/NavBar';
import ReviewCard from '../components/ReviewCard';
import RandomWatchFAB from '../components/RandomWatchFAB';
import { CONTENT_ITEMS } from '../data/mockData';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const { username } = useParams();
  const { currentUser } = useStore();

  const user = { ...currentUser, username: username || currentUser.username };
  
  // Diary mock logic
  // Create 31 day squares. Mark 7 randomly as watched.
  const days = Array.from({length: 31}, (_, i) => ({
    day: i + 1,
    watched: i % 4 === 1,
    item: i % 4 === 1 ? CONTENT_ITEMS[Math.floor(Math.random() * 20)] : null
  }));

  const stats = [
    { num: 842, label: 'TOTAL FILMS' },
    { num: 156, label: 'REVIEWS' },
    { num: 42, label: 'WATCHLIST' },
    { num: '1.2k', label: 'FOLLOWERS' },
  ];

  return (
    <div className={styles.page}>
      <NavBar />

      <div className={styles.headerArea}>
        <div className={styles.backdropStrip} />
        
        <div className={styles.profileHeader}>
           <img src={user.avatar} alt="User Avatar" className={styles.avatarBig} />
           <div className={styles.userInfo}>
             <h1 className={styles.userName}>{user.username.toUpperCase()}</h1>
             <div className={styles.proBadge}>PRO MEMBER</div>
           </div>
           
           <button className={styles.editBtn}>EDIT PROFILE</button>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.statsDashboard}>
           {stats.map(s => (
             <div key={s.label} className={styles.statCard}>
               <div className={styles.statLabel}>{s.label}</div>
               <div className={styles.statNum}>{s.num}</div>
             </div>
           ))}
        </div>

        <div className={styles.twoCol}>
           <div className={styles.leftCol}>
             <h3 className={styles.sectionHeading}>RECENT ACTIVITY <span className={styles.sublink}>VIEW DIARY</span></h3>
             <div className={styles.diaryGrid}>
               {days.filter(d => d.watched).slice(0, 5).map((d, i) => (
                 <div key={i} className={styles.diaryCard}>
                    <img src={`https://picsum.photos/seed/${d.item.id}/120/180`} className={styles.diaryImg} alt="poster" />
                    <div className={styles.diaryDate}>MAY {String(d.day).padStart(2,'0')}, 2024</div>
                 </div>
               ))}
             </div>

             <h3 className={styles.sectionHeading}>ACHIEVEMENTS</h3>
             <div className={styles.shelf}>
                <div className={styles.badgeItem}><div className={`${styles.badgeIcon} ${styles.earned}`}><Film size={20}/></div></div>
                <div className={styles.badgeItem}><div className={`${styles.badgeIcon} ${styles.earned}`}><Timer size={20}/></div></div>
                <div className={styles.badgeItem}><div className={`${styles.badgeIcon} ${styles.locked}`}><Moon size={20}/></div></div>
                <div className={styles.badgeItem}><div className={`${styles.badgeIcon} ${styles.locked}`}><Ghost size={20}/></div></div>
                <div className={styles.badgeItem}><div className={`${styles.badgeIcon} ${styles.earned}`}><Star size={20}/></div></div>
             </div>
           </div>

           <div className={styles.rightCol}>
             <h3 className={styles.sectionHeading}>RECENT REVIEWS</h3>
             <div className={styles.reviewsList}>
               {CONTENT_ITEMS[0].reviews.map(r => (
                 <ReviewCard key={r.id} review={r} />
               ))}
             </div>
           </div>
        </div>
      </div>

      <RandomWatchFAB />
    </div>
  );
};

export default ProfilePage;
