import { FunctionComponent, memo } from 'react';
import AddPlayerForm from '../../containers/UpsertPlayerForm';
import { Player } from '../../redux/Players';
import Modal, { Props as ModalProps } from '../Modal';

export type Props = {
  player?: Omit<Player, 'id'>;
  onValidate: (player: Omit<Player, 'id'>) => void;
} & Omit<ModalProps, 'children'>;

const ModalAddPlayer: FunctionComponent<Props> = memo(({ onValidate, player, ...props }) => (
  <Modal {...props}>
    <>
      {/* Changing instance to have a clean build and initial state on update form */}
      {!!props.isVisible && (
        <AddPlayerForm
          key="update"
          onCancel={props.onCancel}
          onValidate={onValidate}
          playerToUpdate={player}
        />
      )}
      {!props.isVisible && (
        <AddPlayerForm key="add" onCancel={props.onCancel} onValidate={onValidate} />
      )}
    </>
  </Modal>
));
ModalAddPlayer.displayName = 'ModalAddPlayer';

export default ModalAddPlayer;
