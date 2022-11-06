import { FunctionComponent, useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import Component, { Props as ComponentProps } from '../components/SideMenuDropdown';
import { useDispatch, useSelector } from '../hooks/redux';
import parser from '../lib/csv';
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

  const handleInputCsvFile = useCallback<NonNullable<ComponentProps['onInputCsv']>>(
    ev => {
      const file = ev.target.files?.length ? ev.target.files[0] : undefined;

      file &&
        parser(file, players => {
          createClassicConfigAction(dispatch, players);
        });
    },
    [dispatch]
  );

  return (
    <Component
      isAlliance={isAlliance}
      onToggleAlliance={handleToggleAlliance}
      onNukeAll={handleNuke}
      onFillClassicPlayers={handleClassicPlayers}
      onInputCsv={handleInputCsvFile}
    />
  );
};

export default DropdownMenu;
