import { FunctionComponent, memo } from 'react';
import AddPlayerForm from '../../containers/AddPlayerForm';
import { Player } from '../../redux/Players';
import Modal, { Props as ModalProps } from '../Modal';

export type Props = {
  onValidate: (player: Omit<Player, 'id'>) => void;
} & Omit<ModalProps, 'children'>;

const ModalAddPlayer: FunctionComponent<Props> = memo(({ onValidate, ...props }) => (
  <Modal {...props}>
    <AddPlayerForm onCancel={props.onCancel} onValidate={onValidate} />
  </Modal>
));
ModalAddPlayer.displayName = 'ModalAddPlayer';

export default ModalAddPlayer;
