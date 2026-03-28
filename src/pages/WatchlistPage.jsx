import { useState } from 'react';
import { GripVertical, X, Settings, Share, Trash2, PieChart as PieChartIcon, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import useStore from '../store/useStore';
import { CONTENT_ITEMS } from '../data/mockData';
import NavBar from '../components/NavBar';
import StarRating from '../components/StarRating';
import RandomWatchFAB from '../components/RandomWatchFAB';
import styles from './WatchlistPage.module.css';

const SortableItem = ({ item, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div ref={setNodeRef} style={style} className={styles.listItemRow}>
      <button className={styles.dragHandle} {...attributes} {...listeners}>
        <GripVertical size={16} />
      </button>
      
      <img src={`https://picsum.photos/seed/${item.id}/48/72`} alt={item.title} className={styles.itemPoster} />
      
      <div className={styles.itemInfo}>
        <div className={styles.itemTitle}>{item.title}</div>
        <div className={styles.itemMeta}>
          {item.year} &middot; <span className={styles.genreChip}>{item.genres[0]}</span>
        </div>
      </div>
      
      <div className={styles.itemRating}>
        <StarRating interactive value={4} size="sm" />
      </div>

      <button className={styles.removeBtn} onClick={() => onRemove(item.id)}>
        <X size={16} />
      </button>
    </div>
  );
};

const WatchlistPage = () => {
  const { watchlist, reorderWatchlist, removeFromWatchlist } = useStore();
  const [activeListId, setActiveListId] = useState('watchlist');
  const [modalOpen, setModalOpen] = useState(false);

  // Map IDs to actual items
  const items = watchlist.map(id => CONTENT_ITEMS.find(x => x.id === id)).filter(Boolean);
  
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = watchlist.indexOf(active.id);
      const newIndex = watchlist.indexOf(over.id);
      reorderWatchlist(arrayMove(watchlist, oldIndex, newIndex));
    }
  };

  const totalRuntimeStr = () => {
    const totalMins = items.reduce((acc, curr) => acc + curr.runtime, 0);
    const days = Math.floor(totalMins / 1440);
    const hrs = Math.floor((totalMins % 1440) / 60);
    if (days > 0) return `${days} days ${hrs} hours`;
    return `${hrs} hours ${totalMins % 60} mins`;
  };

  const pieData = [
    { name: 'Action', value: 30, color: '#E50914' },
    { name: 'Sci-Fi', value: 25, color: '#00B4D8' },
    { name: 'Drama', value: 20, color: '#F39C12' },
    { name: 'Horror', value: 15, color: '#2ECC71' },
    { name: 'Comedy', value: 10, color: '#9B59B6' },
  ];

  return (
    <div className={styles.page}>
      <NavBar />
      
      <div className={styles.layout}>
        <div className={styles.sidebar}>
          <h2 className={styles.sidebarHeading}>MY LISTS</h2>
          
          <div className={styles.listGroups}>
            <div className={`${styles.navItem} ${styles.activeNavItem}`}>
              <Clock size={16} /> Want to Watch <span className={styles.countBadge}>{watchlist.length}</span>
            </div>
            <div className={styles.navItem}>
              <Play size={16} /> Watching <span className={styles.countBadge}>3</span>
            </div>
            <div className={styles.navItem}>
               <Check size={16} /> Watched <span className={styles.countBadge}>128</span>
            </div>
            
            <div className={styles.sidebarDivider} />
            
            <div className={styles.navItem}>Sci-Fi Epics <span className={styles.countBadge}>14</span></div>
            <div className={styles.navItem}>Midnight Horror <span className={styles.countBadge}>8</span></div>
            <div className={styles.navItem}>K-Dramas <span className={styles.countBadge}>22</span></div>
            
            <button className={styles.newListBtn} onClick={() => setModalOpen(true)}>
              + NEW LIST
            </button>
          </div>
        </div>
        
        <div className={styles.content}>
          <div className={styles.listHeader}>
             <div className={styles.mosaic}>
               {items.slice(0, 4).map((img, i) => (
                 <img key={i} src={`https://picsum.photos/seed/${img.id}/100/150`} alt="cover" className={styles.mosaicImg} />
               ))}
               {Array.from({length: Math.max(0, 4 - items.length)}).map((_, i) => (
                 <div key={`empty-${i}`} className={styles.mosaicEmpty} />
               ))}
             </div>
             
             <div className={styles.listHeaderInfo}>
               <h1 className={styles.listTitle}>Want to Watch</h1>
               <div className={styles.listMeta}>
                 {items.length} titles &middot; {totalRuntimeStr()}
               </div>
               
               <div className={styles.listActions}>
                 <button className={styles.actionBtn}><Settings size={14} /> Edit</button>
                 <button className={styles.actionBtn}><Share size={14} /> Share</button>
                 <button className={styles.actionBtn}><Trash2 size={14} color="var(--brand-red)" /> Delete</button>
               </div>
             </div>
          </div>
          
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={watchlist} strategy={verticalListSortingStrategy}>
              <div className={styles.itemsList}>
                {items.map(item => (
                  <SortableItem key={item.id} item={item} onRemove={removeFromWatchlist} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          
          <div className={styles.statsCard}>
             <div className={styles.statsTop}>
                <div className={styles.statBox}>
                   <div className={styles.statLabel}>TOTAL RUNTIME</div>
                   <div className={styles.statValue}>{totalRuntimeStr()}</div>
                </div>
                
                <div className={styles.chartWrapper}>
                  <ResponsiveContainer width={120} height={120}>
                    <PieChart>
                      <Pie data={pieData} innerRadius={40} outerRadius={60} paddingAngle={2} dataKey="value">
                        {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
             </div>
             
             <div className={styles.progressBarWrapper}>
               <div className={styles.progressLabel}>Completion <span>18%</span></div>
               <div className={styles.track}>
                 <div className={styles.fill} style={{ width: '18%' }}></div>
               </div>
             </div>
          </div>
        </div>
      </div>
      
      {modalOpen && (
        <div className={styles.modalOverlay} onClick={() => setModalOpen(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Create List</h2>
            <input type="text" placeholder="Name your list..." className={styles.inputField} />
            <textarea placeholder="Description (optional)" className={styles.textareaField}></textarea>
            
            <label className={styles.toggleRow}>
               <span className={styles.toggleLabel}>Public list</span>
               <input type="checkbox" defaultChecked />
            </label>
            
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setModalOpen(false)}>Cancel</button>
              <button className={styles.saveBtn} onClick={() => setModalOpen(false)}>Create</button>
            </div>
          </div>
        </div>
      )}

      <RandomWatchFAB />
    </div>
  );
};

export default WatchlistPage;
