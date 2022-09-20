import { FunctionComponent, memo } from 'react';
import SideMenuPlayer from '../../containers/SideMenuPlayer';
import { Player } from '../../redux/Players';
import classes from './index.module.css';

export type Props = {
  title: string;
  image: string;
  players: Player['name'][];
};

const Players: FunctionComponent<Props> = memo(({ title, image, players }) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <img src={image} />
        <h4>{title}</h4>
      </div>
      <div className={classes.players}>
        {players.map(player => (
          <div key={`discord-player-${player}`} className={classes.player}>
            <SideMenuPlayer name={player} />
          </div>
        ))}
      </div>
    </div>
  );
});
Players.displayName = 'Players';

export default Players;
