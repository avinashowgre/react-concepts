import React, { useEffect, useRef, useState } from 'react';

const TEST_ID = 'meme-preview';

export function MemePreview(props) {
  const { imageBlob, texts = [] } = props;

  const canvas = useRef();
  const [captionTexts, setCaptionTexts] = useState([]);
  const [selectedTextIndex, setSelectedTextIndex] = useState(-1);

  let startX = null;
  let startY = null;

  useEffect(() => {
    let textsCpy = [...texts];

    textsCpy.forEach((text) => {
      text.width = Math.round(
        canvas.current.getContext('2d').measureText(text.text).width
      );
      text.height = 16;
    });

    setCaptionTexts(textsCpy);
  }, [texts]);

  useEffect(() => {
    if (!imageBlob) return;

    draw(imageBlob, captionTexts);
  }, [imageBlob, captionTexts]);

  function draw(blob, texts) {
    const context = canvas.current.getContext('2d');
    const image = new Image();

    image.onload = () => {
      context.drawImage(
        image,
        0,
        0,
        canvas.current.width,
        canvas.current.height
      );

      texts.forEach((caption) => {
        const { text, x, y } = caption;
        // Text attributes
        context.font = '30pt Impact';
        context.textAlign = 'center';
        context.strokeStyle = 'black';
        context.lineWidth = 3;
        context.fillStyle = 'white';

        context.fillText(text, x, y);
        context.strokeText(text, x, y);
      });
    };
    image.src = blob;
  }

  function textHit(startx, starty) {
    for (let i = 0; i < captionTexts.length; i++) {
      const box = captionTexts[i];
      if (
        startx >= box.x &&
        startx <= box.x + box.width &&
        starty >= box.y &&
        starty <= box.y + box.height
      ) {
        return i;
      }
    }

    return -1;
  }

  function handleMouseDown(e) {
    e.preventDefault();

    startX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    startY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);

    const isHitIndex = textHit(startX, startY);

    console.log(isHitIndex);

    if (isHitIndex > -1) {
      canvas.current.style.cursor = 'pointer';
    }

    setSelectedTextIndex(isHitIndex);
  }

  function handleMouseMove(e) {
    e.preventDefault();

    if (selectedTextIndex < 0) return;

    const mouseX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
    const mouseY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);

    // Put your mousemove stuff here
    var dx = mouseX - startX;
    var dy = mouseY - startY;

    startX = mouseX;
    startY = mouseY;

    const captionTextsCpy = [...captionTexts];

    captionTextsCpy[selectedTextIndex].x = dx;
    captionTextsCpy[selectedTextIndex].y = dy;

    setCaptionTexts(captionTextsCpy);
  }

  function handleMouseUp(e) {
    e.preventDefault();
    setSelectedTextIndex(-1);
    canvas.current.style.cursor = 'auto';
  }

  function handleMouseOut(e) {
    e.preventDefault();
    setSelectedTextIndex(-1);
  }

  if (!imageBlob) return null;

  return (
    <canvas
      height="600"
      id={TEST_ID}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
      onMouseUp={handleMouseUp}
      ref={canvas}
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
      width="500"
    ></canvas>
  );
}
