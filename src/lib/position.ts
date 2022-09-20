import Circle from '../assets/images/circle.webp';
import Cross from '../assets/images/cross.webp';
import Diamond from '../assets/images/diamond.webp';
import Moon from '../assets/images/moon.webp';
import Skull from '../assets/images/skull.webp';
import Square from '../assets/images/square.webp';
import Star from '../assets/images/star.webp';
import Triangle from '../assets/images/triangle.webp';
import { Marker } from '../types/index.d';

export const MARKER_IMAGE: Record<Marker, string> = {
  [Marker.Circle]: Circle,
  [Marker.Cross]: Cross,
  [Marker.Diamond]: Diamond,
  [Marker.Moon]: Moon,
  [Marker.Skull]: Skull,
  [Marker.Square]: Square,
  [Marker.Star]: Star,
  [Marker.Triangle]: Triangle,
};
