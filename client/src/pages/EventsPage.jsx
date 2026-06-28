import React, { useState, useEffect, useContext } from 'react';
import { getAllEvents, searchEvents, filterByCategory, getNearbyEvents } from '../services/eventService';
import { AuthContext } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';

const EventsPage = () => {
  const { user } = useContext(AuthContext);
  
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isNearbyFilter, setIsNearbyFilter] = useState(false);

  // Initial load
  useEffect(() => {
    const loadInitial = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await getAllEvents();
        setEvents(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadInitial();
  }, []);

  // Debounced search effect
  useEffect(() => {
    // Only search if selectedCategory is All and isNearbyFilter is false
    if (selectedCategory !== 'All' || isNearbyFilter) return;

    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      setError(false);
      try {
        if (searchQuery.trim() === '') {
          const data = await getAllEvents();
          setEvents(data);
        } else {
          const data = await searchEvents(searchQuery);
          setEvents(data);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setIsNearbyFilter(false);

    setLoading(true);
    setError(false);
    try {
      if (category === 'All') {
        const data = await getAllEvents();
        setEvents(data);
      } else {
        const data = await filterByCategory(category);
        setEvents(data);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    // Reset other filters
    setSelectedCategory('All');
    setIsNearbyFilter(false);
  };

  const handleNearbyClick = async () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setIsNearbyFilter(true);

    setLoading(true);
    setError(false);
    try {
      const userId = user?._id || user?.id || '6a415ffae52b1d8e68b57839';
      const data = await getNearbyEvents(userId);
      setEvents(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const getEmptyStateMessage = () => {
    if (searchQuery) return 'No matching events found.';
    if (selectedCategory !== 'All') return 'No events in this category.';
    if (isNearbyFilter) return 'No nearby events found.';
    return 'No events available.';
  };

  return (
    <div className="page-container events-page">
      <h2>Discover Events</h2>

      {/* Control panel containing Search, Category, and Nearby controls */}
      <div className="events-controls" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '15px', 
        marginBottom: '20px',
        width: '100%'
      }}>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <SearchBar value={searchQuery} onChange={handleSearchChange} />
          </div>
          <div style={{ width: '200px', minWidth: '150px' }}>
            <CategoryFilter selectedCategory={selectedCategory} onChange={handleCategoryChange} />
          </div>
          <button 
            onClick={handleNearbyClick} 
            className="btn-secondary"
            style={{ 
              padding: '12px 20px', 
              borderRadius: '8px', 
              fontWeight: '600', 
              height: '46px',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: isNearbyFilter ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
              color: '#fff',
              border: isNearbyFilter ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)'
            }}
          >
            Nearby Events
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
          Loading events...
        </div>
      ) : error ? (
        <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--danger)' }}>
          Something went wrong.
          <br />
          Please try again.
        </div>
      ) : events.length === 0 ? (
        <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          {getEmptyStateMessage()}
        </div>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
