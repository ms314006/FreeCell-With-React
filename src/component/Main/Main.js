import React, { useState } from 'react';
import { useDrop, useDrag } from 'react-dnd';

const Box = (props) => {
  const {
    id, left, top, hideSourceOnDrag, children,
  } = props;
  const [{ isDragging, }, drag] = useDrag({
    item: {
      id, left, top, type: 'box',
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }
  return (
    <div
      ref={drag}
      style={{
        ...{
          position: 'absolute',
          border: '1px dashed gray',
          backgroundColor: 'white',
          padding: '0.5rem 1rem',
          cursor: 'move',
        },
        left,
        top,
      }}
    >
      {children}
    </div>
  );
};

const Container = ({ hideSourceOnDrag, }) => {
  const [boxes, setBoxes] = useState({
    a: { top: 20, left: 80, title: 'Drag me around', },
    b: { top: 180, left: 20, title: 'Drag me too', },
  });
  const moveBox = (id, left, top) => {
    console.log({
      ...boxes,
      [id]: {
        ...boxes[id],
        left,
        top,
      },
    })
    setBoxes({
      ...boxes,
      [id]: {
        ...boxes[id],
        left,
        top,
      },
    });
  };
  const [, drop] = useDrop({
    accept: 'box',
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      moveBox(item.id, left, top);
      return undefined;
    },
  });

  return (
    <div
      ref={drop}
      style={{
        width: 300,
        height: 300,
        border: '1px solid black',
        position: 'relative',
      }}
    >
      {Object.keys(boxes).map((key) => {
        const { left, top, title, } = boxes[key];
        return (
          <Box
            key={key}
            id={key}
            left={left}
            top={top}
            hideSourceOnDrag={hideSourceOnDrag}
          >
            {title}
          </Box>
        );
      })}
    </div>
  );
};

export default Container;
