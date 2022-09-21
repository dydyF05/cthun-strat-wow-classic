import { FunctionComponent, memo, useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import Component, { Props as ComponentProps } from '../components/SideMenu';
import { useDispatch, useSelector } from '../hooks/redux';
import { playerStatsSelector } from '../redux/Players/selectors';
import { setIsConfiguringAction } from '../redux/Zones';
import { isConfuringSelector } from '../redux/Zones/selectors';

export type Props = Pick<ComponentProps, 'onAddPlayer'>;

const SideMenu: FunctionComponent<Props> = memo(props => {
  const isEditing = useSelector(isConfuringSelector, shallowEqual);
  const dispatch = useDispatch();

  const { total, dpsDistance, dpsMelee, tank, heal } = useSelector(
    playerStatsSelector,
    shallowEqual
  );

  const handleToggle = useCallback(() => {
    dispatch(setIsConfiguringAction(!isEditing));
  }, [isEditing, dispatch]);

  return (
    <Component
      {...props}
      totalCount={total}
      dpsDistanceCount={dpsDistance}
      dpsMeleeCount={dpsMelee}
      healCount={heal}
      tankCount={tank}
      isEditing={isEditing}
      onToggleConfiguring={handleToggle}
    />
  );
});
SideMenu.displayName = 'SideMenu';

export default SideMenu;
