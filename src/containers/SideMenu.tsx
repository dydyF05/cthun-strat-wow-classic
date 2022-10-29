import { FunctionComponent, memo, useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import Component, { Props as ComponentProps } from '../components/SideMenu';
import { useDispatch, useSelector } from '../hooks/redux';
import usePlayerStats from '../hooks/use-player-stats';
import { setIsConfiguringAction } from '../redux/Settings';
import { isAllianceSelector, isConfuringSelector } from '../redux/Settings/selectors';

export type Props = Pick<ComponentProps, 'onAddPlayer'>;

const SideMenu: FunctionComponent<Props> = memo(props => {
  const isEditing = useSelector(isConfuringSelector, shallowEqual);
  const isAlliance = useSelector(isAllianceSelector, shallowEqual);
  const dispatch = useDispatch();

  const { distance, melee, tank, heal, positionsWithPlayer, total } = usePlayerStats();

  const handleToggle = useCallback(() => {
    dispatch(setIsConfiguringAction(!isEditing));
  }, [isEditing, dispatch]);

  return (
    <Component
      {...props}
      totalCount={total}
      playerPositionedCount={positionsWithPlayer}
      dpsDistanceCount={distance}
      dpsMeleeCount={melee}
      healCount={heal}
      tankCount={tank}
      isEditing={isEditing}
      isAlliance={isAlliance}
      onToggleConfiguring={handleToggle}
    />
  );
});
SideMenu.displayName = 'SideMenu';

export default SideMenu;
