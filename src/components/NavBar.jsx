import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';
import useStore from '../store/useStore';
import styles from './NavBar.module.css';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { currentUser } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <Link to="/" className={styles.logo}>
        <span className={styles.clapper}>🎬</span> CineVault
      </Link>

      <nav className={styles.centerLinks}>
        {['Home', 'Browse', 'Movies', 'Series', 'Originals'].map((item) => {
          const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
          return (
            <NavLink
              key={item}
              to={path}
              className={({ isActive }) => 
                `${styles.navLink} ${isActive ? styles.activeLink : ''}`
              }
            >
              {item}
            </NavLink>
          );
        })}
      </nav>

      <div className={styles.rightActions}>
        <Link to="/search" className={styles.iconBtn}>
          <Search size={20} />
        </Link>
        <button className={styles.iconBtn}>
          <Bell size={20} />
          <span className={styles.redDot}></span>
        </button>
        <Link to={`/profile/${currentUser.username}`}>
          <img 
            src={currentUser.avatar} 
            alt="User Avatar" 
            className={styles.avatar} 
          />
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
