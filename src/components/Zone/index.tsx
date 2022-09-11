import { FunctionComponent, memo } from 'react';
import { ZoneId } from '../../redux/Zones';
import { Marker, ZoneColor } from '../../types/index.d';

export type Props = {
  id: ZoneId;
  svgHeight?: number;
  svgWidth?: number;
  color?: ZoneColor;
  marker?: Marker;
  horizontal: 'left' | 'right';
  position: 'up' | 'middle-up' | 'middle-bottom' | 'bottom';
};

const getTrianglePoints = ({
  horizontal,
  position,
  svgHeight,
  svgWidth,
}: Pick<Props, 'svgHeight' | 'svgWidth' | 'horizontal' | 'position'>): string => {
  if (!svgHeight || !svgWidth) return '';
  const baseX = horizontal === 'left' ? '0' : svgWidth;

  switch (position) {
    case 'up':
      return `${baseX},0 ${svgWidth / 2},${svgHeight / 2}, ${svgWidth / 2},0`;
    case 'middle-up':
      return `${baseX},0 ${svgWidth / 2},${svgHeight / 2} ${baseX},${svgHeight / 2}`;
    case 'middle-bottom':
      return `${baseX},${svgHeight / 2} ${svgWidth / 2},${svgHeight / 2} ${baseX},${svgHeight}`;
    case 'bottom':
      return `${baseX},${svgHeight} ${svgWidth / 2},${svgHeight}, ${svgWidth / 2},${svgHeight / 2}`;
    default:
      return '0';
  }
};

const getTextPoints = ({
  horizontal,
  position,
  svgHeight,
  svgWidth,
}: Pick<Props, 'svgHeight' | 'svgWidth' | 'horizontal' | 'position'>): { x: number; y: number } => {
  if (!svgHeight || !svgWidth) return { x: 0, y: 0 };

  switch (position) {
    case 'up':
      return {
        x: horizontal === 'left' ? svgHeight * 0.3 : svgHeight * 0.6,
        y: svgWidth * 0.125,
      };
    case 'middle-up':
      return {
        x: horizontal === 'left' ? svgHeight * 0.15 : svgHeight * 0.8,
        y: svgWidth * 0.4,
      };
    case 'middle-bottom':
      return {
        x: horizontal === 'left' ? svgHeight * 0.15 : svgHeight * 0.8,
        y: svgWidth * 0.65,
      };
    case 'bottom':
      return {
        x: horizontal === 'left' ? svgHeight * 0.3 : svgHeight * 0.6,
        y: svgWidth * 0.9,
      };
    default:
      return { x: 0, y: 0 };
  }
};

const Zone: FunctionComponent<Props> = memo(
  ({ id, svgHeight, svgWidth, color, horizontal, position }) => {
    if (!svgHeight || !svgWidth) return null;

    return (
      <>
        <polygon
          style={{ fill: color }}
          points={getTrianglePoints({ svgHeight, svgWidth, horizontal, position })}
        />
        <text
          {...getTextPoints({ svgHeight, svgWidth, horizontal, position })}
          style={{ fill: 'black', fontSize: 80 }}
        >
          {id}
        </text>
      </>
    );
  }
);
Zone.displayName = 'Zone';

export default Zone;
