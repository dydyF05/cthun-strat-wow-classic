import { DeleteOutlined, MinusCircleOutlined, TagOutlined } from '@ant-design/icons';
import { Avatar, Card, CardProps, Typography } from 'antd';
import { FunctionComponent, memo, useCallback, useMemo } from 'react';
import { BUILD_IMAGES } from '../../lib/player';
import { MARKER_IMAGE } from '../../lib/position';
import { Player } from '../../redux/Players';
import { Position } from '../../redux/Positions';
import { Marker } from '../../types/index.d';
import classes from './index.module.css';

export type Props = Pick<Player, 'name' | 'build'> & {
  positionIndex?: Position['index'];
  positionMarker?: Position['marker'];
  isEditing?: boolean;
  onPosition: (name: Player['name']) => void;
  onDeletePlayer: () => void;
  onPositionDelete: () => void;
};

const SideMenuPlayer: FunctionComponent<Props> = memo(
  ({
    positionIndex,
    positionMarker,
    name,
    build,
    isEditing,
    onPosition,
    onDeletePlayer,
    onPositionDelete,
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
      onPosition(name);
    }, [name, onPosition]);

    const actions = useMemo<CardProps['actions']>(
      () =>
        isEditing
          ? [
              <DeleteOutlined key="delete" onClick={handleDeletePlayer} />,
              positionIndex ? (
                <MinusCircleOutlined onClick={onPositionDelete} />
              ) : (
                <TagOutlined key="localize" onClick={handlePosition} />
              ),
            ]
          : undefined,
      [positionIndex, onPositionDelete, handleDeletePlayer, handlePosition, isEditing]
    );

    return (
      <Card className={classes.container} actions={actions}>
        <Card.Meta
          avatar={
            <div className={classes.avatar}>
              <Avatar src={BUILD_IMAGES[build]} />
              {positionIndex
                ? (!positionMarker && (
                    <Typography.Title level={5} className={classes.positionIndex}>
                      {positionIndex}
                    </Typography.Title>
                  )) || (
                    <img className={classes.marker} src={MARKER_IMAGE[positionMarker as Marker]} />
                  )
                : null}
            </div>
          }
          title={name}
        />
      </Card>
    );
  }
);
SideMenuPlayer.displayName = 'Player';

export default SideMenuPlayer;
