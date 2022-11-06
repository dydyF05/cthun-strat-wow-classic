import { FunctionComponent, memo } from 'react';
import { ConnectDragSource, ConnectDropTarget } from 'react-dnd';
import PlayerCard, { Props as PlayerCardProps } from '../PlayerCard';
import classes from './index.module.css';

export type Props = {
  dropRef?: ConnectDropTarget;
  dragRef?: ConnectDragSource;
  isDraggingSomePlayer?: boolean;
  isDragging?: boolean;
  canDrop?: boolean;
} & Partial<PlayerCardProps>;

const RaidGroupItemIndex: FunctionComponent<Props> = memo(
  ({ isDragging, isDraggingSomePlayer, canDrop, dragRef, dropRef, ...props }) => {
    const isPlaceholder = !props.name;

    if ((isDragging && isDraggingSomePlayer) || !isDraggingSomePlayer) {
      return (
        <div ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
          {!isPlaceholder && <PlayerCard {...(props as PlayerCardProps)} isPositionDisabled />}
          {isPlaceholder && <div className={classes.empty} />}
        </div>
      );
    }

    return (
      <div
        ref={dropRef}
        style={{
          opacity: isDragging ? 0.5 : 1,
          backgroundColor: canDrop ? 'var(--color-green)' : undefined,
        }}
      >
        {!isPlaceholder && <PlayerCard {...(props as PlayerCardProps)} isPositionDisabled />}
        {isPlaceholder && <div className={classes.empty} />}
      </div>
    );
  }
);
RaidGroupItemIndex.displayName = 'RaidGroupItemIndex';

export default RaidGroupItemIndex;
