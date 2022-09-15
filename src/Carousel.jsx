import React, { useEffect, useRef, useState } from 'react';

const images = [
  'https://www.w3schools.com/howto/img_nature_wide.jpg',
  'https://www.w3schools.com/howto/img_snow_wide.jpg',
  'https://www.w3schools.com/howto/img_mountains_wide.jpg',
];

export function Carousel(props) {
  const { imageList = images } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lastDirection, setLastDirection] = useState('right');
  const listRef = useRef(null);
  const nextButtonRef = useRef(null);
  const prevButtonRef = useRef(null);
  const [shiftUnit, setShiftUnit] = useState(0);

  useEffect(() => {
    setShiftUnit(listRef.current.children[0].clientWidth);
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      listRef.current.style.transform = `translateX(${
        currentSlide * -shiftUnit
      }px)`;
      listRef.current.style.transition = 'transform 1s';
    });
  }, [currentSlide]);

  const shift = ({ direction }) => {
    setLastDirection(direction);
    if (direction === 'right') {
      setCurrentSlide((prevState) => prevState + 1);
    } else if (direction === 'left') {
      setCurrentSlide((prevState) => prevState - 1);
    }
  };

  const showPrev = (e) => {
    e.preventDefault();
    shift({ direction: 'left' });
  };

  const showNext = (e) => {
    shift({ direction: 'right' });
  };

  const handleTransition = (e) => {
    e.preventDefault();
    if (currentSlide === listRef.current.children.length - 1) {
      nextButtonRef.current.disabled = true;
    } else if (currentSlide === 0) {
      prevButtonRef.current.disabled = true;
    } else {
      prevButtonRef.current.disabled = false;
      nextButtonRef.current.disabled = false;
    }

    // if (lastDirection === 'right') {
    //   const head = listRef.current.firstChild;
    //   listRef.current.removeChild(head);
    //   listRef.current.append(head);
    //   setCurrentSlide((prevState) => prevState - 1);
    // } else if (lastDirection === 'left') {
    //   const tail = listRef.current.lastChild;
    //   listRef.current.removeChild(tail);
    //   listRef.current.prepend(tail);
    //   setCurrentSlide((prevState) => prevState + 1);
    // }
  };

  return (
    <div className="carousel">
      <button
        type="button"
        className="carousel__slide-arrow"
        onClick={showPrev}
        ref={prevButtonRef}
      >
        Prev
      </button>
      <div className="carousel__viewport">
        <ul
          className="carousel__list"
          onTransitionEnd={handleTransition}
          ref={listRef}
        >
          {imageList.map((url, index) => (
            <li className="carousel__list__item" key={index}>
              <img src={url} style={{ width: '100%', height: '100%' }} />
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        className="carousel__slide-arrow"
        onClick={showNext}
        ref={nextButtonRef}
      >
        Next
      </button>
    </div>
  );
}
