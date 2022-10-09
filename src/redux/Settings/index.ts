import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type State = {
  minimalPixelDistanceBetweenPlayers?: number;
  graphHeight: number;
  graphWidth: number;
  /** The ratio (0 to 1) the central boss zone occupates within the graph */
  bossZoneSizeRatio: number;
  topStairsHeight: number;
  selectedPlayer?: string;
  /** Are we trying to place players. Disable to take a screenshot ;) */
  isConfiguring: boolean;
};

const initialState: State = {
  graphHeight: 0,
  graphWidth: 0,
  topStairsHeight: 0,
  bossZoneSizeRatio: 0.25,
  isConfiguring: true,
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
    setSelectedPlayer: (state, { payload }: PayloadAction<string | undefined>) => {
      state.selectedPlayer = payload;
    },
    setIsConfiguring: (state, { payload }: PayloadAction<boolean>) => {
      state.isConfiguring = payload;
      if (!payload) {
        state.selectedPlayer = undefined;
      }
    },
    setMinimalDistanceBetweenPlayers: (state, { payload }: PayloadAction<number>) => {
      state.minimalPixelDistanceBetweenPlayers = payload;
    },
    reset: state => {
      state.selectedPlayer = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setGraphMeasures: setGraphMeasuresAction,
  setSelectedPlayer: setSelectedPlayerAction,
  setIsConfiguring: setIsConfiguringAction,
  setMinimalDistanceBetweenPlayers: setMinimalDistanceBetweenPlayersAction,
  reset: resetAction,
} = settingsSlice.actions;

export default settingsSlice.reducer;
