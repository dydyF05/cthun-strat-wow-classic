import { FunctionComponent, useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import Component from '../components/RaidGroups';
import { useDispatch, useSelector } from '../hooks/redux';
import { groupIdsSelector } from '../redux/Groups/selectors';
import { addShiningGroupIdsAction, removeShiningGroupIdsAction } from '../redux/Settings';
import { isConfuringSelector, shiningGroupIdsLengthSelector } from '../redux/Settings/selectors';

export type Props = Record<string, never>;

const RaidGroups: FunctionComponent<Props> = () => {
  const dispatch = useDispatch();
  const groupIds = useSelector(groupIdsSelector, shallowEqual);
  const isConfiguring = useSelector(isConfuringSelector, shallowEqual);
  const shiningGroupCount = useSelector(shiningGroupIdsLengthSelector, shallowEqual);

  const areAllGroupsShining = shiningGroupCount === groupIds.length && !!groupIds.length;

  const handleToggleShine = useCallback(() => {
    if (areAllGroupsShining) {
      dispatch(removeShiningGroupIdsAction(groupIds));
    } else {
      dispatch(addShiningGroupIdsAction(groupIds));
    }
  }, [areAllGroupsShining, groupIds, dispatch]);

  return (
    <Component
      isConfigurable={isConfiguring}
      areAllGroupsSelected={areAllGroupsShining}
      groupIds={groupIds}
      onToggleShine={handleToggleShine}
    />
  );
};
export default RaidGroups;
