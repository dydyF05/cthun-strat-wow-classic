import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { FunctionComponent, memo } from 'react';
import classes from './index.module.css';
export type Props = {
  groupIds?: number[];
};

const RaidGroups: FunctionComponent<Props> = memo(() => (
  <div className={classes.container}>
    <ExclamationCircleOutlined />
    <Typography.Title style={{ color: 'var(--color-grey-light)', marginTop: 20 }} level={4}>
      Position players on the schema first
    </Typography.Title>
  </div>
));
RaidGroups.displayName = 'RaidGroups';

export default RaidGroups;
