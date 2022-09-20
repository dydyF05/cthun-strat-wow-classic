import { FunctionComponent, memo } from 'react';
import { BUILD_IMAGES } from '../../lib/player';
import { Player } from '../../redux/Players';
import classes from './index.module.css';

export type Props = Pick<Player, 'name' | 'build'>;

const SideMenuPlayer: FunctionComponent<Props> = memo(({ name, build }) => {
  return (
    <div className={classes.container}>
      <img src={BUILD_IMAGES[build]} />
      <p>{name}</p>
    </div>
  );
});
SideMenuPlayer.displayName = 'Player';

export default SideMenuPlayer;
