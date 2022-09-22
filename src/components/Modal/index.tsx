import { FunctionComponent, memo } from 'react';
import classes from './index.module.css';

export type Props = {
  isVisible?: boolean;
  onCancel: () => void;
  children: JSX.Element;
};

const Modal: FunctionComponent<Props> = memo(({ isVisible = false, onCancel, children }) => (
  <div className={classes.container} data-visible={isVisible}>
    <div className={classes.overlay} onClick={onCancel} />
    <div className={classes.content}>{children}</div>
  </div>
));
Modal.displayName = 'Modal';

export default Modal;
