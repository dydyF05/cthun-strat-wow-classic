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
  isChoosingPositionForPlayer?: boolean;
  hasPlayer?: boolean;
  marker?: PositionStateType['marker'];
  containerRef: ClassAttributes<HTMLDivElement>['ref'];
} & Partial<Player>;

const _Position: FunctionComponent<Props> = memo(
  ({
    id,
    bottom,
    left,
    marker,
    isChoosingPositionForPlayer,
    hasPlayer,
    build,
    name,
    containerRef,
  }) => {
    return (
      <div
        className={classes.container}
        data-marker={!!marker}
        style={{
          bottom,
          left,
          opacity: isChoosingPositionForPlayer ? 0.1 : (hasPlayer && 0.5) || 1,
        }}
        ref={containerRef}
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
            <p>{name.slice(0, 5)}</p>
          </div>
        )}
      </div>
    );
  }
);
_Position.displayName = 'Position';

const Position = forwardRef<HTMLDivElement, Omit<Props, 'containerRef'>>((props, ref) => (
  <_Position {...props} containerRef={ref} />
));
Position.displayName = 'PositionWithRef';

export default Position;
