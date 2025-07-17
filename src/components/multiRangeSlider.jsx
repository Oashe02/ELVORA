import { useRef, useState, useEffect } from "react";

const MultiRangeSlider = ({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  applyFilter,
  minValue = 0,
  maxValue = 50000,
  ...props
}) => {
  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);

  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);

  useEffect(() => {
    setLocalMinPrice(Math.max(minPrice, minValue));
    setLocalMaxPrice(Math.min(maxPrice, maxValue));
  }, [minPrice, maxPrice, minValue, maxValue]);

  const handleMinChange = (event) => {
    const value = Math.min(+event.target.value, localMaxPrice - 1);
    setLocalMinPrice(value);
  };

  const handleMaxChange = (event) => {
    const value = Math.max(+event.target.value, localMinPrice + 1);
    setLocalMaxPrice(value);
  };

  const applyPriceFilter = () => {
    setMinPrice(localMinPrice);
    setMaxPrice(localMaxPrice);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center" {...props}>
        <div className="relative w-[200px]">
          {/* Tooltip for Min Price */}
          {/* Min Price Slider */}
          <input
            type="range"
            min={minValue}
            max={maxValue}
            value={localMinPrice}
            ref={minPriceRef}
            step={300}
            onChange={handleMinChange}
            onMouseUp={() => applyPriceFilter()}
            onTouchEnd={() => applyPriceFilter()}
            className="thumb absolute z-[3] h-0 w-full cursor-pointer appearance-none bg-transparent outline-none"
          />
          {/* Tooltip for Max Price */}

          {/* Max Price Slider */}
          <input
            type="range"
            min={minValue}
            max={maxValue}
            value={localMaxPrice}
            ref={maxPriceRef}
            step={300}
            onChange={handleMaxChange}
            onMouseUp={() => applyPriceFilter()}
            onTouchEnd={() => applyPriceFilter()}
            className="thumb absolute z-[4] h-0 w-[200px] cursor-pointer appearance-none bg-transparent outline-none"
          />
          {/* to redeploy */}
          {/* Visual Representation of the Range */}
          <div className="relative h-1.5 w-full bg-gray-300">
            <div
              className="absolute h-1.5 bg-blue-500"
              style={{
                left: `${(localMinPrice / maxValue) * 100}%`,
                right: `${100 - (localMaxPrice / maxValue) * 100}%`,
                transition: "left 0.1s, right 0.1s",
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="mb-2 flex w-full justify-between px-7">
        <span className="w-max text-center">{localMinPrice}</span>
        <span className="w-max text-center">{localMaxPrice}</span>
      </div>
    </>
  );
};

export default MultiRangeSlider;
