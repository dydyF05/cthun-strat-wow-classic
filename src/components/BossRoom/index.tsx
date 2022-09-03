import { FunctionComponent, memo } from 'react';
import Zones from '../../containers/Zones';
import classes from './index.module.css';

export type Props = {};

const BossRoom: FunctionComponent<Props> = memo(() => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <p>Stairs</p>
        <div className={classes.zones}>
          <Zones />
        </div>
      </div>
      <div className={classes.entrance}>
        <p>Entrance</p>
      </div>
    </div>
  );
});
BossRoom.displayName = 'BossRoom';

export default BossRoom;
