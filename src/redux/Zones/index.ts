import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Marker, MINIMUM_SPACE_BETWEEN_LINES, ZoneColor } from '../../types/index.d';

export enum ZoneId {
  One = '1',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
}

export type Zone = {
  id: ZoneId;
  isLeft: boolean;
  position: 'up' | 'middle-up' | 'middle-bottom' | 'bottom';
  marker: Marker;
  color: ZoneColor;
};

export type State = {
  slices: Zone[];
  /** The meter distance separating the first line from the boss */
  firstLineDistance: number;
  /** The meter distance separating the second line from the boss */
  secondLineDistance: number;
  /** The meter distance separating the third line from the boss */
  thirdLineDistance: number;
  graphHeight: number;
  graphWidth: number;
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
  isConfiguring: true,
  slices: [
    {
      id: ZoneId.One,
      marker: Marker.Star,
      color: ZoneColor.Green,
      isLeft: true,
      position: 'up',
    },
    {
      id: ZoneId.Two,
      marker: Marker.Square,
      color: ZoneColor.Red,
      isLeft: true,
      position: 'middle-up',
    },
    {
      id: ZoneId.Three,
      marker: Marker.Cross,
      color: ZoneColor.Yellow,
      isLeft: true,
      position: 'middle-bottom',
    },
    {
      id: ZoneId.Four,
      marker: Marker.Skull,
      color: ZoneColor.Blue,
      isLeft: true,
      position: 'bottom',
    },
    {
      id: ZoneId.Five,
      marker: Marker.Circle,
      color: ZoneColor.Green,
      isLeft: false,
      position: 'bottom',
    },
    {
      id: ZoneId.Six,
      marker: Marker.Moon,
      color: ZoneColor.Red,
      isLeft: false,
      position: 'middle-bottom',
    },
    {
      id: ZoneId.Seven,
      marker: Marker.Triangle,
      color: ZoneColor.Yellow,
      isLeft: false,
      position: 'middle-up',
    },
    {
      id: ZoneId.Eight,
      marker: Marker.Diamond,
      color: ZoneColor.Blue,
      isLeft: false,
      position: 'up',
    },
  ],
};

export const zonesSlice = createSlice({
  name: 'zones',
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
    },
  },
});

const isUp = (pointY: number, pointX: number, isLeft: boolean): boolean => {
  const minimumY = (Math.PI / 4) * (isLeft ? Math.abs(pointX) : pointX);
  return minimumY <= pointY;
};

const getBottom = (pointY: number, pointX: number): Zone['position'] => {
  const maximumY = -Math.abs((-Math.PI / 4) * pointX);
  return maximumY >= pointY ? 'bottom' : 'middle-bottom';
};

const getPositionFromTrigoPoint = (trigoPosition: number, isLeft: boolean): Zone['position'] => {
  const sinus = Math.sin(trigoPosition);
  const cosinus = Math.cos(trigoPosition);
  if (isUp(sinus, cosinus, isLeft)) {
    return 'up';
  }
  if (sinus >= 0) {
    return 'middle-up';
  }
  return getBottom(sinus, cosinus);
};

export const getZoneIdFromTrigoPosition = (
  trigoPosition: number,
  isLeft: boolean
): ZoneId | undefined => {
  const position = getPositionFromTrigoPoint(trigoPosition, isLeft);

  return initialState.slices.find(zone => zone.isLeft === isLeft && zone.position === position)?.id;
};

// Action creators are generated for each case reducer function
export const {
  setGraphMeasures: setGraphMeasuresAction,
  setSelectedPlayer: setSelectedPlayerAction,
  setIsConfiguring: setIsConfiguringAction,
} = zonesSlice.actions;

export default zonesSlice.reducer;
