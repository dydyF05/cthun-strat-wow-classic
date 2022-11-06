import { Avatar, Card, CardProps, Typography } from 'antd';
import { FunctionComponent, memo } from 'react';
import { BUILD_IMAGES } from '../../lib/player';
import { MARKER_IMAGE } from '../../lib/position';
import { Player } from '../../redux/Players';
import { Position } from '../../redux/Positions';
import { Marker } from '../../types/index.d';
import classes from './index.module.css';

export type Props = Pick<Player, 'name' | 'build'> & {
  positionIndex?: Position['index'];
  positionMarker?: Position['marker'];
  isPositionDisabled?: boolean;
  isPreview?: boolean;
  actions: CardProps['actions'];
};

const SideMenuPlayer: FunctionComponent<Props> = memo(
  ({
    positionIndex,
    positionMarker,
    name,
    build,
    isPreview = false,
    isPositionDisabled = false,
    actions,
  }) => {
    const hasPosition = !!positionIndex || !!positionMarker;

    return (
      <Card
        data-preview={isPreview}
        data-positioned={hasPosition || isPositionDisabled}
        className={classes.container}
        actions={actions}
      >
        <Card.Meta
          avatar={
            <div className={classes.avatar}>
              <Avatar src={BUILD_IMAGES[build]} />
              {positionIndex && !isPositionDisabled
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
