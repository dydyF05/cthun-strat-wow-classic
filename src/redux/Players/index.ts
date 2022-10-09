import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import log from '../../lib/log';
import { ClassBuild, ClassName, Role } from '../../types/index.d';

export type Player = {
  /** Also used as ID in WoW */
  name: string;
  className: ClassName;
  build: ClassBuild;
  role: Role;
};

export type State = Player[];

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
      const nextState = state.filter(({ name }) => !payload.includes(name));

      state.splice(0, state.length);
      state.push(...nextState);
    },
    reset: state => {
      state.splice(0, state.length);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addMany: addManyAction,
  removeMany: removeManyAction,
  reset: resetAction,
} = playersSlice.actions;

export default playersSlice.reducer;
