import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_BASE_URL = 'https://sns-backend-t230.onrender.com';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');

  .ev-sr { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .8s cubic-bezier(.22,1,.36,1); }
  .ev-sr.ev-in { opacity: 1; transform: none; }
  .ev-sl { opacity: 0; transform: translateX(-32px); transition: opacity .7s ease, transform .8s cubic-bezier(.22,1,.36,1); }
  .ev-sl.ev-in { opacity: 1; transform: none; }
  .ev-sr2 { opacity: 0; transform: translateX(32px); transition: opacity .7s ease, transform .8s cubic-bezier(.22,1,.36,1); }
  .ev-sr2.ev-in { opacity: 1; transform: none; }
  .ev-d1{transition-delay:.08s} .ev-d2{transition-delay:.18s} .ev-d3{transition-delay:.28s} .ev-d4{transition-delay:.38s}

  /* ══ HERO — full width light ══ */
  .ev-hero {
    min-height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #F9EDED;
    position: relative;
    overflow: hidden;
    padding: 0 50px;
    border-bottom: 1px solid rgba(124,29,29,.08);
  }

  /* Subtle concentric rings in background */
  .ev-ring-wrap {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    pointer-events: none;
  }
  .ev-ring {
    position: absolute; border-radius: 50%;
    border: 1px solid rgba(124,29,29,.055);
  }
  .ev-ring:nth-child(1){width:240px;height:240px}
  .ev-ring:nth-child(2){width:420px;height:420px}
  .ev-ring:nth-child(3){width:600px;height:600px}
  .ev-ring:nth-child(4){width:800px;height:800px}

  .ev-eyebrow {
    font-family: 'Cinzel', serif;
    font-size: .62rem; letter-spacing: .42em;
    color: #e56013; 
    text-transform: uppercase; display: block;
    margin-bottom: 1.4rem;
  }
  .ev-hero-title {
    font-family: 'Cormorant Garamond', serif;    
    font-size: clamp(2.8rem, 6vw, 4.5rem);
    font-weight: 900; line-height: 1.05;
    color: #4a1d1d; letter-spacing: -.01em;
    margin: 0 0 .5rem;
  }
  .ev-hero-title em {  color: #7c1d1d; }
  .ev-gold-rule {
    display: block; width: 48px; height: 2px;
    background: linear-gradient(90deg, #7c1d1d, #c9a84c);
    margin: 2rem 0;
  }
  .ev-hero-sub {
    font-size: clamp(1rem, 2vw, 1.15rem);
    font-weight: 400;
    color: #4a4a4a;
    max-width: 600px;
    margin: 0 auto 2rem;
    line-height: 1.8;
  }

  .ev-gold-rule { margin: 2rem auto; }
  .ev-hero-cta {
    display: inline-flex;
    align-items: center;
    gap: .6rem;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: .15em;
    text-transform: uppercase;
    color: #4a1d1d;
    border: 1px solid rgba(124,29,29,.4);
    padding: .9rem 2rem;
    border-radius: 4px;
    text-decoration: none;
    transition: .3s ease;
  }

  .ev-hero-cta:hover { background: rgba(124,29,29,.08); border-color: rgba(124,29,29,.5); }

  /* ══ QUOTE + STATS — side by side ══ */
.ev-mid {
    display: grid;
    grid-template-columns: 3fr 2fr;
    background: #fff;
  }
  @media(max-width:900px){ .ev-mid{ grid-template-columns:1fr; } }

  /* Left quote */
  .ev-mid-quote {
    padding: 5rem;
    border-right: 1px solid rgba(201,168,76,.12);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  @media(max-width:900px){ .ev-mid-quote{ padding: 3rem 2rem; border-right: none; border-bottom: 1px solid rgba(201,168,76,.12); } }

  .ev-mid-quote::before {
    content: '"';
    position: absolute; top: 2rem; left: 4rem;
    font-family: 'Cormorant Garamond', serif;
    font-size: 14rem; line-height: 1;
    color: rgba(201,168,76,.06);
    pointer-events: none; user-select: none;
  }

  .ev-qlabel {
    font-family: 'Cinzel', serif;
    font-weight: 900;
    font-size: .6rem; letter-spacing: .38em;
    color: #ff8605; opacity: .7;
    text-transform: uppercase;
    display: flex; align-items: center; gap: .8rem;
    margin-bottom: 2rem;
  }
  .ev-qlabel::before { content:''; width:32px; height:1px; background:#c9a84c; opacity:.4; }

  .ev-qtext {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.1rem, 1.8vw, 1.45rem);
    font-style: italic; font-weight: 900;
    color: #1a0808; line-height: 1.85;
    position: relative; z-index: 1;
  }

  .ev-qattr {
    font-family: 'Cinzel', serif;
    font-weight: 900;
    font-size: .62rem; letter-spacing: .2em;
    text-transform: uppercase; color: #fa0303;
    opacity: .7; margin-top: 2rem;
    display: flex; align-items: center; gap: .7rem;
  }
  .ev-qattr::before { content:''; width:20px; height:1px; background:#7c1d1d; opacity:.4; }

  /* Right stats panel */
  .ev-mid-stats {
    background: #faf7f2;
    padding: 4rem 2rem;
  }

  .ev-stat-row {
    padding: 1.5rem 0;
    border-bottom: 1px solid rgba(201,168,76,.15);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .ev-stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.5rem;
    font-weight: 600;
    color: #7c1d1d;
  }
   .ev-stat-label {
    font-size: 0.95rem;
    font-weight: 500;
    color: #444;
  }
  /* ══ EVENTS SECTION — asymmetric ══ */
  .ev-events-section {
    background: #f7f1e8;
    padding: 6rem 20px;
  }

  /* Two-column layout: sticky label left, cards right */
  .ev-events-inner {
    max-width: 1200px;
    margin: auto;
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 4rem;
  }
  @media(max-width:900px){ .ev-events-inner{ grid-template-columns:1fr; gap:3rem; } }

  /* Sticky left label */
  .ev-events-label {
    position: sticky;
    top: 5rem;
  }
  .ev-label-eyebrow {
    font-family: 'Cinzel', serif;
    font-size: .6rem; letter-spacing: .38em;
    color: #9a6f2a; opacity:.75;
    text-transform: uppercase; display:block;
    margin-bottom: .9rem;
  }
 
  .ev-label-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 4vw, 2.5rem);
    font-weight: 700;
    color: #3b0f0f;
  }
  .ev-label-title em { font-style: italic; display:block; }
  .ev-label-rule {
    display: block; width: 32px; height: 2px;
    background: linear-gradient(90deg, #7c1d1d, #c9a84c);
    margin: 1.2rem 0;
  }
  .ev-label-hint {
    font-size: 0.95rem;
    color: #555;
  }

  /* Card */
 .ev-card { background: #fff; border: 1px solid rgba(74,29,29,.1); border-radius: 4px; overflow: hidden; display: grid; grid-template-columns: 180px 1fr; position: relative; box-shadow: 0 2px 20px rgba(74,29,29,.06); transition: transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s ease; }
  @media(max-width:600px){ .ev-card{ grid-template-columns:1fr; } }

  .ev-card::before {
    content: '';
    position: absolute; top:0; left:0; right:0; height:3px;
    background: linear-gradient(90deg, #923d3d, #ddca97, #c07878);
    transform: scaleX(0); transform-origin: left;
    transition: transform .5s ease;
  }
  .ev-card:hover { transform: translateY(-6px); box-shadow: 0 24px 52px rgba(192, 118, 118, 0.12); }
  .ev-card:hover::before { transform: scaleX(1); }

  .ev-date-col {
    background: #4a1d1d;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 3rem 1.5rem;
    position: relative; overflow: hidden;
  }
  .ev-date-col::after {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(circle at 50% 50%, rgba(210, 46, 34, 0.08) 0%, transparent 65%);
    pointer-events: none;
  }
  .ev-date-month {
    font-family: 'Cinzel', serif; font-size: .65rem;
    letter-spacing: .35em; color: rgba(255, 255, 255, 0.75);
    text-transform: uppercase; margin-bottom: .7rem;
  }
  .ev-date-day {
    font-family: 'Cormorant Garamond', serif;
    font-size: 5rem; font-weight: 900;
    color: #fff; line-height: .9;
  }
  .ev-date-sep { width:24px; height:1px; background:rgba(201,168,76,.4); margin:1rem auto; }
  .ev-date-time {
    font-family: 'Lato', sans-serif; font-weight: 900;
    font-size: .7rem; color: rgba(255, 250, 250, 0.4);
    text-align: center; letter-spacing: .05em; line-height: 1.5;
  }

  .ev-card-body {
    padding: 2.8rem 2.6rem 2.4rem;
    display: flex; flex-direction: column;
    justify-content: space-between; gap: 1.8rem;
  }
  .ev-card-tag {
    font-family: 'Cinzel', serif; font-size: .6rem;
    letter-spacing: .28em; color: hsl(23, 100%, 50%);
    text-transform: uppercase;
    display: inline-flex; align-items: center; gap: .45rem;
    margin-bottom: 1rem; opacity: 1;
  }
  .ev-card-tag::before {
    content: ''; width:6px; height:6px; border-radius:50%;
    background:#c9a84c; opacity:.9;
  }
  .ev-card-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.65rem; font-weight: 900;
    color: #4a1d1d; line-height: 1.25;
    margin-bottom: .9rem;
    transition: color .3s ease;
  }
  .ev-card:hover .ev-card-title { color: #7c1d1d; }

  .ev-card-location {
    display: flex; align-items: center; gap: .45rem;
    font-family: 'Lato', sans-serif; font-size: .8rem;
    color: #be3a34; margin-bottom: 1.2rem;
  }
  .ev-card-location svg { width:.85rem; height:.85rem; flex-shrink:0; }

  .ev-card-desc {
    font-family: 'Lato', sans-serif; font-weight: 500;
    font-size: .88rem; line-height: 1.85; color: #010100;
  }
  .ev-card-footer {
    display: flex; align-items: center;
    justify-content: space-between;
    padding-top: 1.6rem;
    border-top: 1px solid rgba(86, 38, 38, 0.08);
    flex-wrap: wrap; gap: .8rem;
  }
  .ev-register-btn {
    display: inline-flex; align-items: center; gap: .55rem;
    font-family: 'Cinzel', serif; font-size: .63rem;
    letter-spacing: .2em; text-transform: uppercase;
    color: #fff; background: #914f4f;
    padding: .75rem 1.6rem; border-radius: 2px;
    text-decoration: none; border: none; cursor: pointer;
    transition: background .3s ease;
  }
  .ev-register-btn:hover { background: #6b1a1a; }
  .ev-register-btn svg { width:.75rem; height:.75rem; }

  .ev-card-badge {
    font-family: 'Lato', sans-serif; font-weight: 300;
    font-size: .7rem; color: #ea2016;
    background: rgba(115, 59, 56, 0.07);
    border: 1px solid rgba(153, 102, 99, 0.15);
    padding: .3rem .9rem; border-radius: 99px;
  }

  /* ══ BOTTOM BAND ══ */
  .ev-bottom {
    padding: 3rem 0;
    text-align: center;
  }
  .ev-bottom span {
    font-size: 0.75rem;
    letter-spacing: .3em;
    color: #ff7300;
  }

  /* ══ LOADING STATE ══ */
  .ev-loading {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 4rem 2rem; gap: 1.5rem;
  }
  .ev-spinner {
    width: 40px; height: 40px;
    border: 3px solid rgba(124,29,29,.15);
    border-top-color: #7c1d1d;
    border-radius: 50%;
    animation: ev-spin 0.8s linear infinite;
  }
  @keyframes ev-spin { to { transform: rotate(360deg); } }

  /* ══ REGISTRATION MODAL ══ */
  .ev-modal-overlay {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(0,0,0,0.55);
    display: flex; align-items: center; justify-content: center;
    padding: 1rem;
    animation: ev-fade-in 0.3s ease;
  }
  @keyframes ev-fade-in { from { opacity: 0; } to { opacity: 1; } }

  .ev-modal {
    background: #fff;
    border-radius: 8px;
    max-width: 480px; width: 100%;
    box-shadow: 0 24px 80px rgba(0,0,0,.25);
    overflow: hidden;
    animation: ev-slide-up 0.35s cubic-bezier(.22,1,.36,1);
  }
  @keyframes ev-slide-up { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  .ev-modal-header {
    background: #4a1d1d;
    padding: 1.8rem 2rem;
    color: #fff;
  }
  .ev-modal-header h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem; font-weight: 700;
    margin: 0 0 .3rem;
  }
  .ev-modal-header p {
    font-family: 'Lato', sans-serif;
    font-size: .8rem; color: rgba(255,255,255,.6);
    margin: 0;
  }

  .ev-modal-body {
    padding: 2rem;
  }
  .ev-form-group {
    margin-bottom: 1.3rem;
  }
  .ev-form-group label {
    display: block;
    font-family: 'Cinzel', serif;
    font-size: .62rem; letter-spacing: .18em;
    text-transform: uppercase;
    color: #4a1d1d;
    margin-bottom: .5rem;
    font-weight: 600;
  }
  .ev-form-group input {
    width: 100%;
    padding: .75rem 1rem;
    border: 1px solid rgba(74,29,29,.2);
    border-radius: 4px;
    font-family: 'Lato', sans-serif;
    font-size: .9rem;
    color: #333;
    outline: none;
    transition: border-color .3s ease, box-shadow .3s ease;
    box-sizing: border-box;
  }
  .ev-form-group input:focus {
    border-color: #7c1d1d;
    box-shadow: 0 0 0 3px rgba(124,29,29,.08);
  }
  .ev-form-group input::placeholder {
    color: #aaa;
  }

  .ev-modal-actions {
    display: flex; gap: 1rem;
    padding: 0 2rem 2rem;
  }
  .ev-btn-submit {
    flex: 1;
    padding: .85rem 1.5rem;
    background: #7c1d1d;
    color: #fff;
    border: none; border-radius: 4px;
    font-family: 'Cinzel', serif;
    font-size: .65rem;
    letter-spacing: .15em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background .3s ease;
  }
  .ev-btn-submit:hover { background: #5a1414; }
  .ev-btn-submit:disabled { background: #aaa; cursor: not-allowed; }

  .ev-btn-cancel {
    padding: .85rem 1.5rem;
    background: transparent;
    color: #4a1d1d;
    border: 1px solid rgba(74,29,29,.25);
    border-radius: 4px;
    font-family: 'Cinzel', serif;
    font-size: .65rem;
    letter-spacing: .15em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background .3s ease;
  }
  .ev-btn-cancel:hover { background: rgba(74,29,29,.05); }

  /* ══ SUCCESS / ERROR ALERTS ══ */
  .ev-alert {
    padding: 1rem 1.4rem;
    border-radius: 6px;
    margin: 0 2rem 1.5rem;
    font-family: 'Lato', sans-serif;
    font-size: .85rem;
    display: flex; align-items: center; gap: .6rem;
    animation: ev-fade-in .3s ease;
  }
  .ev-alert-success {
    background: #f0fdf4;
    color: #166534;
    border: 1px solid #bbf7d0;
  }
  .ev-alert-error {
    background: #fef2f2;
    color: #991b1b;
    border: 1px solid #fecaca;
  }

  /* ══ NO EVENTS ══ */
  .ev-no-events {
    text-align: center;
    padding: 3rem 2rem;
    color: #888;
    font-family: 'Lato', sans-serif;
    font-size: 1rem;
  }
`;

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && e.target.classList.add('ev-in')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.ev-sr, .ev-sl, .ev-sr2').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const Events = () => {
  useReveal();

  // State for events (fetched from API)
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  // State for registration modal
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', rollNo: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/events`);
        if (!res.ok) throw new Error('Failed to fetch events');
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error('Error fetching events:', err);
        setFetchError('Unable to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Open registration modal
  const openModal = (event) => {
    setSelectedEvent(event);
    setFormData({ name: '', email: '', rollNo: '', phone: '' });
    setAlert({ show: false, type: '', message: '' });
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
    setAlert({ show: false, type: '', message: '' });
  };

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setAlert({ show: false, type: '', message: '' });

    try {
      const res = await fetch(`${API_BASE_URL}/api/events/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, eventId: selectedEvent._id }),
      });

      const data = await res.json();

      if (res.ok) {
        setAlert({ show: true, type: 'success', message: data.message });
        setFormData({ name: '', email: '', rollNo: '', phone: '' });
        // Auto-close after 3 seconds
        setTimeout(() => closeModal(), 3000);
      } else {
        setAlert({ show: true, type: 'error', message: data.message });
      }
    } catch (err) {
      setAlert({ show: true, type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="events-page scroll-smooth">
      <style>{styles}</style>
      <Header />

      <main>

        {/* ══ HERO — light centered ══ */}
        <section className="ev-hero">
          <div className="ev-ring-wrap">
            {[1, 2, 3, 4].map(i => <div key={i} className="ev-ring" />)}
          </div>

          <div className="ev-hero-left">

            <h1 className="ev-hero-title ev-sr ev-d2">
              Gatherings of
              <em>Wisdom.</em>
            </h1>
            <span className="ev-gold-rule ev-sr ev-d3" />
            <p className="ev-hero-sub ev-sr ev-d3">
              Our community comes alive through workshops, lectures, and
              celebrations that honour our heritage and explore the future.
            </p>
            <a href="#events" className="ev-hero-cta ev-sr ev-d4">
              View Events
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '.8rem', height: '.8rem' }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </section>

        {/* ══ QUOTE + STATS — horizontal two column ══ */}
        <div className="ev-mid">

          {/* QUOTE */}
          <div className="ev-mid-quote">
            <div className="ev-qlabel ev-sl ev-d1">Spirit of Inquiry</div>
            <blockquote className="ev-qtext ev-sl ev-d2">
              "The Science and Spirituality Club is more than just a regular student body — it is a platform where the timeless wisdom of the Mahabharata meets modern business ethics, and where the philosophy of Vivekananda inspires tomorrow's innovators."
            </blockquote>
            <p className="ev-qattr ev-sl ev-d3">Dr. Somanth Chattopadhyaya · Guest from iit Dhanabad</p>
          </div>

          {/* STATS */}
          <div className="ev-mid-stats">
            {[
              { num: '2020', label: 'Founded under NEP 2020' },
              { num: '6+', label: 'Annual programmes hosted' },
              { num: '200+', label: 'Students engaged yearly' },
              { num: '∞', label: 'Pursuit of knowledge' },
            ].map((s, i) => (
              <div key={i} className={`ev-stat-row ev-sr ev-d${i + 1}`}>
                <span className="ev-stat-num">{s.num}</span>
                <span className="ev-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══ UPCOMING EVENTS — sticky label + cards ══ */}
        <section className="ev-events-section" id="events">
          <div className="ev-events-inner">

            {/* Sticky left label */}
            <div className="ev-events-label">
              <span className="ev-label-eyebrow ev-sl ev-d1">What's Ahead</span>
              <h2 className="ev-label-title ev-sl ev-d2">
                Upcoming
                <em>Events</em>
              </h2>
              <span className="ev-label-rule ev-sl ev-d3" />
              <p className="ev-label-hint ev-sl ev-d3">
                Mark your calendars.<br />
                Transformative experiences await.
              </p>
            </div>

            {/* Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

              {/* Loading state */}
              {loading && (
                <div className="ev-loading">
                  <div className="ev-spinner" />
                  <span style={{ color: '#888', fontFamily: 'Lato, sans-serif', fontSize: '.9rem' }}>Loading events...</span>
                </div>
              )}

              {/* Error state */}
              {fetchError && (
                <div className="ev-no-events">{fetchError}</div>
              )}

              {/* No events */}
              {!loading && !fetchError && events.length === 0 && (
                <div className="ev-no-events">No upcoming events at the moment. Check back soon!</div>
              )}

              {/* Event cards */}
              {events.map((event, i) => (
                <div key={event._id || i} className="ev-card">
                  <div className="ev-date-col">
                    <span className="ev-date-month">{event.month}</span>
                    <span className="ev-date-day">{event.day}</span>
                    <div className="ev-date-sep" />
                    <span className="ev-date-time">{event.time}</span>
                  </div>
                  <div className="ev-card-body">
                    <div>
                      <span className="ev-card-tag">{event.tag}</span>
                      <h3 className="ev-card-title">{event.title}</h3>
                      <div className="ev-card-location">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                        </svg>
                        {event.location}
                      </div>
                      <p className="ev-card-desc">{event.description}</p>
                    </div>
                    <div className="ev-card-footer">
                      <button onClick={() => openModal(event)} className="ev-register-btn">
                        Register Now
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                      <span className="ev-card-badge">Open for Registrations</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ══ BOTTOM BAND ══ */}
        <div className="ev-bottom bg-[#FAEDD2]">
          <div className="ev-bottom-inner">
            <span>SNS Club · CIKS · NIT Calicut</span>
          </div>
        </div>

      </main>

      <Footer />

      {/* ══ REGISTRATION MODAL ══ */}
      {showModal && selectedEvent && (
        <div className="ev-modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="ev-modal">
            <div className="ev-modal-header">
              <h3>Register for Event</h3>
              <p>{selectedEvent.title} · {selectedEvent.month} {selectedEvent.day}</p>
            </div>

            {alert.show && (
              <div className={`ev-alert ev-alert-${alert.type}`}>
                {alert.type === 'success' ? '✅' : '⚠️'} {alert.message}
              </div>
            )}

            {alert.type !== 'success' && (
              <form onSubmit={handleSubmit}>
                <div className="ev-modal-body">
                  <div className="ev-form-group">
                    <label htmlFor="reg-name">Full Name</label>
                    <input
                      id="reg-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="ev-form-group">
                    <label htmlFor="reg-email">Email Address</label>
                    <input
                      id="reg-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <div className="ev-form-group">
                    <label htmlFor="reg-rollno">Roll Number</label>
                    <input
                      id="reg-rollno"
                      type="text"
                      name="rollNo"
                      value={formData.rollNo}
                      onChange={handleChange}
                      placeholder="e.g. B210001CS"
                      required
                    />
                  </div>
                  <div className="ev-form-group">
                    <label htmlFor="reg-phone">Phone Number</label>
                    <input
                      id="reg-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit phone number"
                      required
                      pattern="\d{10}"
                      title="Please enter a 10-digit phone number"
                    />
                  </div>
                </div>
                <div className="ev-modal-actions">
                  <button type="submit" className="ev-btn-submit" disabled={submitting}>
                    {submitting ? 'Registering...' : 'Submit Registration'}
                  </button>
                  <button type="button" className="ev-btn-cancel" onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {alert.type === 'success' && (
              <div className="ev-modal-actions">
                <button className="ev-btn-cancel" onClick={closeModal} style={{ flex: 1 }}>
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;