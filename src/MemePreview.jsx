import React, { useEffect, useRef, useState } from 'react';

const TEST_ID = 'meme-preview';

export function MemePreview(props) {
  const { imageBlob, texts = [] } = props;

  const canvas = useRef();
  const [captions, setCaptions] = useState([]);
  const [selectedText, setSelectedText] = useState(-1);
  const [offset, setOffset] = useState({
    offsetX: 0,
    offsetY: 0,
  });

  const [start, setStart] = useState({
    startX: 0,
    startY: 0,
  });

  useEffect(() => {
    setOffset({
      offsetX: canvas.current.offsetLeft,
      offsetY: canvas.current.offsetTop,
    });
  }, []);

  useEffect(() => {
    canvas.current.getContext('2d').font = '30pt Impact';

    texts.forEach((text) => {
      text.width = canvas.current.getContext('2d').measureText(text.text).width;
      text.height = 80;
    });

    setCaptions(texts);
  }, [texts]);

  useEffect(() => {
    draw(imageBlob, captions);
  }, [imageBlob, captions]);

  function draw(blob, texts) {
    const context = canvas.current.getContext('2d');
    const image = new Image();

    context.clearRect(0, 0, canvas.current.width, canvas.current.height);

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
        context.font = '80px Impact';
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

  function textHit(startX, startY, textIndex) {
    var text = captions[textIndex];
    return (
      startX >= text.x &&
      startX <= text.x + text.width &&
      startY >= text.y - text.height &&
      startY <= text.y
    );
  }

  function handleMouseDown(e) {
    e.preventDefault();

    const { offsetX, offsetY } = offset;
    const { startX, startY } = start;

    setStart({
      startX: parseInt(e.pageX - offsetX),
      startY: parseInt(e.pageY - offsetY),
    });

    // Put your mousedown stuff here
    for (var i = 0; i < captions.length; i++) {
      if (textHit(startX, startY, i)) {
        canvas.current.style.cursor = 'pointer';
        setSelectedText(i);
      }
    }
  }

  function handleMouseMove(e) {
    if (selectedText < 0) return;

    e.preventDefault();

    const { offsetX, offsetY } = offset;
    const { startX, startY } = start;

    const mouseX = parseInt(e.pageX - offsetX);
    const mouseY = parseInt(e.pageY - offsetY);

    // Put your mousemove stuff here
    var dx = mouseX - startX;
    var dy = mouseY - startY;

    setStart({
      startX: mouseX,
      startY: mouseY,
    });

    let captionsCpy = captions.map((caption, index) => {
      if (selectedText === index) {
        caption.x += dx;
        caption.y += dy;
      }
      return caption;
    });

    setCaptions(captionsCpy);
  }

  function handleMouseUp(e) {
    e.preventDefault();
    setSelectedText(-1);
    canvas.current.style.cursor = 'auto';
  }

  function handleMouseOut(e) {
    e.preventDefault();
    setSelectedText(-1);
  }

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
