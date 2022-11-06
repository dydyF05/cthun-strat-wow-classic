import { Player } from '../redux/Players';

export enum DraggableType {
  Player = 'player',
}

export type DraggablePlayerItem = Pick<Player, 'id'>;
