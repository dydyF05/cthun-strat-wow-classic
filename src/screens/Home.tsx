import { FunctionComponent } from 'react';
import BossRoom from '../containers/BossRoom';
import SideMenu from '../containers/SideMenu';
import classes from './Home.module.css';

export type Props = Record<string, never>;

const Home: FunctionComponent<Props> = () => {
  return (
    <div className={classes.container}>
      <BossRoom />
      <div className={classes.spacer} />
      <SideMenu />
    </div>
  );
};

export default Home;
