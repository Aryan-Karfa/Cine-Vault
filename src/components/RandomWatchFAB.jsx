import { useState } from 'react';
import { Dice5 } from 'lucide-react';
import RandomWatchModal from './RandomWatchModal';

const RandomWatchFAB = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setIsOpen(true);
    }, 200);
  };

  return (
    <>
      <button 
        className={`fab ${isAnimating ? 'fab-active' : ''}`}
        onClick={handleClick}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 200,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--brand-red)',
          boxShadow: 'var(--shadow-glow-red)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          transition: 'background var(--transition-fast), transform var(--transition-fast)',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--brand-red-dark)';
          e.currentTarget.querySelector('.icon').style.transform = 'rotate(180deg)';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--brand-red)';
          e.currentTarget.querySelector('.icon').style.transform = 'rotate(0deg)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <Dice5 
          className="icon" 
          size={24} 
          style={{ 
            transition: 'transform 400ms ease',
            animation: isAnimating ? 'diceShake 200ms ease' : 'none'
          }} 
        />
      </button>

      {isOpen && <RandomWatchModal onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default RandomWatchFAB;
