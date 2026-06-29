import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar-container" style={{ width: '100%', marginBottom: '15px' }}>
      <input
        type="text"
        className="search-input"
        placeholder="Search events by title or description..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          fontSize: '1rem',
          outline: 'none',
          transition: 'border-color 0.2s',
        }}
      />
    </div>
  );
};

export default SearchBar;
