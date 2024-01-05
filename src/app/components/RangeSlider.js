'use client';
import { useState, useEffect, useRef } from 'react';

const RangeSlider = ({ initialMin, initialMax, min, max, step, priceCap, getMinPrice, getMaxPrice }) => {
  const progressRef = useRef(null);
  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);

  const handleMin = (e) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) > parseInt(maxValue)) {
      } else {
        setMinValue(parseInt(e.target.value));
        getMinPrice(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) < minValue) {
        setMinValue(parseInt(e.target.value));
        getMinPrice(parseInt(e.target.value));
      }
    }
  };

  const handleMax = (e) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) < parseInt(minValue)) {
      } else {
        setMaxValue(parseInt(e.target.value));
        getMaxPrice(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) > maxValue) {
        setMaxValue(parseInt(e.target.value));
        getMaxPrice(parseInt(e.target.value));
      }
    }
  };

  useEffect(() => {
    progressRef.current.style.left = (minValue / max) * step + '%';
    progressRef.current.style.right = step - (maxValue / max) * step + '%';
  }, [minValue, maxValue, max, step]);

  return (
    <>
      <div className='flex flex-col bg-white w-full'>
        {/* Range */}
        <div className='mb-4'>
          <div className='slider relative h-[2px] rounded-md bg-gray-300 w-full'>
            <div className='progress absolute h-[2px] bg-blue rounded ' ref={progressRef}></div>
          </div>
          <div className='range-input relative'>
            <input onChange={handleMin} type='range' min={min} step={step} max={max} value={minValue} className='range-min absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none' />
            <input onChange={handleMax} type='range' min={min} step={step} max={max} value={maxValue} className='range-max absolute w-full  -top-1 h-1  bg-transparent appearance-none  pointer-events-none' />
          </div>
        </div>
        {/* input number */}
        <div className='flex justify-between items-center bg-red-300 w-full'>
          <div className='rounded-md'>
            <input disabled onChange={(e) => setMinValue(e.target.value)} type='number' value={minValue} className='hidden' />
          </div>
          <div className=' '>
            <input disabled onChange={(e) => setMaxValue(e.target.value)} type='number' value={maxValue} className='hidden' />
          </div>
        </div>
      </div>
    </>
  );
};

export default RangeSlider;
