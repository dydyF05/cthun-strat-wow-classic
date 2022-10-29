import { FunctionComponent, useCallback, useState } from 'react';
import ModalAddPlayer, { Props as AddPlayerProps } from '../components/ModalAddPlayer';
import BossRoom from '../containers/BossRoom';
import SelectedPlayer from '../containers/SelectedPlayer';
import SideMenu, { Props as SideMenuProps } from '../containers/SideMenu';
import { useDispatch, useSelector } from '../hooks/redux';
import { generatePlayerId } from '../lib/player';
import { addManyAction, updateManyAction } from '../redux/Players';
import { playerSelector } from '../redux/Players/selectors';
import classes from './Home.module.css';

export type Props = Record<string, never>;

const Home: FunctionComponent<Props> = () => {
  const [playerIdToUpsert, setUpsertedPlayerId] = useState<boolean | string>(false);
  const playerToEdit = useSelector(
    playerSelector({ id: typeof playerIdToUpsert === 'string' ? playerIdToUpsert : '' })
  );
  const dispatch = useDispatch();

  const handleCancelAddPlayer = useCallback(() => {
    setUpsertedPlayerId(false);
  }, []);

  const handleAddPlayer = useCallback(() => {
    setUpsertedPlayerId(true);
  }, []);

  const handleEditPlayer = useCallback<SideMenuProps['onEditPlayer']>(playerId => {
    setUpsertedPlayerId(playerId);
  }, []);

  const handleValidate = useCallback<AddPlayerProps['onValidate']>(
    player => {
      dispatch(
        typeof playerIdToUpsert === 'string'
          ? updateManyAction([
              {
                id: playerIdToUpsert,
                ...player,
              },
            ])
          : addManyAction([
              {
                id: generatePlayerId(),
                ...player,
              },
            ])
      );
      setUpsertedPlayerId(false);
    },
    [playerIdToUpsert, dispatch]
  );

  return (
    <div className={classes.container}>
      <BossRoom />
      <SideMenu onAddPlayer={handleAddPlayer} onEditPlayer={handleEditPlayer} />
      <ModalAddPlayer
        player={playerToEdit}
        isVisible={!!playerIdToUpsert}
        onCancel={handleCancelAddPlayer}
        onValidate={handleValidate}
      />

      <SelectedPlayer />
    </div>
  );
};

export default Home;
