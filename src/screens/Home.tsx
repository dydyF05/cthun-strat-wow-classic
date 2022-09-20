import { FunctionComponent, useCallback, useState } from 'react';
import ModalAddPlayer, { Props as AddPlayerProps } from '../components/ModalAddPlayer';
import BossRoom from '../containers/BossRoom';
import SideMenu from '../containers/SideMenu';
import { useDispatch } from '../hooks/redux';
import { addManyAction } from '../redux/Players';
import classes from './Home.module.css';

export type Props = Record<string, never>;

const Home: FunctionComponent<Props> = () => {
  const [isAddingPlayer, setIsAddingPlayer] = useState(false);
  const dispatch = useDispatch();

  const handleCancelAddPlayer = useCallback(() => {
    setIsAddingPlayer(false);
  }, []);

  const handleAddPlayer = useCallback(() => {
    setIsAddingPlayer(true);
  }, []);

  const handleValidate = useCallback<AddPlayerProps['onValidate']>(
    player => {
      dispatch(addManyAction([player]));
    },
    [dispatch]
  );

  return (
    <div className={classes.container}>
      <BossRoom />
      <div className={classes.spacer} />
      <SideMenu onAddPlayer={handleAddPlayer} />
      <ModalAddPlayer
        isVisible={isAddingPlayer}
        onCancel={handleCancelAddPlayer}
        onValidate={handleValidate}
      />
    </div>
  );
};

export default Home;
