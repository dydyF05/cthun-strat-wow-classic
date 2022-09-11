import { forwardRef, FunctionComponent, memo, RefObject } from 'react';
import Positions from '../../containers/Positions';
import Zones from '../../containers/Zones';
import classes from './index.module.css';

export const ZONES_CONTAINER_ID = 'zones-container';

export type Props = {
  graphContainerRef: RefObject<HTMLDivElement>;
};

const _BossRoom: FunctionComponent<Props> = memo(({ graphContainerRef }) => (
  <div className={classes.wrapper}>
    <div className={classes.container} ref={graphContainerRef}>
      <p>Stairs</p>
      <div className={classes.zones} id={ZONES_CONTAINER_ID}>
        <Zones />
      </div>
    </div>
    <div className={`${classes.container} ${classes.positions}`}>
      <Positions />
    </div>
    <div className={classes.entrance}>
      <p>Entrance</p>
    </div>
  </div>
));
_BossRoom.displayName = 'BossRoom';

const BossRoom = forwardRef((props, ref) => (
  <_BossRoom
    {...(props as Omit<Props, 'graphContainerRef'>)}
    graphContainerRef={ref as Props['graphContainerRef']}
  />
));
BossRoom.displayName = 'BossRoomWithRef';

export default BossRoom;
