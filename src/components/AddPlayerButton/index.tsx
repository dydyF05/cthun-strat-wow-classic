import { UserAddOutlined } from '@ant-design/icons';
import { FunctionComponent, memo } from 'react';
import classes from './index.module.css';

export type Props = {
  onPress: () => void;
};

const SIZE = 40;

const AddPlayerButton: FunctionComponent<Props> = memo(({ onPress }) => (
  <UserAddOutlined
    onClick={onPress}
    style={{
      fontSize: SIZE,
      color: 'white',
    }}
    className={classes.container}
  />
));
AddPlayerButton.displayName = 'AddPlayerButton';

export default AddPlayerButton;
