import { FunctionComponent, useCallback } from 'react';
import Component from '../components/SideMenuDropdown';
import { useDispatch } from '../hooks/redux';
import { createClassicConfigAction, resetPlayersAction } from '../redux/global-actions';

type Props = {
  key?: string;
};

const DropdownMenu: FunctionComponent<Props> = () => {
  const dispatch = useDispatch();

  const handleNuke = useCallback(() => {
    resetPlayersAction(dispatch);
  }, [dispatch]);

  const handleClassicPlayers = useCallback(() => {
    createClassicConfigAction(dispatch);
  }, [dispatch]);

  return <Component onNukeAll={handleNuke} onFillClassicPlayers={handleClassicPlayers} />;
};

export default DropdownMenu;
