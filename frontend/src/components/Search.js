
import React from 'react';

const Search = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className='mb-4'>
      <label htmlFor='search' className='text-gray-600 font-medium'>
        Search:
      </label>
      <input
        type='text'
        id='search'
        className='border p-2 w-full rounded-md'
        placeholder='Type to search...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default Search;
