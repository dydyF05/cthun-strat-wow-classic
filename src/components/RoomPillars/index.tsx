import { FunctionComponent, memo } from 'react';
import classes from './index.module.css';

export type Props = {
  /** Graph width */
  width: number;
  /** Graph height */
  height: number;
};

const RoomPillars: FunctionComponent<Props> = memo(({ width, height }) => {
  const ray = width / 30;

  return (
    <>
      {/* ##### FIRST LINE ##### */}
      <circle
        fill="var(--color-grey)"
        cx={width * 0.95}
        cy={height / 3.4}
        r={ray}
        className={classes.pillar}
      />
      <circle
        fill="var(--color-grey)"
        cx={ray}
        cy={height / 3.4}
        r={ray}
        className={classes.pillar}
      />

      {/* ##### SECOND LINE ##### */}
      <circle
        fill="var(--color-grey)"
        cx={width * 0.95}
        cy={height / 1.9}
        r={ray}
        className={classes.pillar}
      />
      <circle
        fill="var(--color-grey)"
        cx={ray}
        cy={height / 1.9}
        r={ray}
        className={classes.pillar}
      />

      {/* ##### THIRD LINE ##### */}
      <circle
        fill="var(--color-grey)"
        cx={width * 0.85}
        cy={height / 1.4}
        r={ray}
        className={classes.pillar}
      />
      <circle
        fill="var(--color-grey)"
        cx={width * 0.1}
        cy={height / 1.4}
        r={ray}
        className={classes.pillar}
      />

      {/* ##### FOURTH LINE ##### */}
      <circle
        fill="var(--color-grey)"
        cx={width * 0.75}
        cy={height / 1.175}
        r={ray}
        className={classes.pillar}
      />
      <circle
        fill="var(--color-grey)"
        cx={width * 0.24}
        cy={height / 1.175}
        r={ray}
        className={classes.pillar}
      />

      {/* ##### FIFTH LINE ##### */}
      <circle
        fill="var(--color-grey)"
        cx={width / 2 - width * 0.1}
        cy={height * 0.95}
        r={ray}
        className={classes.pillar}
      />
      <circle
        fill="var(--color-grey)"
        cx={width / 2 + width * 0.1}
        cy={height * 0.95}
        r={ray}
        className={classes.pillar}
      />
    </>
  );
});
RoomPillars.displayName = 'RoomPillars';

export default RoomPillars;
