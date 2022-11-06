import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uniq } from 'lodash/fp';
import { Group } from '../Groups';
import { Player } from '../Players';

export type State = {
  minimalPixelDistanceBetweenPlayers?: number;
  graphHeight: number;
  graphWidth: number;
  /** The ratio (0 to 1) the central boss zone occupates within the graph */
  bossZoneSizeRatio: number;
  topStairsHeight: number;
  selectedPlayerId?: string;
  draggedPlayerId?: string;
  /** Are we trying to place players. Disable to take a screenshot ;) */
  isConfiguring: boolean;
  isAlliance: boolean;
  shiningGroupIds: Group['id'][];
};

const initialState: State = {
  graphHeight: 0,
  graphWidth: 0,
  topStairsHeight: 0,
  bossZoneSizeRatio: 0.25,
  isConfiguring: true,
  isAlliance: false,
  shiningGroupIds: [],
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setGraphMeasures: (
      state,
      { payload }: PayloadAction<{ width: number; height: number; topStairsHeight: number }>
    ) => {
      state.graphHeight = payload.height;
      state.graphWidth = payload.width;
      state.topStairsHeight = payload.topStairsHeight;
    },
    setSelectedPlayer: (state, { payload }: PayloadAction<Player['id'] | undefined>) => {
      state.selectedPlayerId = payload;
    },
    setDraggedPlayer: (state, { payload }: PayloadAction<Player['id'] | undefined>) => {
      state.draggedPlayerId = payload;
    },
    toggleIsAlliance: state => {
      state.isAlliance = !state.isAlliance;
    },
    setIsConfiguring: (state, { payload }: PayloadAction<boolean>) => {
      state.isConfiguring = payload;
      if (!payload) {
        state.selectedPlayerId = undefined;
        state.shiningGroupIds = [];
      }
    },
    setMinimalDistanceBetweenPlayers: (state, { payload }: PayloadAction<number>) => {
      state.minimalPixelDistanceBetweenPlayers = payload;
    },
    addShiningGroupIds: (state, { payload }: PayloadAction<Group['id'][]>) => {
      state.shiningGroupIds = uniq([...state.shiningGroupIds, ...payload]);
    },
    removeShiningGroupIds: (state, { payload }: PayloadAction<Group['id'][]>) => {
      state.shiningGroupIds = state.shiningGroupIds.filter(id => !payload.includes(id));
    },
    reset: state => {
      state.selectedPlayerId = undefined;
      state.draggedPlayerId = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setGraphMeasures: setGraphMeasuresAction,
  setSelectedPlayer: setSelectedPlayerAction,
  setDraggedPlayer: setDraggedPlayerAction,
  setIsConfiguring: setIsConfiguringAction,
  setMinimalDistanceBetweenPlayers: setMinimalDistanceBetweenPlayersAction,
  addShiningGroupIds: addShiningGroupIdsAction,
  removeShiningGroupIds: removeShiningGroupIdsAction,
  toggleIsAlliance: toggleIsAllianceAction,
  reset: resetAction,
} = settingsSlice.actions;

export default settingsSlice.reducer;
