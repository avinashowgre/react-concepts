import React, { useEffect, useState } from 'react';

const TEST_ID = 'meme-preview';
const fontSize = '24px';

export function MemePreviewCpy() {
  const { imageBlob, setMeme, texts = [] } = props;
  const [canvasStage, setCanvasStage] = useState();

  useEffect(() => {
    const stage = new createjs.Stage(TEST_ID);
    setCanvasStage(stage);
  }, []);

  function draw() {
    const bitmap = new createjs.Bitmap(imageBlob);
    stage.addChild(bitmap);

    texts.forEach((inputText, index) => {
      const { text } = inputText;
      let createText = new createjs.Text();
      createText.set({
        text,
        font: 'italic 16px Arial black',
        lineWidth: canvasStage.canvas.width / 2,
        lineHeight: 20,
        textBaseline: 'top',
        textAlign: 'left',
        x: 0,
        y: (index + 1) * parseInt(fontSize, 0),
      });
      // inputText = { ...inputText, ...createText.getBounds() };
      createText.on('pressmove', drag);
      stage.addChild(createText);
      stage.update();
    });
  }

  return (
    <canvas
      height="600"
      id={TEST_ID}
      ref={canvas}
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
      width="500"
    ></canvas>
  );
}
