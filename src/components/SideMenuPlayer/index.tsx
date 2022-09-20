import { FunctionComponent, memo, useCallback } from 'react';
import { BUILD_IMAGES } from '../../lib/player';
import { MARKER_IMAGE } from '../../lib/position';
import { Player } from '../../redux/Players';
import { Position } from '../../redux/Positions';
import classes from './index.module.css';

export type Props = Pick<Player, 'name' | 'build'> & {
  positionIndex?: Position['index'];
  positionMarker?: Position['marker'];
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

    return (
      <div className={classes.container} data-isplaced={positionIndex !== undefined}>
        <div className={classes.player}>
          <img src={BUILD_IMAGES[build]} />
          {positionIndex !== undefined && !positionMarker && (
            <p className={classes.positionIndex}>{positionIndex}</p>
          )}
          {!!positionMarker && <img src={MARKER_IMAGE[positionMarker]} />}
          <p className={classes.name}>{name}</p>
        </div>
        <div className={classes.actions}>
          <p className={classes.delete} onClick={handleDeletePlayer}>
            RM
          </p>
          <p className={classes.choosePosition} onClick={handlePosition}>
            pos
          </p>
          {!!positionIndex && (
            <p className={classes.deletePosition} onClick={onPositionDelete}>
              rm pos
            </p>
          )}
        </div>
      </div>
    );
  }
);
SideMenuPlayer.displayName = 'Player';

export default SideMenuPlayer;
