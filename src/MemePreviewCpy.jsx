import React, { useEffect, useRef, useState } from 'react';

const TEST_ID = 'meme-preview';
const fontSize = '24px';

export function MemePreviewCpy(props) {
  const { imageBlob, onCaptionChange, setMeme, texts = [] } = props;
  const [canvasStage, setCanvasStage] = useState();
  const canvasRef = useRef();

  useEffect(() => {
    const stage = new createjs.Stage(TEST_ID);
    setCanvasStage(stage);
    setMeme(canvasRef.current);
  }, []);

  useEffect(() => {
    if (!canvasStage) return;
    draw();
  }, [imageBlob, texts, canvasStage]);

  function drag(evt) {
    evt.target.x = evt.stageX;
    evt.target.y = evt.stageY;
    evt.target.cursor = 'pointer';
    canvasStage.update();
  }

  function drop(evt, index) {
    if (onCaptionChange) {
      const { text, x, y } = evt.target;
      onCaptionChange(index, {
        text,
        x,
        y,
      });
    }
  }

  function draw() {
    canvasStage.removeAllChildren();

    const image = new Image();

    image.onload = () => {
      var bitmap = new createjs.Bitmap(image);
      bitmap.scaleX = canvasRef.current.width / image.width;
      bitmap.scaleY = canvasRef.current.height / image.height;

      canvasStage.addChild(bitmap);

      texts.forEach((inputText, index) => {
        const { color, font, fontSize, text, x, y } = inputText;
        let createText = new createjs.Text();
        createText.set({
          color,
          text,
          font: `${font} 50px Arial`,
          lineWidth: canvasStage.canvas.width / 2,
          lineHeight: 20,
          textBaseline: 'top',
          textAlign: 'left',
          x,
          y,
        });
        createText.on('pressmove', drag);
        createText.on('pressup', function (evt) {
          drop(evt, index);
        });
        canvasStage.addChild(createText);
      });

      canvasStage.update();
    };

    image.src = imageBlob;
  }

  return (
    <canvas
      ref={canvasRef}
      height="600"
      id={TEST_ID}
      style={{
        border: '1px solid black',
        maxWidth: '100%',
        height: 'auto',
      }}
      width="500"
    ></canvas>
  );
}
