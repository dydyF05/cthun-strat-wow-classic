import { State } from '.';
import { RootState } from '../store';

export const settingsSelector = (state: RootState): RootState['settings'] => state.settings;

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

export const bossZoneSizeRatioSelector = (state: RootState): State['bossZoneSizeRatio'] =>
  settingsSelector(state).bossZoneSizeRatio;

export const minimalPixelDistanceBetweenPlayersSelector = (
  state: RootState
): State['minimalPixelDistanceBetweenPlayers'] =>
  settingsSelector(state).minimalPixelDistanceBetweenPlayers;
