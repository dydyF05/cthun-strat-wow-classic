import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import log from '../../lib/log';
import { ClassBuild, ClassName, Role } from '../../types/index.d';

export type Player = {
  /** Front generated unique uuid on player creation */
  id: string;
  /** Name of the player */
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
      const addablePlayers = payload.filter(
        payloadPlayer => !state.map(statePlayer => statePlayer.name).includes(payloadPlayer.name)
      );
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
    updateMany: (state, { payload }: PayloadAction<Player[]>) => {
      // Can't add already existing player
      const updatablePlayers = payload.filter(
        payloadPlayer => !!state.map(statePlayer => statePlayer.id).includes(payloadPlayer.id)
      );
      if (!updatablePlayers.length) {
        payload.length &&
          log({
            message: "Cannot update any of the received players for their ids don't exist in store",
            context: { state, updatablePlayers, payload },
          });
        return;
      }

      if (payload.length !== updatablePlayers.length) {
        log({
          message: 'Some of the players were filtered out for their id were not found in store',
          context: { state, updatablePlayers, payload },
        });
      }

      for (const player of updatablePlayers) {
        const tarIndex = state.findIndex(statePlayer => statePlayer.id === player.id);
        if (tarIndex !== -1) {
          const update = {
            ...state[tarIndex],
            ...player,
          };

          state[tarIndex] = update;
        }
      }
    },
    removeMany: (state, { payload }: PayloadAction<Player['id'][]>) => {
      const nextState = state.filter(({ id }) => !payload.includes(id));

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
  updateMany: updateManyAction,
  removeMany: removeManyAction,
  reset: resetAction,
} = playersSlice.actions;

export default playersSlice.reducer;
