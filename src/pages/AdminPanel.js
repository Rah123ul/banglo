import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const adminStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Cinzel:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');

  .adm-wrap {
    min-height: 100vh;
    background: #f7f1e8;
  }
  .adm-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 3rem 1.5rem 5rem;
  }

  /* ── Login Screen ── */
  .adm-login {
    display: flex; align-items: center; justify-content: center;
    min-height: 60vh;
  }
  .adm-login-card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 8px 40px rgba(74,29,29,.1);
    padding: 3rem 2.5rem;
    max-width: 380px; width: 100%;
    text-align: center;
  }
  .adm-login-card h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem; font-weight: 700;
    color: #4a1d1d; margin: 0 0 .4rem;
  }
  .adm-login-card p {
    font-family: 'Lato', sans-serif;
    font-size: .85rem; color: #888;
    margin: 0 0 2rem;
  }
  .adm-login-input {
    width: 100%; padding: .85rem 1rem;
    border: 1px solid rgba(74,29,29,.2);
    border-radius: 4px;
    font-family: 'Lato', sans-serif; font-size: .9rem;
    outline: none; margin-bottom: 1rem;
    box-sizing: border-box;
    transition: border-color .3s;
  }
  .adm-login-input:focus { border-color: #7c1d1d; }

  .adm-login-btn {
    width: 100%; padding: .9rem;
    background: #7c1d1d; color: #fff;
    border: none; border-radius: 4px;
    font-family: 'Cinzel', serif; font-size: .7rem;
    letter-spacing: .18em; text-transform: uppercase;
    cursor: pointer; transition: background .3s;
  }
  .adm-login-btn:hover { background: #5a1414; }

  .adm-login-error {
    color: #991b1b; font-size: .82rem;
    margin-bottom: 1rem;
    font-family: 'Lato', sans-serif;
  }

  /* ── Dashboard Header ── */
  .adm-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 2.5rem; flex-wrap: wrap; gap: 1rem;
  }
  .adm-header h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem; font-weight: 700;
    color: #4a1d1d; margin: 0;
  }
  .adm-logout-btn {
    padding: .6rem 1.4rem;
    background: transparent;
    color: #7c1d1d; border: 1px solid rgba(124,29,29,.3);
    border-radius: 4px;
    font-family: 'Cinzel', serif; font-size: .6rem;
    letter-spacing: .15em; text-transform: uppercase;
    cursor: pointer; transition: all .3s;
  }
  .adm-logout-btn:hover { background: #7c1d1d; color: #fff; }

  /* ── Stats Row ── */
  .adm-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.2rem; margin-bottom: 2.5rem;
  }
  .adm-stat-card {
    background: #fff;
    border-radius: 6px;
    padding: 1.5rem;
    box-shadow: 0 2px 12px rgba(74,29,29,.06);
    border-left: 3px solid #7c1d1d;
  }
  .adm-stat-card h3 {
    font-family: 'Lato', sans-serif;
    font-size: .7rem; letter-spacing: .1em;
    text-transform: uppercase; color: #888;
    margin: 0 0 .5rem;
  }
  .adm-stat-card .adm-stat-val {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem; font-weight: 700;
    color: #4a1d1d;
  }

  /* ── Section Tabs ── */
  .adm-tabs {
    display: flex; gap: 0; margin-bottom: 2rem;
    border-bottom: 2px solid rgba(124,29,29,.1);
  }
  .adm-tab {
    padding: .8rem 1.6rem;
    background: transparent; border: none;
    font-family: 'Cinzel', serif; font-size: .65rem;
    letter-spacing: .15em; text-transform: uppercase;
    color: #888; cursor: pointer;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px; transition: all .3s;
  }
  .adm-tab:hover { color: #4a1d1d; }
  .adm-tab.active {
    color: #7c1d1d;
    border-bottom-color: #7c1d1d;
  }

  /* ── Table ── */
  .adm-table-wrap {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 16px rgba(74,29,29,.06);
    overflow-x: auto;
  }
  .adm-table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Lato', sans-serif;
    font-size: .85rem;
  }
  .adm-table th {
    background: #4a1d1d; color: #fff;
    padding: 1rem 1.2rem;
    text-align: left;
    font-family: 'Cinzel', serif;
    font-size: .6rem; letter-spacing: .12em;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .adm-table td {
    padding: .9rem 1.2rem;
    border-bottom: 1px solid rgba(74,29,29,.06);
    color: #333;
  }
  .adm-table tr:hover td {
    background: rgba(124,29,29,.02);
  }
  .adm-table .adm-del-btn {
    padding: .35rem .8rem;
    background: transparent;
    color: #991b1b;
    border: 1px solid rgba(153,27,27,.25);
    border-radius: 3px;
    font-size: .7rem; cursor: pointer;
    transition: all .3s;
  }
  .adm-table .adm-del-btn:hover {
    background: #991b1b; color: #fff;
  }

  .adm-empty {
    text-align: center; padding: 3rem;
    color: #888; font-size: .9rem;
  }

  /* ── Create Event Form ── */
  .adm-create-form {
    background: #fff;
    border-radius: 8px; padding: 2rem;
    box-shadow: 0 2px 16px rgba(74,29,29,.06);
  }
  .adm-create-form h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem; font-weight: 700;
    color: #4a1d1d; margin: 0 0 1.5rem;
  }
  .adm-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem 1.5rem;
  }
  @media(max-width:600px){ .adm-form-grid{ grid-template-columns:1fr; } }

  .adm-form-grid .adm-fg-full {
    grid-column: 1 / -1;
  }
  .adm-fg label {
    display: block;
    font-family: 'Cinzel', serif; font-size: .58rem;
    letter-spacing: .15em; text-transform: uppercase;
    color: #4a1d1d; margin-bottom: .4rem; font-weight: 600;
  }
  .adm-fg input, .adm-fg textarea {
    width: 100%; padding: .7rem .9rem;
    border: 1px solid rgba(74,29,29,.18);
    border-radius: 4px;
    font-family: 'Lato', sans-serif; font-size: .85rem;
    outline: none; transition: border-color .3s;
    box-sizing: border-box;
  }
  .adm-fg textarea { resize: vertical; min-height: 80px; }
  .adm-fg input:focus, .adm-fg textarea:focus { border-color: #7c1d1d; }

  .adm-create-btn {
    margin-top: 1.5rem;
    padding: .8rem 2rem;
    background: #7c1d1d; color: #fff;
    border: none; border-radius: 4px;
    font-family: 'Cinzel', serif; font-size: .65rem;
    letter-spacing: .15em; text-transform: uppercase;
    cursor: pointer; transition: background .3s;
  }
  .adm-create-btn:hover { background: #5a1414; }
  .adm-create-btn:disabled { background: #aaa; cursor: not-allowed; }

  .adm-alert {
    padding: .8rem 1.2rem; border-radius: 5px;
    margin-bottom: 1.5rem; font-size: .82rem;
    font-family: 'Lato', sans-serif;
  }
  .adm-alert-success { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }
  .adm-alert-error { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }

  /* ── Event list in admin ── */
  .adm-event-badge {
    display: inline-block;
    padding: .2rem .6rem;
    background: rgba(124,29,29,.08);
    color: #7c1d1d;
    border-radius: 3px;
    font-size: .7rem; font-weight: 600;
  }

  /* ── Filter dropdown ── */
  .adm-filter {
    display: flex; align-items: center; gap: .8rem;
    margin-bottom: 1.5rem; flex-wrap: wrap;
  }
  .adm-filter label {
    font-family: 'Cinzel', serif; font-size: .6rem;
    letter-spacing: .12em; text-transform: uppercase;
    color: #666;
  }
  .adm-filter select {
    padding: .5rem 1rem;
    border: 1px solid rgba(74,29,29,.2);
    border-radius: 4px;
    font-family: 'Lato', sans-serif; font-size: .82rem;
    outline: none; background: #fff;
  }
`;

const AdminPanel = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const [activeTab, setActiveTab] = useState('registrations');
    const [events, setEvents] = useState([]);
    const [registrations, setRegistrations] = useState([]);
    const [selectedEventFilter, setSelectedEventFilter] = useState('all');
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });

    // Create event form
    const [newEvent, setNewEvent] = useState({
        title: '', month: '', day: '', time: '', location: '', description: '', tag: ''
    });
    const [creating, setCreating] = useState(false);

    const adminPassword = authenticated ? password : '';

    // Login
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            const data = await res.json();
            if (data.authenticated) {
                setAuthenticated(true);
            } else {
                setLoginError('Invalid password. Please try again.');
            }
        } catch (err) {
            setLoginError('Network error. Is the server running?');
        }
    };

    // Fetch data
    const fetchData = async () => {
        try {
            const headers = { 'x-admin-password': password };
            const evRes = await fetch(`${API_BASE_URL}/api/admin/events`, { headers });
            if (evRes.ok) setEvents(await evRes.json());
        } catch (err) {
            console.error('Error fetching admin data:', err);
        }
    };

    useEffect(() => {
        if (authenticated) fetchData();
        // eslint-disable-next-line
    }, [authenticated]);

    const fetchRegistrations = async () => {
        try {
            const headers = { 'x-admin-password': password };
            const endpoint = selectedEventFilter === 'all' 
                ? `${API_BASE_URL}/api/admin/registrations`
                : `${API_BASE_URL}/api/admin/registrations/${selectedEventFilter}`;
            const regRes = await fetch(endpoint, { headers });
            if (regRes.ok) setRegistrations(await regRes.json());
        } catch (err) {
            console.error('Error fetching registrations:', err);
        }
    };

    useEffect(() => {
        if (authenticated) fetchRegistrations();
        // eslint-disable-next-line
    }, [selectedEventFilter, authenticated]);


    // Delete registration
    const deleteRegistration = async (id) => {
        if (!window.confirm('Are you sure you want to delete this registration?')) return;
        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/registrations/${id}`, {
                method: 'DELETE',
                headers: { 'x-admin-password': password },
            });
            if (res.ok) {
                setRegistrations(registrations.filter((r) => r._id !== id));
                setAlert({ show: true, type: 'success', message: 'Registration deleted.' });
                setTimeout(() => setAlert({ show: false, type: '', message: '' }), 3000);
            }
        } catch (err) {
            setAlert({ show: true, type: 'error', message: 'Error deleting registration.' });
        }
    };

    // Delete event
    const deleteEvent = async (id) => {
        if (!window.confirm('Delete this event and ALL its registrations?')) return;
        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/events/${id}`, {
                method: 'DELETE',
                headers: { 'x-admin-password': password },
            });
            if (res.ok) {
                fetchData();
                setAlert({ show: true, type: 'success', message: 'Event and registrations deleted.' });
                setTimeout(() => setAlert({ show: false, type: '', message: '' }), 3000);
            }
        } catch (err) {
            setAlert({ show: true, type: 'error', message: 'Error deleting event.' });
        }
    };

    // Create event
    const handleCreateEvent = async (e) => {
        e.preventDefault();
        setCreating(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/admin/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-password': password,
                },
                body: JSON.stringify(newEvent),
            });
            const data = await res.json();
            if (res.ok) {
                setNewEvent({ title: '', month: '', day: '', time: '', location: '', description: '', tag: '' });
                fetchData();
                setAlert({ show: true, type: 'success', message: 'Event created successfully!' });
                setTimeout(() => setAlert({ show: false, type: '', message: '' }), 3000);
            } else {
                setAlert({ show: true, type: 'error', message: data.message });
            }
        } catch (err) {
            setAlert({ show: true, type: 'error', message: 'Error creating event.' });
        } finally {
            setCreating(false);
        }
    };

    // Filter registrations
    const filteredRegistrations = registrations; // now filtered by backend

    // Total counts
    const totalRegistrations = registrations.length;
    const totalEvents = events.length;

    // ── LOGIN SCREEN ──
    if (!authenticated) {
        return (
            <div className="adm-wrap">
                <style>{adminStyles}</style>
                <Header />
                <div className="adm-login">
                    <form className="adm-login-card" onSubmit={handleLogin}>
                        <h2>Admin Panel</h2>
                        <p>Enter the admin password to continue</p>
                        {loginError && <div className="adm-login-error">{loginError}</div>}
                        <input
                            type="password"
                            className="adm-login-input"
                            placeholder="Enter admin password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="adm-login-btn">Login</button>
                    </form>
                </div>
                <Footer />
            </div>
        );
    }

    // ── DASHBOARD ──
    return (
        <div className="adm-wrap">
            <style>{adminStyles}</style>
            <Header />
            <div className="adm-container">

                {/* Header */}
                <div className="adm-header">
                    <h1>Admin Dashboard</h1>
                    <button className="adm-logout-btn" onClick={() => { setAuthenticated(false); setPassword(''); }}>
                        Logout
                    </button>
                </div>

                {/* Alert */}
                {alert.show && (
                    <div className={`adm-alert adm-alert-${alert.type}`}>
                        {alert.type === 'success' ? '✅' : '⚠️'} {alert.message}
                    </div>
                )}

                {/* Stats */}
                <div className="adm-stats">
                    <div className="adm-stat-card">
                        <h3>Total Events</h3>
                        <div className="adm-stat-val">{totalEvents}</div>
                    </div>
                    <div className="adm-stat-card">
                        <h3>Total Registrations</h3>
                        <div className="adm-stat-val">{totalRegistrations}</div>
                    </div>
                    <div className="adm-stat-card">
                        <h3>Active Events</h3>
                        <div className="adm-stat-val">{events.filter(e => e.isActive).length}</div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="adm-tabs">
                    <button
                        className={`adm-tab ${activeTab === 'registrations' ? 'active' : ''}`}
                        onClick={() => setActiveTab('registrations')}
                    >
                        Registrations
                    </button>
                    <button
                        className={`adm-tab ${activeTab === 'events' ? 'active' : ''}`}
                        onClick={() => setActiveTab('events')}
                    >
                        Events
                    </button>
                    <button
                        className={`adm-tab ${activeTab === 'create' ? 'active' : ''}`}
                        onClick={() => setActiveTab('create')}
                    >
                        Create Event
                    </button>
                </div>

                {/* ── REGISTRATIONS TAB ── */}
                {activeTab === 'registrations' && (
                    <>
                        <div className="adm-filter">
                            <label>Filter by Event:</label>
                            <select value={selectedEventFilter} onChange={(e) => setSelectedEventFilter(e.target.value)}>
                                <option value="all">All Events</option>
                                {events.map((ev) => (
                                    <option key={ev._id} value={ev._id}>{ev.title}</option>
                                ))}
                            </select>
                        </div>

                        <div className="adm-table-wrap">
                            {filteredRegistrations.length === 0 ? (
                                <div className="adm-empty">No registrations found.</div>
                            ) : (
                                <table className="adm-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Roll No</th>
                                            <th>Phone</th>
                                            <th>Event</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredRegistrations.map((reg, i) => (
                                            <tr key={reg._id}>
                                                <td>{i + 1}</td>
                                                <td>{reg.name}</td>
                                                <td>{reg.email}</td>
                                                <td>{reg.rollNo}</td>
                                                <td>{reg.phone}</td>
                                                <td>{reg.eventId ? reg.eventId.title : 'N/A'}</td>
                                                <td>{new Date(reg.createdAt).toLocaleDateString()}</td>
                                                <td>
                                                    <button className="adm-del-btn" onClick={() => deleteRegistration(reg._id)}>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </>
                )}

                {/* ── EVENTS TAB ── */}
                {activeTab === 'events' && (
                    <div className="adm-table-wrap">
                        {events.length === 0 ? (
                            <div className="adm-empty">No events found.</div>
                        ) : (
                            <table className="adm-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>Date</th>
                                        <th>Location</th>
                                        <th>Registrations</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map((ev, i) => (
                                        <tr key={ev._id}>
                                            <td>{i + 1}</td>
                                            <td style={{ fontWeight: 600 }}>{ev.title}</td>
                                            <td>{ev.month} {ev.day}, {ev.time}</td>
                                            <td>{ev.location}</td>
                                            <td><span className="adm-event-badge">{ev.registrationCount || 0}</span></td>
                                            <td>{ev.isActive ? '✅ Active' : '❌ Inactive'}</td>
                                            <td>
                                                <button className="adm-del-btn" onClick={() => deleteEvent(ev._id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}

                {/* ── CREATE EVENT TAB ── */}
                {activeTab === 'create' && (
                    <form className="adm-create-form" onSubmit={handleCreateEvent}>
                        <h3>Create New Event</h3>
                        <div className="adm-form-grid">
                            <div className="adm-fg adm-fg-full">
                                <label>Event Title</label>
                                <input
                                    type="text" required
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                    placeholder="e.g. Bhagavad Gita Workshop"
                                />
                            </div>
                            <div className="adm-fg">
                                <label>Month</label>
                                <input
                                    type="text" required
                                    value={newEvent.month}
                                    onChange={(e) => setNewEvent({ ...newEvent, month: e.target.value.toUpperCase() })}
                                    placeholder="e.g. MARCH"
                                />
                            </div>
                            <div className="adm-fg">
                                <label>Day</label>
                                <input
                                    type="text" required
                                    value={newEvent.day}
                                    onChange={(e) => setNewEvent({ ...newEvent, day: e.target.value })}
                                    placeholder="e.g. 18"
                                />
                            </div>
                            <div className="adm-fg">
                                <label>Time</label>
                                <input
                                    type="text" required
                                    value={newEvent.time}
                                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                                    placeholder="e.g. Wednesday · 2:00 PM"
                                />
                            </div>
                            <div className="adm-fg">
                                <label>Tag / Category</label>
                                <input
                                    type="text"
                                    value={newEvent.tag}
                                    onChange={(e) => setNewEvent({ ...newEvent, tag: e.target.value })}
                                    placeholder="e.g. Spiritual Programme"
                                />
                            </div>
                            <div className="adm-fg adm-fg-full">
                                <label>Location</label>
                                <input
                                    type="text" required
                                    value={newEvent.location}
                                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                                    placeholder="e.g. NIT Calicut Campus"
                                />
                            </div>
                            <div className="adm-fg adm-fg-full">
                                <label>Description</label>
                                <textarea
                                    required
                                    value={newEvent.description}
                                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                    placeholder="Event description..."
                                />
                            </div>
                        </div>
                        <button type="submit" className="adm-create-btn" disabled={creating}>
                            {creating ? 'Creating...' : 'Create Event'}
                        </button>
                    </form>
                )}

            </div>
            <Footer />
        </div>
    );
};

export default AdminPanel;
