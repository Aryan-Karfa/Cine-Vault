import useStore from '../store/useStore';
import styles from './MoodPicker.module.css';

const moods = [
  { id: 'laugh', label: 'Laugh' },
  { id: 'thrill', label: 'Thrill' },
  { id: 'cry', label: 'Cry' },
  { id: 'think', label: 'Think' },
  { id: 'romance', label: 'Romance' },
  { id: 'action', label: 'Action' }
];

const MoodPicker = () => {
  const { activeMood, setActiveMood } = useStore();

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>HOW ARE YOU FEELING TODAY?</h3>
      <div className={styles.strip}>
        {moods.map(mood => (
          <button
            key={mood.id}
            className={`${styles.pill} ${activeMood === mood.id ? styles.active : ''}`}
            onClick={() => setActiveMood(mood.id)}
          >
            <span className={styles.label}>{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodPicker;
