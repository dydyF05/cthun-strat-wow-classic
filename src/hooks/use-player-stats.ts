import { useMemo } from 'react';
import { shallowEqual } from 'react-redux';
import { playerCountSelector, playerWithRoleCount } from '../redux/Players/selectors';
import { positionWithPlayerCountSelector } from '../redux/Positions/selectors';
import { Role } from '../types/index.d';
import { useSelector } from './redux';

type Stats = {
  total: number;
  distance: number;
  melee: number;
  tank: number;
  heal: number;
  positionsWithPlayer: number;
};

const usePlayerStats = (): Stats => {
  const totalCount = useSelector(playerCountSelector, shallowEqual);
  const tankCount = useSelector(playerWithRoleCount(Role.Tank), shallowEqual);
  const meleeCount = useSelector(playerWithRoleCount(Role.DpsMelee), shallowEqual);
  const distanceCount = useSelector(playerWithRoleCount(Role.DpsDistance), shallowEqual);
  const healCount = useSelector(playerWithRoleCount(Role.Heal), shallowEqual);
  const playerWithPositionCount = useSelector(positionWithPlayerCountSelector, shallowEqual);

  const value = useMemo<Stats>(
    () => ({
      distance: distanceCount,
      melee: meleeCount,
      tank: tankCount,
      heal: healCount,
      total: totalCount,
      positionsWithPlayer: playerWithPositionCount,
    }),
    [distanceCount, meleeCount, tankCount, healCount, totalCount, playerWithPositionCount]
  );

  return value;
};

export default usePlayerStats;
