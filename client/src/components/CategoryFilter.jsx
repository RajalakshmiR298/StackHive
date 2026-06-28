import React from 'react';

const CategoryFilter = ({ selectedCategory, onChange }) => {
  const categories = [
    'All',
    'Workshop',
    'Hackathon',
    'Seminar',
    'Competition',
    'Meetup',
    'Networking',
    'Internship',
  ];

  return (
    <div className="category-filter-container" style={{ width: '100%', marginBottom: '15px' }}>
      <select
        value={selectedCategory}
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
          cursor: 'pointer',
        }}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat === 'All' ? 'Filter by Category (All)' : cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
