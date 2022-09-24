import { Image, List, ListProps, Typography } from 'antd';

import { FunctionComponent, memo, useCallback, useMemo } from 'react';
import SideMenuPlayer, { Props as SideMenuPlayerProps } from '../../containers/SideMenuPlayer';
import { Player } from '../../redux/Players';
import classes from './index.module.css';

export type Props = {
  title: string;
  image: string;
  players: Player['name'][];
  playerPlacedCount: number;
  onPositionPlayer: SideMenuPlayerProps['onPosition'];
};

const Players: FunctionComponent<Props> = memo(
  ({ title, image, playerPlacedCount, players, onPositionPlayer }) => {
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
          <Image src={image} />
          <Typography.Text type="secondary">
            {title} ({playerPlacedCount}/{playerCount})
          </Typography.Text>
        </div>
      ),
      [playerPlacedCount, image, title, playerCount]
    );

    return (
      <List<Props['players'][0]>
        className={classes.container}
        dataSource={players}
        renderItem={renderItem}
        header={header}
        bordered
      />
    );
  }
);
Players.displayName = 'Players';

export default Players;
