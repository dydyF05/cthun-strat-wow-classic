import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import log from '../../lib/log';
import { ClassName, Role } from '../../types/index.d';

export type Player = {
  /** Also used as ID in WoW */
  name: string;
  class: ClassName;
  role: Role;
};

type State = Player[];

const initialState: State = [];

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    addMany: (state, { payload }: PayloadAction<Player[]>) => {
      // Can't add already existing player
      const addablePlayers = payload.filter(player => !state.includes(player));
      if (!addablePlayers.length) {
        payload.length &&
          log({
            message:
              'Cannot add any of the received players for their names already exist in store',
            context: { state, addablePlayers, payload },
          });
        return;
      }

      if (payload.length !== addablePlayers.length) {
        log({
          message: 'Some of the players were filtered out for their name already exist in store',
          context: { state, addablePlayers, payload },
        });
      }

      state.push(...addablePlayers);
    },
    removeMany: (state, { payload }: PayloadAction<Player['name'][]>) => {
      state.filter(({ name }) => !payload.includes(name));
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMany, removeMany } = playersSlice.actions;

export default playersSlice.reducer;
