import { FunctionComponent, memo } from 'react';
import PositionChoices, { Props as SelectProps } from '../../containers/ModalPositions';

export type Props = {
  isVisible?: boolean;
  onCancel: () => void;
} & Pick<SelectProps, 'onSelect'>;

const ModalPlayerPositionChoosing: FunctionComponent<Props> = memo(
  ({ isVisible, onCancel, ...props }) => {
    if (!isVisible) {
      return null;
    }
    return (
      <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, zIndex: 10000 }}>
        <div
          style={{
            backgroundColor: 'rgba(0,0,0, 0.25)',
            opacity: 0.5,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10001,
          }}
          onClick={onCancel}
        />
        <div
          style={{
            position: 'relative',
            background: 'white',
            width: '100%',
            maxWidth: 600,
            height: '80%',
            margin: 'auto',
            marginTop: '5%',
            overflow: 'scroll',
            zIndex: 10002,
          }}
        >
          <PositionChoices {...props} />
        </div>
      </div>
    );
  }
);
ModalPlayerPositionChoosing.displayName = 'ModalPlayerPositionChoosing';

export default ModalPlayerPositionChoosing;
