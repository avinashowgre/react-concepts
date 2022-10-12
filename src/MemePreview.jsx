import React, { useEffect, useRef, useState } from 'react';

const TEST_ID = 'meme-preview';

export function MemePreview(props) {
  const { imageBlob, texts = [] } = props;

  const canvas = useRef();
  const startX = useRef(0);
  const startY = useRef(0);
  const offsetX = useRef(0);
  const offsetY = useRef(0);

  const [captions, setCaptions] = useState([]);
  const [selectedText, setSelectedText] = useState(-1);

  useEffect(() => {
    offsetX.current = canvas.current.offsetLeft;
    offsetY.current = canvas.current.offsetTop;
  }, []);

  useEffect(() => {
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

    startX.current = parseInt(e.pageX - offsetX.current);
    startY.current = parseInt(e.pageY - offsetY.current);

    // Put your mousedown stuff here
    for (var i = 0; i < captions.length; i++) {
      if (textHit(startX.current, startY.current, i)) {
        canvas.current.style.cursor = 'pointer';
        setSelectedText(i);
      }
    }
  }

  function handleMouseMove(e) {
    if (selectedText < 0) return;

    e.preventDefault();

    const mouseX = parseInt(e.pageX - offsetX.current);
    const mouseY = parseInt(e.pageY - offsetY.current);

    // Put your mousemove stuff here
    var dx = mouseX - startX.current;
    var dy = mouseY - startY.current;

    startX.current = mouseX;
    startY.current = mouseY;

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
