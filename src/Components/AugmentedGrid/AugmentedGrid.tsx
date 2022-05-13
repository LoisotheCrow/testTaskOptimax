import * as React from 'react';
import * as GridLayout from "react-grid-layout";
import { Layout } from 'react-grid-layout';
import { Input } from '..';
import { insertOptimal } from '../../utils';

const AugmentedGrid: React.FC = () => {
  const [width, setWidth] = React.useState<number>(0);
  const [height, setHeight] = React.useState<number>(0);
  const [childW, setChildW] = React.useState<number>(0);
  const [childH, setChildH] = React.useState<number>(0);
  const [layout, setLayout] = React.useState<Layout[]>([]);

  const handleChange = React.useCallback((
    value: string,
    updater: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    if (!isNaN(parseInt(value))) {
      updater(parseInt(value));
    } else {
      updater(0);
    }
  }, []);

  const addChild = React.useCallback(() => {
    setLayout(insertOptimal(layout, { w: childW, h: childH }, { w: width, h: height }));
    setChildH(0);
    setChildW(0);
  }, [childW, childH, setChildH, setChildW, layout, setLayout])

  return (
    <div>
      <div>
        <Input
          name='width'
          label='Grid Width'
          onChange={(value) => handleChange(value, setWidth)}
          value={width.toString()}
        />
        <Input
          name='height'
          label='Grid Height'
          onChange={(value) => handleChange(value, setHeight)}
          value={height.toString()}
        />
      </div>
      <GridLayout
        layout={layout}
        cols={width}
        width={900}
      >
        {layout.map(element => (
          <div className='element' id={element.i} key={element.i} />
        ))}
      </GridLayout>
      <div>
        <Input
          name='childW'
          label='Child Width'
          onChange={(value) => handleChange(value, setChildW)}
          value={childW.toString()}
        />
        <Input
          name='childH'
          label='Child Height'
          onChange={(value) => handleChange(value, setChildH)}
          value={childH.toString()}
        />
        <button
          onClick={addChild}
          disabled={!width || !height || !childH || !childW || (childW > width)}
        >
          Add Child
        </button>
        {!width || !height ? <span>Specify Grid dimensions before adding elements</span> : null}
        {!childH || !childW ? <span>Specify Child dimensions before adding it</span> : null}
        {childW > width ? <span>Element width cannot exceed Grid width</span> : null}
      </div>
    </div>
  );
}

export default AugmentedGrid;
