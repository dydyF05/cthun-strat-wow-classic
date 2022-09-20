import { FunctionComponent, memo } from 'react';
import SideMenuPlayer, { Props as SideMenuPlayerProps } from '../../containers/SideMenuPlayer';
import { Player } from '../../redux/Players';
import classes from './index.module.css';

export type Props = {
  title: string;
  image: string;
  players: Player['name'][];
  onPlayerPress: SideMenuPlayerProps['onPosition'];
};

const Players: FunctionComponent<Props> = memo(({ title, image, players, onPlayerPress }) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <img src={image} />
        <h4>
          {title} ({players.length})
        </h4>
      </div>
      <div className={classes.players}>
        {players.map(player => (
          <div key={`discord-player-${player}`} className={classes.player}>
            <SideMenuPlayer name={player} onPosition={onPlayerPress} />
          </div>
        ))}
      </div>
    </div>
  );
});
Players.displayName = 'Players';

export default Players;
