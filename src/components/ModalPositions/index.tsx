import { FunctionComponent } from 'react';
import { BUILD_IMAGES } from '../../lib/player';
import { MARKER_IMAGE } from '../../lib/position';
import { Player } from '../../redux/Players';
import { Position } from '../../redux/Positions';
import classes from './index.module.css';

type Item = {
  playerName?: string;
} & Pick<Position, 'index' | 'marker'>;

export type Props = {
  items: Item[];
  onSelect: (item: Item) => void;
} & Player;

const ModalPositions: FunctionComponent<Props> = ({ items, onSelect, ...player }) => {
  return (
    <div>
      <div className={classes.title}>
        <img src={BUILD_IMAGES[player.build]} />
        <h4>{player.name}</h4>
      </div>
      {items.map(item => (
        <div
          key={`position-choosing-${item.index}`}
          className={classes.item}
          onClick={() => onSelect(item)}
        >
          {!!item.marker && <img src={MARKER_IMAGE[item.marker]} />}
          {!item.marker && <p>{item.index}</p>}
          {!!item.playerName && <p>Current player: {item.playerName}</p>}
        </div>
      ))}
    </div>
  );
};
export default ModalPositions;
