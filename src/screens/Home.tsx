import { FunctionComponent } from 'react';
import BossRoom from '../components/BossRoom';
import PlayerList from '../containers/PlayerList';
import classes from './Home.module.css';

export type Props = Record<string, never>;

const Home: FunctionComponent<Props> = () => {
  return (
    <div className={classes.container}>
      <BossRoom />
      <div className={classes.spacer} />
      <PlayerList />
    </div>
  );
};

export default Home;
