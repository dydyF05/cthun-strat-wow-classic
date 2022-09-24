import { FunctionComponent, useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import Component from '../components/SelectedPlayer';
import { useDispatch, useSelector } from '../hooks/redux';
import { playerSelector } from '../redux/Players/selectors';
import { setSelectedPlayerAction } from '../redux/Settings';
import { selectedPlayerSelector } from '../redux/Settings/selectors';

export type Props = Record<string, never>;

const SelectedPlayer: FunctionComponent<Props> = () => {
  const playerId = useSelector(selectedPlayerSelector, shallowEqual);
  const player = useSelector(playerSelector({ name: playerId || '' }), shallowEqual);
  const dispatch = useDispatch();

  const handleCancel = useCallback(() => {
    dispatch(setSelectedPlayerAction(undefined));
  }, [dispatch]);

  if (!player) return null;

  return <Component {...player} onCancel={handleCancel} />;
};

export default SelectedPlayer;
