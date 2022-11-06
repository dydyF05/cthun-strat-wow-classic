import { FunctionComponent } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { shallowEqual } from 'react-redux';
import Component from '../components/RaidGroupItemIndex';
import { useDispatch, useSelector } from '../hooks/redux';
import { DraggablePlayerItem, DraggableType } from '../lib/draggable';
import { addPlayerToGroupAction, Group } from '../redux/Groups';
import { Player } from '../redux/Players';
import { playerSelector } from '../redux/Players/selectors';
import { draggedPlayerIdSelector } from '../redux/Settings/selectors';

export type Props = {
  playerId?: Player['id'];
  groupId: Group['id'];
  groupIndex: number;
};

const RaidGroupItemIndex: FunctionComponent<Props> = ({ groupId, groupIndex, playerId = '' }) => {
  const dispatch = useDispatch();
  const player = useSelector(playerSelector({ id: playerId }), shallowEqual);
  const draggedPlayerId = useSelector(draggedPlayerIdSelector, shallowEqual);

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: DraggableType.Player,
      item: playerId,
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [playerId]
  );

  const [{ canDrop }, dropRef] = useDrop(() => ({
    accept: DraggableType.Player,
    drop: (item: DraggablePlayerItem) => {
      if (typeof item?.id !== 'string') {
        return console.log('Dragged item was ill formated', item);
      }
      dispatch(
        addPlayerToGroupAction({
          groupId,
          playerId: item.id,
          index: groupIndex,
        })
      );
    },
    collect: monitor => ({
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <Component
      {...player}
      isPreview
      isDragging={isDragging}
      isDraggingSomePlayer={!!draggedPlayerId}
      canDrop={canDrop}
      dragRef={dragRef}
      dropRef={dropRef}
    />
  );
};
export default RaidGroupItemIndex;
