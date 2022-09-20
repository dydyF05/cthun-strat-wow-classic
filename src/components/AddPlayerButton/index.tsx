import { FunctionComponent, memo } from 'react';
import classes from './index.module.css';

export type Props = {
  onPress: () => void;
};

const AddPlayerButton: FunctionComponent<Props> = memo(({ onPress }) => {
  return (
    <div className={classes.container} onClick={onPress}>
      <span>&#43;</span>
    </div>
  );
});
AddPlayerButton.displayName = 'AddPlayerButton';

export default AddPlayerButton;
