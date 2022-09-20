import { FunctionComponent, memo } from 'react';
import AddPlayerForm from '../../containers/AddPlayerForm';
import { Player } from '../../redux/Players';

export type Props = {
  isVisible?: boolean;
  onValidate: (player: Player) => void;
  onCancel: () => void;
};

const ModalAddPlayer: FunctionComponent<Props> = memo(({ isVisible, onCancel, onValidate }) => {
  if (!isVisible) {
    return null;
  }
  return (
    <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, zIndex: 10000 }}>
      <div
        style={{
          backgroundColor: 'rgb(0,0,0)',
          opacity: 0.75,
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
        <AddPlayerForm onValidate={onValidate} />
      </div>
    </div>
  );
});
ModalAddPlayer.displayName = 'ModalAddPlayer';

export default ModalAddPlayer;
