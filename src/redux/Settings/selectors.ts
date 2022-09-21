import { State } from '.';
import { RootState } from '../store';

export const settingsSelector = (state: RootState): RootState['settings'] => state.settings;

export const firstLineDistanceSelector = (state: RootState): State['firstLineDistance'] =>
  settingsSelector(state).firstLineDistance;

export const secondLineDistanceSelector = (state: RootState): State['secondLineDistance'] =>
  settingsSelector(state).secondLineDistance;

export const thirdLineDistanceSelector = (state: RootState): State['thirdLineDistance'] =>
  settingsSelector(state).thirdLineDistance;

export const graphWidthSelector = (state: RootState): State['graphWidth'] =>
  settingsSelector(state).graphWidth;

export const graphHeightSelector = (state: RootState): State['graphHeight'] =>
  settingsSelector(state).graphHeight;

export const graphTopStairsHeight = (state: RootState): State['topStairsHeight'] =>
  settingsSelector(state).topStairsHeight;

export const selectedPlayerSelector = (state: RootState): State['selectedPlayer'] =>
  settingsSelector(state).selectedPlayer;

export const isConfuringSelector = (state: RootState): State['isConfiguring'] =>
  settingsSelector(state).isConfiguring;
