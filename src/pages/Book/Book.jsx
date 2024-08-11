import React from 'react';
import Controls from '../controlpanel/Controls';
import Pages from './Pages';

const Book = () => {
   return (
      <div className="h-screen w-screen bg-gray-200 flex flex-col">
         <div className="flex-1">
            <Pages />
         </div>
         <div className="fixed bottom-0 left-0 right-0 bg-gray-900 py-4 flex justify-center items-center">
            <Controls />
         </div>
      </div>
   );
};

export default Book;