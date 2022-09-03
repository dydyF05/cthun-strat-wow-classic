import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import log from '../../lib/log';
import { Marker, ZoneColor } from '../../types/index.d';

export enum ZoneId {
  One = '1',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
}

export type Zone = {
  id: ZoneId;
  marker: Marker;
  players: string[];
  color: ZoneColor;
};

type State = Zone[];

const initialState: State = [
  { id: ZoneId.One, marker: Marker.Star, players: [], color: ZoneColor.Green },
  { id: ZoneId.Two, marker: Marker.Square, players: [], color: ZoneColor.Red },
  { id: ZoneId.Three, marker: Marker.Cross, players: [], color: ZoneColor.Yellow },
  { id: ZoneId.Four, marker: Marker.Skull, players: [], color: ZoneColor.Blue },
  { id: ZoneId.Five, marker: Marker.Circle, players: [], color: ZoneColor.Green },
  { id: ZoneId.Six, marker: Marker.Moon, players: [], color: ZoneColor.Red },
  { id: ZoneId.Seven, marker: Marker.Triangle, players: [], color: ZoneColor.Yellow },
  { id: ZoneId.Eight, marker: Marker.Diamond, players: [], color: ZoneColor.Blue },
];

export const zonesSlice = createSlice({
  name: 'zones',
  initialState,
  reducers: {
    addPlayers: (
      state,
      { payload }: PayloadAction<{ players: Zone['players']; id: Zone['id'] }>
    ) => {
      const zone = state.find(({ id }) => id === payload.id);

      if (!zone) {
        log({
          message: 'Target zone for players adding unexistant',
          context: { state, payload },
        });
        return;
      }

      // Can't add already existing player
      const addablePlayers = payload.players.filter(player => !zone.players.includes(player));
      if (!addablePlayers.length) {
        payload.players.length &&
          log({
            message: 'Cannot add any of the received players for they are already in the zone',
            context: { state, addablePlayers, payload },
          });
        return;
      }

      if (payload.players.length !== addablePlayers.length) {
        log({
          message: 'Some of the players were filtered out for their name already exist in zone',
          context: { state, addablePlayers, payload },
        });
      }

      zone.players.push(...addablePlayers);
    },
    removePlayers: (
      state,
      { payload }: PayloadAction<{ players: Zone['players']; id: Zone['id'] }>
    ) => {
      const zone = state.find(({ id }) => id === payload.id);

      if (!zone) {
        log({
          message: 'Target zone for players deletion unexistant',
          context: { state, payload },
        });
        return;
      }

      zone.players.filter(playerName => !payload.players.includes(playerName));
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPlayers, removePlayers } = zonesSlice.actions;

export default zonesSlice.reducer;
