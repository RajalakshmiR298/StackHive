import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <Link to={`/events/${event._id}`} className="event-card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="event-card">
        <img 
          src={event.image} 
          alt={event.title} 
          className="event-card-image" 
          style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }} 
          onError={(e) => { e.target.src = 'https://placehold.co/600x400'; }}
        />
        <h3 className="event-card-title" style={{ margin: '10px 0 5px 0' }}>{event.title}</h3>
        <p className="event-card-date" style={{ margin: '5px 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          {event.date}
        </p>
        <p className="event-card-location" style={{ margin: '5px 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          {event.location}
        </p>
      </div>
    </Link>
  );
};

export default EventCard;
