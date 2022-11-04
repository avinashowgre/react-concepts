import React, { useEffect, useRef, useState } from 'react';

const TEST_ID = 'meme-preview';

export function MemePreview(props) {
  const { imageBlob, setMeme, texts = [] } = props;

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

    setMeme(canvas.current);
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
        const { fillStyle, text, x, y, width, height } = caption;

        // Text attributes
        context.font = '80px Impact';
        context.strokeStyle = 'black';
        context.lineWidth = 3;
        context.fillStyle = fillStyle;

        wrapText(context, text, x, y);
      });
    };
    image.src = blob;
  }

  function wrapText(
    context,
    text,
    x,
    y,
    maxWidth = canvas.current.width / 2,
    lineHeight = 100
  ) {
    var words = text.split(' ');
    var line = '';

    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        context.strokeText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
    context.strokeText(line, x, y);
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
