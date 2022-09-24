import { PlusCircleFilled } from '@ant-design/icons';
import { FunctionComponent, memo } from 'react';
import classes from './index.module.css';

export type Props = {
  onPress: () => void;
};

const SIZE = 80;

const AddPlayerButton: FunctionComponent<Props> = memo(({ onPress }) => (
  <PlusCircleFilled
    onClick={onPress}
    style={{ fontSize: SIZE, color: '#1890ff' }}
    className={classes.container}
  />
));
AddPlayerButton.displayName = 'AddPlayerButton';

export default AddPlayerButton;
