import React from 'react';
import PathLinesSVG from './PathLinesSVG';

interface PathLinesBackgroundProps {
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
  opacity?: number;
  preserveAspectRatio?: string;
}

const PathLinesBackground: React.FC<PathLinesBackgroundProps> = ({
  className = '',
  strokeColor = 'currentColor',
  strokeWidth = 1,
  stroke = 'none',
  fill = 'hsl(41, 90%, 77%)',
  opacity = 0.5,
  preserveAspectRatio = 'xMaxYMid meet'
}) => {
  return (
    <div 
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
      data-component="path-lines-background"
      data-testid="path-lines-background"
      style={{
        background: `
          linear-gradient(135deg, 
            hsl(220, 19%, 25%) 0%, 
            hsl(220, 22%, 22%) 25%, 
            hsl(220, 25%, 19%) 50%, 
            hsl(220, 28%, 16%) 75%, 
            hsl(220, 31%, 13%) 100%
          )
        `
      }}
    >
      <PathLinesSVG
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        stroke={stroke}
        fill={fill}
        className="w-full h-full object-cover"
        preserveAspectRatio={preserveAspectRatio}
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