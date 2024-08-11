import React, { useState, useEffect } from 'react'

const SinglePage = () => {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const adjustedHeight = height - 200;
  const adjustedWidth = adjustedHeight * 1.4;

  return (
    <div className="h-full flex items-center justify-center bg-gray-300">
      <div style={{ height: `${adjustedHeight}px`, width: `${adjustedWidth}px` }} className="bg-blue-500">
        Available height: {adjustedHeight}px
      </div>
    </div>
  )
}

export default SinglePage