import { CloseCircleOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { FunctionComponent, memo } from 'react';
import { BUILD_IMAGES } from '../../lib/player';
import { Player } from '../../redux/Players';
import classes from './index.module.css';

export type Props = Pick<Player, 'build' | 'name'> & {
  onCancel: () => void;
};

const SelectedPlayer: FunctionComponent<Props> = memo(({ name, build, onCancel }) => (
  <div className={classes.container}>
    <div className={classes.header}>
      <Typography.Title className={classes.title} level={5}>
        Selected Player
      </Typography.Title>
      <CloseCircleOutlined onClick={onCancel} />
    </div>
    <div className={classes.player}>
      <img src={BUILD_IMAGES[build]} />
      <Typography.Text>{name}</Typography.Text>
    </div>
  </div>
));
SelectedPlayer.displayName = 'SelectedPlayer';

export default SelectedPlayer;
