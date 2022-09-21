import { createSlice } from '@reduxjs/toolkit';
import { Marker, ZoneColor } from '../../types/index.d';

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

export type State = Zone[];

const initialState: State = [
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
];

export const zonesSlice = createSlice({
  name: 'zones',
  initialState,
  reducers: {},
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

  return initialState.find(zone => zone.isLeft === isLeft && zone.position === position)?.id;
};

// Action creators are generated for each case reducer function
// export const {} = zonesSlice.actions;

export default zonesSlice.reducer;
