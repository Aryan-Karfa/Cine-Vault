import { useState } from 'react';
import { Star, StarHalf } from 'lucide-react';

const StarRating = ({ value = 0, interactive = false, size = 'md', onChange }) => {
  const [hoverValue, setHoverValue] = useState(0);
  
  const sizes = { sm: 14, md: 20, lg: 36 };
  const pxSize = sizes[size] || 20;
  
  const displayValue = interactive ? (hoverValue || value) : value;

  const renderStar = (index) => {
    // index is 1 to 5
    const isInteractiveStyle = interactive ? { cursor: 'pointer' } : {};
    
    if (displayValue >= index) {
      return (
        <Star 
          key={index}
          size={pxSize} 
          fill="var(--accent-amber)" 
          color="var(--accent-amber)" 
          style={isInteractiveStyle}
          onMouseEnter={() => interactive && setHoverValue(index)}
          onClick={() => interactive && onChange && onChange(index)}
        />
      );
    } else if (displayValue >= index - 0.5) {
      return (
        <StarHalf 
          key={index}
          size={pxSize} 
          fill="var(--accent-amber)" 
          color="var(--accent-amber)" 
          style={isInteractiveStyle}
          onMouseEnter={() => interactive && setHoverValue(index)}
          onClick={() => interactive && onChange && onChange(index)}
        />
      );
    } else {
      return (
        <Star 
          key={index}
          size={pxSize} 
          color="var(--text-tertiary)"
          style={isInteractiveStyle}
          onMouseEnter={() => interactive && setHoverValue(index)}
          onClick={() => interactive && onChange && onChange(index)}
        />
      );
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onMouseLeave={() => interactive && setHoverValue(0)}>
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map(renderStar)}
      </div>
      {!interactive && (
        <span style={{ 
          color: 'var(--accent-amber)', 
          fontFamily: 'var(--font-ui)', 
          fontWeight: 600, 
          fontSize: `${pxSize * 0.8}px`
        }}>
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;
