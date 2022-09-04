import { configureStore } from '@reduxjs/toolkit';
import playersReducer from './Players';
import positionsReducer from './Positions';
import zonesReducer from './Zones';

const store = configureStore({
  reducer: {
    players: playersReducer,
    positions: positionsReducer,
    zones: zonesReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
