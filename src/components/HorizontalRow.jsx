import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ContentCard from './ContentCard';
import styles from './HorizontalRow.module.css';

const HorizontalRow = ({ label, items, seeAll = false, size = 'md' }) => {
  const rowRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const scroll = (dir) => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.75;
      rowRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div 
      className={styles.container} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.header}>
        <h3 className={styles.label}>{label}</h3>
        {seeAll && (
          <button className={styles.seeAll}>
            See all &rarr;
          </button>
        )}
      </div>

      <div className={styles.rowWrapper}>
        <button 
          className={`${styles.chevron} ${styles.left} ${isHovered ? styles.visible : ''}`} 
          onClick={() => scroll('left')}
        >
          <ChevronLeft size={24} />
        </button>

        <div className={styles.row} ref={rowRef}>
          {items.map((item, idx) => (
            <ContentCard key={item.id + idx} item={item} size={size} />
          ))}
        </div>

        <button 
          className={`${styles.chevron} ${styles.right} ${isHovered ? styles.visible : ''}`} 
          onClick={() => scroll('right')}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default HorizontalRow;
