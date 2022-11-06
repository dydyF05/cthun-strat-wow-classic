import { Typography } from 'antd';
import { ClassAttributes, forwardRef, FunctionComponent, memo } from 'react';
import { ConnectDragSource } from 'react-dnd';
import { BUILD_IMAGES } from '../../lib/player';
import { MARKER_IMAGE } from '../../lib/position';
import { Player } from '../../redux/Players';
import { Position as PositionStateType } from '../../redux/Positions';
import { Marker } from '../../types/index.d';
import classes from './index.module.css';

export type Props = {
  id: number;
  line: PositionStateType['line'];
  groupColor?: string;
  bottom: number;
  left: number;
  hasPlayer?: boolean;
  marker?: PositionStateType['marker'];
  containerRef: ClassAttributes<HTMLDivElement>['ref'];
  dragPlayerRef: ConnectDragSource;
  onPress?: () => void;
} & Partial<Pick<Player, 'name' | 'build'>>;

const MARKER_BOTTOM_FACTOR: Record<Marker, number> = {
  [Marker.Circle]: 0.1,
  [Marker.Cross]: 0.1,
  [Marker.Diamond]: -0.1,
  [Marker.Moon]: 0.1,
  [Marker.Skull]: 0.1,
  [Marker.Square]: -0.1,
  [Marker.Star]: -0.1,
  [Marker.Triangle]: -0.1,
};

const MARKER_LEFT_FACTOR: Record<Marker, number> = {
  [Marker.Circle]: -0.2,
  [Marker.Cross]: 0.1,
  [Marker.Diamond]: -0.2,
  [Marker.Moon]: -0.1,
  [Marker.Skull]: 0.2,
  [Marker.Square]: 0.1,
  [Marker.Star]: 0.2,
  [Marker.Triangle]: -0.1,
};

const getGroupPosition = (
  marker: Props['marker'],
  bottom: Props['bottom'],
  left: Props['left']
): Pick<Props, 'bottom' | 'left'> => {
  if (!marker) {
    return {
      bottom,
      left,
    };
  }

  return {
    bottom: bottom + MARKER_BOTTOM_FACTOR[marker] * bottom,
    left: left + MARKER_LEFT_FACTOR[marker] * left,
  };
};

const _Position: FunctionComponent<Props> = memo(
  ({
    id,
    groupColor,
    bottom,
    left,
    marker,
    hasPlayer,
    build,
    name,
    onPress,
    containerRef,
    dragPlayerRef,
  }) => (
    <>
      <div
        className={classes.container}
        data-marker={!!marker}
        data-touchable={!!onPress}
        style={{
          bottom,
          left,
          backgroundImage: build && !marker ? `url(${BUILD_IMAGES[build]})` : undefined,
        }}
        ref={containerRef}
        onClick={onPress}
      >
        {!marker && (
          <p className={classes.positionIndex} data-hasplayer={!!hasPlayer}>
            {id}
          </p>
        )}
        {!!marker && (
          <img
            className={classes.raidImage}
            src={`${MARKER_IMAGE[marker]}`}
            key={`marker-${marker}`}
          />
        )}
        {!!hasPlayer && !!build && !!name && (
          <div className={classes.player} ref={dragPlayerRef}>
            {/* {!!marker && <img className={classes.markerPlayerBuild} src={BUILD_IMAGES[build]} />} */}
            <Typography.Text style={{ margin: marker ? 'none' : '1vh' }} italic>
              {name.slice(0, 7)}
            </Typography.Text>
          </div>
        )}
      </div>
      {!!groupColor && (
        <div
          data-hasmarker={!!marker}
          className={classes.groupColor}
          style={{ backgroundColor: groupColor, ...getGroupPosition(marker, bottom, left) }}
        />
      )}
    </>
  )
);
_Position.displayName = 'Position';

const Position = forwardRef<HTMLDivElement, Omit<Props, 'containerRef'>>((props, ref) => (
  <_Position {...props} containerRef={ref} />
));
Position.displayName = 'PositionWithRef';

export default Position;
