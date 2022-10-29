import { FunctionComponent, useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import Component from '../components/SideMenuDropdown';
import { useDispatch, useSelector } from '../hooks/redux';
import { createClassicConfigAction, resetPlayersAction } from '../redux/global-actions';
import { toggleIsAllianceAction } from '../redux/Settings';
import { isAllianceSelector } from '../redux/Settings/selectors';

type Props = {
  key?: string;
};

const DropdownMenu: FunctionComponent<Props> = () => {
  const dispatch = useDispatch();
  const isAlliance = useSelector(isAllianceSelector, shallowEqual);

  const handleNuke = useCallback(() => {
    resetPlayersAction(dispatch);
  }, [dispatch]);

  const handleClassicPlayers = useCallback(() => {
    createClassicConfigAction(dispatch);
  }, [dispatch]);

  const handleToggleAlliance = useCallback(() => {
    dispatch(toggleIsAllianceAction());
  }, [dispatch]);

  return (
    <Component
      isAlliance={isAlliance}
      onToggleAlliance={handleToggleAlliance}
      onNukeAll={handleNuke}
      onFillClassicPlayers={handleClassicPlayers}
    />
  );
};

export default DropdownMenu;
