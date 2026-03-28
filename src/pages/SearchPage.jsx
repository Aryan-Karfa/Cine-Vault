import { useState, useEffect } from 'react';
import { Search, X, Clock, Flame } from 'lucide-react';
import { CONTENT_ITEMS } from '../data/mockData';
import useStore from '../store/useStore';
import NavBar from '../components/NavBar';
import ContentCard from '../components/ContentCard';
import RandomWatchFAB from '../components/RandomWatchFAB';
import styles from './SearchPage.module.css';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const { recentSearches, addRecentSearch } = useStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      if (query.trim().length > 2) addRecentSearch(query);
    }, 400);
    return () => clearTimeout(timer);
  }, [query, addRecentSearch]);

  const results = debouncedQuery 
    ? CONTENT_ITEMS.filter(x => x.title.toLowerCase().includes(debouncedQuery.toLowerCase()) || x.director.toLowerCase().includes(debouncedQuery.toLowerCase()) || x.cast.some(c => c.toLowerCase().includes(debouncedQuery.toLowerCase())))
    : [];

  const typeaheadResults = query 
    ? CONTENT_ITEMS.filter(x => x.title.toLowerCase().includes(query.toLowerCase())).slice(0, 8) 
    : [];

  return (
    <div className={styles.page}>
      <NavBar />
      
      <div className={styles.container}>
        <div className={styles.searchWrapper}>
          <Search size={20} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Find your next masterpiece..." 
            className={styles.searchInput} 
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
             <button className={styles.clearBtn} onClick={() => setQuery('')}>
               <X size={16} />
             </button>
          )}

          {query && typeaheadResults.length > 0 && query !== debouncedQuery && (
            <div className={styles.typeahead}>
              {typeaheadResults.map(item => (
                <div key={item.id} className={styles.typeaheadItem} onClick={() => setQuery(item.title)}>
                  <img src={`https://picsum.photos/seed/${item.id}/32/48`} alt="" />
                  <div className={styles.taTitle}>{item.title}</div>
                  <div className={styles.taYear}>{item.year}</div>
                  <div className={styles.taBadge}>{item.type}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {!debouncedQuery ? (
           <div className={styles.defaultState}>
             <div className={styles.section}>
               <h3 className={styles.sectionHeading}>Recent Searches</h3>
               <div className={styles.listWrap}>
                 {recentSearches.map(s => (
                   <div key={s} className={styles.listItem} onClick={() => setQuery(s)}>
                     <Clock size={16} /> <span>{s}</span>
                   </div>
                 ))}
               </div>
             </div>
             
             <div className={styles.section}>
               <h3 className={styles.sectionHeading}><Flame size={16} color="var(--brand-red)" /> Trending Searches</h3>
               <div className={styles.listWrap}>
                 {['Neo-Noir Thrillers', 'Sienna Ro', 'Void Horizon', 'Mind-Bending Movies'].map(s => (
                   <div key={s} className={styles.listItem} onClick={() => setQuery(s)}>
                     <Search size={16} /> <span>{s}</span>
                   </div>
                 ))}
               </div>
             </div>
           </div>
        ) : (
           <div className={styles.resultsState}>
             <div className={styles.tabs}>
                {['All', 'Movies', 'Series', 'People', 'Users'].map(tab => (
                  <button 
                    key={tab} 
                    className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
             </div>
             
             {results.length > 0 ? (
               <div className={styles.grid}>
                 {results.map(item => <ContentCard key={item.id} item={item} />)}
               </div>
             ) : (
               <div className={styles.noResults}>
                 <p className={styles.noResText}>No results for '{debouncedQuery}'</p>
               </div>
             )}
           </div>
        )}
      </div>

      <RandomWatchFAB />
    </div>
  );
};

export default SearchPage;
