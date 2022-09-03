import { FunctionComponent, memo, useEffect, useRef, useState } from 'react';
import Zone from '../../containers/Zone';
import { ZoneId } from '../../redux/Zones';
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
    setTimeout(() => {
      console.log('width', ref.current?.width.baseVal.value);
      ref.current?.width.baseVal.value && setSvgHeight(ref.current?.width.baseVal.value);

      console.log('height', ref.current?.height.baseVal.value);
      ref.current?.height.baseVal.value && setSvgWidth(ref.current?.height.baseVal.value);
    }, LOAD_SVG_DELAY);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.center}>
        <p>Boss</p>
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
