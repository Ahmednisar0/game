'use client'
import React, { useState } from 'react';

interface SliderProps {
  defaultValue?: [number, number];
  max?: number;
  step?: number;
  value?: [number, number];
  onValueChange?: (value: [number, number]) => void;
  className?: string;
}

export const Slider = ({
  defaultValue = [0, 100],
  max = 100,
  step = 1,
  value: propValue,
  onValueChange,
  className = ''
}: SliderProps) => {
  const [localValue, setLocalValue] = useState(defaultValue);
  const value = propValue || localValue;

  // Handle changes in the sliders
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = [...value] as [number, number];
    newValue[index] = Number(e.target.value);

    // Ensure that the values are in correct order
    const sortedValue = newValue.sort((a, b) => a - b) as [number, number];

    // Update local state and trigger onValueChange if provided
    if (!propValue) {
      setLocalValue(sortedValue);
    }
    onValueChange?.(sortedValue);
  };

  // Calculate the position of the thumbs
  const minPos = (value[0] / max) * 100;
  const maxPos = (value[1] / max) * 100;

  return (
    <div className={`relative ${className}`}>
      {/* Track */}
      <div className="h-1 bg-gray-200 rounded-full w-full"></div>

      {/* Progress bar */}
      <div
        className="absolute top-0 h-1 bg-pink-500 rounded-full"
        style={{ left: `${minPos}%`, width: `${maxPos - minPos}%` }}
      ></div>

      {/* Thumb for min value */}
      <div
        className="absolute top-0 left-0 -mt-1.5"
        style={{ left: `${minPos}%` }}
      >
        <input
          type="range"
          min="0"
          max={max}
          step={step}
          value={value[0]}
          onChange={(e) => handleChange(e, 0)}
          className="w-24 h-1 opacity-0 absolute"
        />
        <div className="w-4 h-4 bg-pink-600 rounded-full shadow-md cursor-pointer"></div>
      </div>

      {/* Thumb for max value */}
      <div
        className="absolute top-0 left-0 -mt-1.5"
        style={{ left: `${maxPos}%` }}
      >
        <input
          type="range"
          min="0"
          max={max}
          step={step}
          value={value[1]}
          onChange={(e) => handleChange(e, 1)}
          className="w-24 h-1 opacity-0 absolute"
        />
        <div className="w-4 h-4 bg-pink-600 rounded-full shadow-md cursor-pointer"></div>
      </div>
    </div>
  );
};
