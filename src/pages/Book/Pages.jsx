import React from 'react';
import HTMLFlipBook from 'react-pageflip';

const Book = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <HTMLFlipBook width={595} height={842} drawShadow={false} >
        <div className="p-4 bg-gray-200 border">Page 1</div>
        <div className="p-4 bg-gray-300 border">Page 2</div>
        <div className="p-4 bg-gray-400 border">Page 3</div>
        <div className="p-4 bg-gray-500 border">Page 4</div>
      </HTMLFlipBook>
    </div>
  );
}

export default Book;