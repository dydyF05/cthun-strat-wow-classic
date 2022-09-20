import { FunctionComponent, memo, useCallback, useState } from 'react';
import { shallowEqual } from 'react-redux';
import Component, { Props as ComponentProps } from '../components/SideMenu';
import { useSelector } from '../hooks/redux';
import { playerStatsSelector } from '../redux/Players/selectors';

export type Props = Pick<ComponentProps, 'onAddPlayer'>;

const SideMenu: FunctionComponent<Props> = memo(props => {
  const [isVisible, setIsVisible] = useState(true);

  const { total, dpsDistance, dpsMelee, tank, heal } = useSelector(
    playerStatsSelector,
    shallowEqual
  );

  const handleToggle = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  return (
    <Component
      {...props}
      totalCount={total}
      dpsDistanceCount={dpsDistance}
      dpsMeleeCount={dpsMelee}
      healCount={heal}
      tankCount={tank}
      isVisible={isVisible}
      onToggle={handleToggle}
    />
  );
});
SideMenu.displayName = 'SideMenu';

export default SideMenu;
