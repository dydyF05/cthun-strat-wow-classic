import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MINIMUM_SPACE_BETWEEN_LINES } from '../../types/index.d';

export type State = {
  /** The meter distance separating the first line from the boss */
  firstLineDistance: number;
  /** The meter distance separating the second line from the boss */
  secondLineDistance: number;
  /** The meter distance separating the third line from the boss */
  thirdLineDistance: number;
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
  firstLineDistance: 5,
  secondLineDistance: 5 + MINIMUM_SPACE_BETWEEN_LINES,
  thirdLineDistance: 5 + MINIMUM_SPACE_BETWEEN_LINES * 2,
  graphHeight: 0,
  graphWidth: 0,
  topStairsHeight: 0,
  bossZoneSizeRatio: 0.3,
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
  },
});

// Action creators are generated for each case reducer function
export const {
  setGraphMeasures: setGraphMeasuresAction,
  setSelectedPlayer: setSelectedPlayerAction,
  setIsConfiguring: setIsConfiguringAction,
  setMinimalDistanceBetweenPlayers: setMinimalDistanceBetweenPlayersAction,
} = settingsSlice.actions;

export default settingsSlice.reducer;
