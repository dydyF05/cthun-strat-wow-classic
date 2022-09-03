import { FunctionComponent, memo } from 'react';
import { Marker, ZoneColor } from '../../types/index.d';

export type Props = {
  svgHeight?: number;
  svgWidth?: number;
  color?: ZoneColor;
  marker?: Marker;
  horizontal: 'left' | 'right';
  position: 'up' | 'middle-up' | 'middle-bottom' | 'bottom';
};

const getPoints = ({
  horizontal,
  position,
  svgHeight,
  svgWidth,
}: Pick<Props, 'svgHeight' | 'svgWidth' | 'horizontal' | 'position'>): string => {
  if (!svgHeight || !svgWidth) return '';
  const baseX = horizontal === 'left' ? '0' : svgHeight;

  switch (position) {
    case 'up':
      return `${baseX},0 ${svgHeight / 2},${svgWidth / 2}, ${svgHeight / 2},0`;
    case 'middle-up':
      return `${baseX},0 ${svgHeight / 2},${svgWidth / 2} ${baseX},${svgWidth / 2}`;
    case 'middle-bottom':
      return `${baseX},${svgWidth / 2} ${svgHeight / 2},${svgWidth / 2} ${baseX},${svgWidth}`;
    case 'bottom':
      return `${baseX},${svgWidth} ${svgHeight / 2},${svgWidth}, ${svgHeight / 2},${svgWidth / 2}`;
    default:
      return '0';
  }
};

const Zone: FunctionComponent<Props> = memo(
  ({ svgHeight, svgWidth, color, horizontal, position }) => {
    if (!svgHeight || !svgWidth) return null;

    return (
      <polygon
        style={{ fill: color }}
        points={getPoints({ svgHeight, svgWidth, horizontal, position })}
      />
    );
  }
);
Zone.displayName = 'Zone';

export default Zone;
