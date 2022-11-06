import {
  DeleteOutlined,
  EditOutlined,
  EnvironmentOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import { CardProps } from 'antd';
import { FunctionComponent, memo, useCallback, useMemo } from 'react';
import { Player } from '../../redux/Players';
import { Position } from '../../redux/Positions';
import PlayerCard, { Props as PlayerCardProps } from '../PlayerCard';

export type Props = Pick<Player, 'id'> & {
  positionIndex?: Position['index'];
  positionMarker?: Position['marker'];
  isPreview?: boolean;
  onPosition: (id: Player['id']) => void;
  onDeletePlayer: () => void;
  onPositionDelete: () => void;
  onEditPlayer: () => void;
} & Omit<PlayerCardProps, 'actions'>;

const SideMenuPlayer: FunctionComponent<Props> = memo(
  ({
    positionIndex,
    id,
    isPreview = false,
    onPosition,
    onDeletePlayer,
    onPositionDelete,
    onEditPlayer,
    ...props
  }) => {
    const handleDeletePlayer = useCallback(
      (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();
        onDeletePlayer();
      },
      [onDeletePlayer]
    );

    const handlePosition = useCallback(() => {
      onPosition(id);
    }, [id, onPosition]);

    const actions = useMemo<CardProps['actions']>(
      () =>
        isPreview
          ? undefined
          : [
              <EditOutlined key="edit" onClick={onEditPlayer} />,
              <DeleteOutlined key="delete" onClick={handleDeletePlayer} />,
              positionIndex ? (
                <MinusCircleOutlined onClick={onPositionDelete} />
              ) : (
                <EnvironmentOutlined key="localize" onClick={handlePosition} />
              ),
            ],
      [positionIndex, isPreview, onPositionDelete, handleDeletePlayer, handlePosition, onEditPlayer]
    );

    return (
      <PlayerCard
        {...props}
        positionIndex={positionIndex}
        isPreview={isPreview}
        actions={actions}
      />
    );
  }
);
SideMenuPlayer.displayName = 'Player';

export default SideMenuPlayer;
