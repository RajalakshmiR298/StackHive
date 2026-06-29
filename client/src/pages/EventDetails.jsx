import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEventById } from '../services/eventService';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
        Loading events...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--danger)' }}>
        Something went wrong.
        <br />
        Please try again.
      </div>
    );
  }

  if (!event) {
    return (
      <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
        Event not found.
      </div>
    );
  }

  return (
    <div className="page-container event-details-page" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/events" className="btn-secondary" style={{ alignSelf: 'flex-start', textDecoration: 'none', marginBottom: '15px' }}>
        &larr; Back to Events
      </Link>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <img 
          src={event.image} 
          alt={event.title} 
          style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '12px' }} 
          onError={(e) => { e.target.src = 'https://placehold.co/600x400'; }}
        />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <h1 style={{ fontSize: '2.2rem', margin: 0, background: 'none', WebkitTextFillColor: 'initial' }}>{event.title}</h1>
          <span className="badge" style={{ fontSize: '0.9rem', padding: '6px 14px' }}>{event.category}</span>
        </div>

        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
          {event.description}
        </p>

        <div style={{ 
          borderTop: '1px solid var(--border-color)', 
          borderBottom: '1px solid var(--border-color)', 
          padding: '20px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Organizer:</strong> {event.organizer}</p>
        </div>

        {event.registrationLink && (
          <a 
            href={event.registrationLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ 
              alignSelf: 'flex-start', 
              textDecoration: 'none', 
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '10px'
            }}
          >
            Register
          </a>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
