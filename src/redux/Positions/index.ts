import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import log from '../../lib/log';
import { Marker } from '../../types/index.d';
import { Player } from '../Players';
import { ZoneId } from '../Zones';

export type Position = {
  index: number;
  line: 'first' | 'second' | 'third';
  zoneId: ZoneId;
  playerId?: Player['name'];
  marker?: Marker;
};

type State = Position[];

const initialState: State = [];

type SetPlayerAction = PayloadAction<
  { player: Player['name'] | undefined } & Pick<Position, 'index' | 'line'>
>;

const FIRST_LINE_MARKER = [
  Marker.Triangle,
  Marker.Diamond,
  Marker.Star,
  Marker.Square,
  Marker.Cross,
  Marker.Skull,
  Marker.Circle,
  Marker.Moon,
];

const getMarker = ({ line, index }: Pick<Position, 'line' | 'index'>): Position['marker'] => {
  if (line !== 'first' || index - 1 >= FIRST_LINE_MARKER.length) return;
  return FIRST_LINE_MARKER[index - 1];
};

export const positionsSlice = createSlice({
  name: 'zones',
  initialState,
  reducers: {
    setPlayerPosition: (state, { payload }: SetPlayerAction) => {
      const position = state.find(
        ({ index, line }) => index === payload.index && line === payload.line
      );

      if (!position) {
        log({
          message:
            '[Positions reducer] [setPlayerPosition] failed to find target position to set player',
          context: {
            payload,
            state,
          },
        });
        return;
      }

      position.playerId = payload.player;
    },
    addPositions: (state, { payload }: PayloadAction<Position[]>) => {
      state.push(
        // prevent HOT reload bug that keeps on duplicating
        // positions on every save
        ...payload
          .filter(
            newPosition =>
              !state.some(
                oldPosition =>
                  oldPosition.index === newPosition.index && oldPosition.line === newPosition.line
              )
          )
          .map(position => ({ ...position, marker: getMarker(position) }))
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPlayerPosition: setPlayerPositionAction, addPositions: addPositionsAction } =
  positionsSlice.actions;

export default positionsSlice.reducer;
