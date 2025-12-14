import { useState, useEffect } from 'react';
import axios from 'axios';
import { Phone, Mail, Calendar, MapPin, ExternalLink, RefreshCw } from 'lucide-react';
import './App.css'; // We will write simple CSS next

interface Booking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  location: string;
  details: string;
  createdAt: string;
}

function App() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const fetchBookings = () => {
    setLoading(true);
    axios.get('http://localhost:5000/api/bookings')
      .then(res => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isAuthenticated) fetchBookings();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') setIsAuthenticated(true);
    else alert('Wrong Password');
  };

  // This opens your MAIN website in a new tab to make a booking
  const handleMakeBooking = () => {
    window.open('http://localhost:5173/book', '_blank');
  };

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <form onSubmit={handleLogin} className="card">
          <h1>🔒 Admin Login</h1>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="Enter Password"
          />
          <button type="submit">Access Dashboard</button>
        </form>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header>
        <h1>Smith Studio Admin</h1>
        <div className="actions">
          <button onClick={fetchBookings} className="btn-secondary">
            <RefreshCw size={16} /> Refresh
          </button>
          <button onClick={handleMakeBooking} className="btn-primary">
            <ExternalLink size={16} /> Make New Booking
          </button>
        </div>
      </header>

      <main>
        <div className="stats-row">
          <div className="stat-card">
            <h3>Total Bookings</h3>
            <p>{bookings.length}</p>
          </div>
          <div className="stat-card">
            <h3>Upcoming</h3>
            <p>{bookings.filter(b => new Date(b.date) >= new Date()).length}</p>
          </div>
        </div>

        <div className="table-container">
          {loading ? (
            <p>Loading data...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Service Details</th>
                  <th>Date & Location</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b._id}>
                    <td>
                      <strong>{b.name}</strong>
                      <div className="row"><Mail size={12}/> {b.email}</div>
                      <div className="row"><Phone size={12}/> {b.phone}</div>
                    </td>
                    <td>
                      <span className="badge">{b.service}</span>
                    </td>
                    <td>
                      <div className="row"><Calendar size={14}/> {b.date}</div>
                      <div className="row"><MapPin size={14}/> {b.location}</div>
                    </td>
                    <td>
                      <p className="details">{b.details || "No notes"}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;