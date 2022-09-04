import { FunctionComponent, memo, useEffect, useRef, useState } from 'react';
import Zone from '../../containers/Zone';
import { ZoneId } from '../../redux/Zones';
import BossZone from '../BossZone';
import classes from './index.module.css';

export type Props = {
  ids?: ZoneId[];
};

const LOAD_SVG_DELAY = 200;

const Zones: FunctionComponent<Props> = memo(({ ids }) => {
  const ref = useRef<SVGSVGElement>(null);
  const [svgWidth, setSvgWidth] = useState(0);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    const resize = () => {
      ref.current?.width.baseVal.value && setSvgHeight(ref.current?.width.baseVal.value);
      ref.current?.height.baseVal.value && setSvgWidth(ref.current?.height.baseVal.value);
    };
    window?.addEventListener('resize', resize);
    setTimeout(resize, LOAD_SVG_DELAY);
    return () => window?.removeEventListener('resize', resize);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.center}>
        <BossZone />
      </div>
      <svg width="100%" height="100%" ref={ref}>
        {!!ids &&
          ids.map(id => (
            <Zone id={id} key={`zone-${id}`} svgHeight={svgHeight} svgWidth={svgWidth} />
          ))}
      </svg>
    </div>
  );
});
Zones.displayName = 'Zones';

export default Zones;
