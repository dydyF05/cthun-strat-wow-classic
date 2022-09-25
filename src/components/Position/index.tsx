import { Typography } from 'antd';
import { ClassAttributes, forwardRef, FunctionComponent, memo } from 'react';
import { BUILD_IMAGES } from '../../lib/player';
import { MARKER_IMAGE } from '../../lib/position';
import { Player } from '../../redux/Players';
import { Position as PositionStateType } from '../../redux/Positions';
import classes from './index.module.css';

export type Props = {
  id: number;
  line: PositionStateType['line'];
  bottom: number;
  left: number;
  hasPlayer?: boolean;
  isEditing?: boolean;
  marker?: PositionStateType['marker'];
  containerRef: ClassAttributes<HTMLDivElement>['ref'];
  onPress?: () => void;
} & Partial<Player>;

const _Position: FunctionComponent<Props> = memo(
  ({ id, bottom, left, marker, hasPlayer, isEditing, build, name, onPress, containerRef }) => (
    <div
      className={classes.container}
      data-marker={!!marker}
      data-touchable={!!onPress}
      style={{
        bottom,
        left,
        opacity: hasPlayer && isEditing ? 0.5 : 1,
      }}
      ref={containerRef}
      onClick={onPress}
    >
      {!marker && <p>{id}</p>}
      {!!marker && (
        <img
          className={classes.raidImage}
          src={`${MARKER_IMAGE[marker]}`}
          key={`marker-${marker}`}
        />
      )}
      {!!hasPlayer && !!build && !!name && (
        <div className={classes.player}>
          <img src={BUILD_IMAGES[build]} />
          <Typography.Text italic>{name.slice(0, 7)}</Typography.Text>
        </div>
      )}
    </div>
  )
);
_Position.displayName = 'Position';

const Position = forwardRef<HTMLDivElement, Omit<Props, 'containerRef'>>((props, ref) => (
  <_Position {...props} containerRef={ref} />
));
Position.displayName = 'PositionWithRef';

export default Position;
