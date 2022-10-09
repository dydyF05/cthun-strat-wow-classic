import { List, ListProps, Typography } from 'antd';

import { FunctionComponent, memo, useCallback, useMemo } from 'react';
import SideMenuPlayer, { Props as SideMenuPlayerProps } from '../../containers/SideMenuPlayer';
import { Player } from '../../redux/Players';
import classes from './index.module.css';

export type Props = {
  title: string;
  image: string;
  playerPlacedCount: number;
  isPreview?: boolean;
  players: Player['name'][];
  onPositionPlayer: SideMenuPlayerProps['onPosition'];
};

const SideMenuPlayers: FunctionComponent<Props> = memo(
  ({ title, image, playerPlacedCount, isPreview = false, players, onPositionPlayer }) => {
    const playerCount = players.length;

    const renderItem = useCallback<NonNullable<ListProps<Props['players'][0]>['renderItem']>>(
      player => (
        <div key={`discord-player-${player}`} className={classes.player}>
          <SideMenuPlayer name={player} onPosition={onPositionPlayer} />
        </div>
      ),
      [onPositionPlayer]
    );

    const header = useMemo(
      () => (
        <div className={classes.title}>
          <img src={image} />
          <Typography.Text type="secondary">
            {title} ({playerPlacedCount}/{playerCount})
          </Typography.Text>
        </div>
      ),
      [playerPlacedCount, image, title, playerCount]
    );

    return (
      <List<Props['players'][0]>
        data-preview={isPreview}
        className={classes.container}
        dataSource={players}
        renderItem={renderItem}
        header={isPreview ? null : header}
        bordered
      />
    );
  }
);
SideMenuPlayers.displayName = 'Players';

export default SideMenuPlayers;
