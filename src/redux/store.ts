import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore as _persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage';
import { PersistConfig } from 'reduxjs-toolkit-persist/lib/types';
import playersReducer from './Players';
import positionsReducer from './Positions';
import settingsReducer from './Settings';
import settingsMiddleware from './Settings/effects';
import zonesReducer from './Zones';

const reducers = combineReducers({
  players: playersReducer,
  positions: positionsReducer,
  zones: zonesReducer,
  settings: settingsReducer,
});

const blacklist: (keyof RootState)[] = ['settings'];

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  blacklist: blacklist as string[],
};

const _persistedReducer = persistReducer(persistConfig, reducers) as typeof reducers;

const store = configureStore({
  reducer: _persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        /* ignore persistance actions */
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(settingsMiddleware),
});

export const persistStore = _persistStore(store);

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
