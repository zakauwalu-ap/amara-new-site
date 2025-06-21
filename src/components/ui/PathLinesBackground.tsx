import React from 'react';
import PathLinesSVG from './PathLinesSVG';

interface PathLinesBackgroundProps {
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  opacity?: number;
}

const PathLinesBackground: React.FC<PathLinesBackgroundProps> = ({
  className = '',
  strokeColor = 'currentColor',
  strokeWidth = 1,
  opacity = 0.1
}) => {
  return (
    <div 
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
      data-component="path-lines-background"
      data-testid="path-lines-background"
    >
      <PathLinesSVG
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        className="w-full h-full object-cover"
        style={{ 
          opacity,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'right center'
        }}
      />
    </div>
  );
};

export default PathLinesBackground;