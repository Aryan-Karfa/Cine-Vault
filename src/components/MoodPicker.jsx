import useStore from '../store/useStore';
import styles from './MoodPicker.module.css';

const moods = [
  { id: 'laugh', emoji: '😂', label: 'Laugh' },
  { id: 'thrill', emoji: '😱', label: 'Thrill' },
  { id: 'cry', emoji: '😢', label: 'Cry' },
  { id: 'think', emoji: '🧠', label: 'Think' },
  { id: 'romance', emoji: '❤️', label: 'Romance' },
  { id: 'action', emoji: '🔥', label: 'Action' }
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
            <span className="emoji">{mood.emoji}</span>
            <span className={styles.label}>{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodPicker;
