const Skeleton = ({ width, height, radius = 'var(--radius-sm)', style }) => {
  return (
    <div 
      className="skeleton" 
      style={{
        width: width || '100%',
        height: height || '200px',
        borderRadius: radius,
        ...style
      }}
    />
  );
};

export default Skeleton;
