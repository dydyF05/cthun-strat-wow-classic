import { shallowEqual } from 'react-redux';
import { Group } from '../redux/Groups';
import { groupColorSelector, groupIdForPlayerIdSelector } from '../redux/Groups/selectors';
import { Player } from '../redux/Players';
import { isGroupIdShiningSelector } from '../redux/Settings/selectors';
import { useSelector } from './redux';

export const useGroupColor = (groupId: Group['id']): Group['color'] | undefined => {
  const isGroupShining = useSelector(isGroupIdShiningSelector(groupId), shallowEqual);
  const groupColor = useSelector(groupColorSelector(groupId), shallowEqual);

  return isGroupShining ? groupColor : undefined;
};

export const usePlayerGroupColor = (playerId?: Player['id']): Group['color'] | undefined => {
  const groupId = useSelector(groupIdForPlayerIdSelector(playerId), shallowEqual);

  return useGroupColor(groupId || 0);
};
