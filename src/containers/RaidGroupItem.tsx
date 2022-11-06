import { FunctionComponent, useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import Component from '../components/RaidGroupItem';
import { useDispatch, useSelector } from '../hooks/redux';
import { Group } from '../redux/Groups';
import { groupColorSelector, groupSlotsSelector } from '../redux/Groups/selectors';
import { addShiningGroupIdsAction, removeShiningGroupIdsAction } from '../redux/Settings';
import { isConfuringSelector, isGroupIdShiningSelector } from '../redux/Settings/selectors';

export type Props = {
  id: Group['id'];
};

const RaidGroupItem: FunctionComponent<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const slots = useSelector(groupSlotsSelector(id), shallowEqual);
  const isShining = useSelector(isGroupIdShiningSelector(id), shallowEqual);
  const isConfigurable = useSelector(isConfuringSelector, shallowEqual);
  const groupColor = useSelector(groupColorSelector(id), shallowEqual);

  const handleToggleShine = useCallback(() => {
    if (isShining) {
      dispatch(removeShiningGroupIdsAction([id]));
    } else {
      dispatch(addShiningGroupIdsAction([id]));
    }
  }, [isShining, id, dispatch]);

  return (
    <Component
      id={id}
      color={groupColor}
      isShining={isShining}
      isConfigurable={isConfigurable}
      slots={slots}
      onToggleShine={handleToggleShine}
    />
  );
};
export default RaidGroupItem;
