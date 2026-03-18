
import React, { useState, useEffect } from 'react';
import '../styles/AdminDashboard.css';
import axios from 'axios';
import API_BASE_URL from '../config/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalDonors: 0,
    activeDonors: 0,
    totalRequests: 0,
    openRequests: 0,
  });

  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // 🔴🔴🔴 CHANGE START (Donor Delete)
  const handleDeleteDonor = async (id) => {
    const password = window.prompt("Enter password to delete:"); // 🟢 ADDED

    if (password !== "2006") { // 🟢 ADDED
      alert("❌ Wrong password");
      return;
    }

    // ❌ REMOVED: window.confirm(...)

    try {
      await axios.delete(`${API_BASE_URL}/api/donors/${id}`);
      setDonors(donors.filter((donor) => donor.id !== id));
      setStats(prev => ({ ...prev, totalDonors: prev.totalDonors - 1 }));

      alert("✅ Donor deleted successfully"); // 🟢 ADDED
    } catch (error) {
      console.error('Error deleting donor:', error);
      alert('❌ Failed to delete donor.');
    }
  };
  // 🔴🔴🔴 CHANGE END

  // 🔴🔴🔴 CHANGE START (Request Delete)
  const handleDeleteRequest = async (id) => {
    const password = window.prompt("Enter password to close request:"); // 🟢 ADDED

    if (password !== "2006") { // 🟢 ADDED
      alert("❌ Wrong password");
      return;
    }

    // ❌ REMOVED: window.confirm(...)

    try {
      await axios.delete(`${API_BASE_URL}/api/emergency-requests/${id}`);
      setRequests(requests.filter((request) => request.id !== id));
      setStats(prev => ({ ...prev, totalRequests: prev.totalRequests - 1 }));

      alert("✅ Request closed successfully"); // 🟢 ADDED
    } catch (error) {
      console.error('Error deleting request:', error);
      alert('❌ Failed to close request.');
    }
  };
  // 🔴🔴🔴 CHANGE END

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donorsResponse = await axios.get(`${API_BASE_URL}/api/donors`);
        const requestsResponse = await axios.get(
          `${API_BASE_URL}/api/emergency-requests`
        );

        const totalDonors = donorsResponse.data.length;
        const activeDonors = donorsResponse.data.filter((d) => d.available).length;
        const totalRequests = requestsResponse.data.length;
        const openRequests = requestsResponse.data.filter(
          (r) => r.status === 'OPEN'
        ).length;

        setStats({
          totalDonors,
          activeDonors,
          totalRequests,
          openRequests,
        });

        setDonors(donorsResponse.data);
        setRequests(requestsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>🧑‍⚕️ Admin Dashboard</h1>
        <p>Blood Donor Management System</p>
      </div>

      <div className="admin-nav">
        <button
          className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button
          className={`nav-btn ${activeTab === 'donors' ? 'active' : ''}`}
          onClick={() => setActiveTab('donors')}
        >
          👥 Donors
        </button>
        <button
          className={`nav-btn ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          🚨 Requests
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading data...</div>
      ) : (
        <>
          {activeTab === 'dashboard' && (
            <div className="dashboard-content">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-details">
                    <h3>Total Donors</h3>
                    <p className="stat-number">{stats.totalDonors}</p>
                  </div>
                </div>

                <div className="stat-card active">
                  <div className="stat-icon">✓</div>
                  <div className="stat-details">
                    <h3>Active Donors</h3>
                    <p className="stat-number">{stats.activeDonors}</p>
                  </div>
                </div>

                <div className="stat-card emergency">
                  <div className="stat-icon">🚨</div>
                  <div className="stat-details">
                    <h3>Open Requests</h3>
                    <p className="stat-number">{stats.openRequests}</p>
                  </div>
                </div>

                <div className="stat-card total">
                  <div className="stat-icon">📋</div>
                  <div className="stat-details">
                    <h3>Total Requests</h3>
                    <p className="stat-number">{stats.totalRequests}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'donors' && (
            <div className="donors-content">
              <h2>All Registered Donors</h2>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Blood Group</th>
                      <th>City</th>
                      <th>Phone</th>
                      <th>Available</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donors.map((donor) => (
                      <tr key={donor.id}>
                        <td>{donor.name}</td>
                        <td>
                          <span className="blood-badge">{donor.bloodGroup}</span>
                        </td>
                        <td>{donor.city}</td>
                        <td>{donor.phone}</td>
                        <td>
                          {donor.available ? (
                            <span className="badge available">Available</span>
                          ) : (
                            <span className="badge unavailable">Not Available</span>
                          )}
                        </td>
                        <td>
                          <button className="action-btn">View</button>
                          <button
                            className="action-btn delete"
                            onClick={() => handleDeleteDonor(donor.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="requests-content">
              <h2>Emergency Blood Requests</h2>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Blood Group</th>
                      <th>Hospital</th>
                      <th>Units</th>
                      <th>Urgency</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request) => (
                      <tr key={request.id}>
                        <td>{request.patientName}</td>
                        <td>
                          <span className="blood-badge">
                            {request.bloodGroup}
                          </span>
                        </td>
                        <td>{request.hospitalName}</td>
                        <td>{request.requiredUnits}</td>
                        <td>
                          <span className={`urgency ${request.urgencyLevel.toLowerCase()}`}>
                            {request.urgencyLevel}
                          </span>
                        </td>
                        <td>
                          <span className={`status ${request.status.toLowerCase()}`}>
                            {request.status}
                          </span>
                        </td>
                        <td>
                          <button className="action-btn">View</button>
                          <button
                            className="action-btn delete"
                            onClick={() => handleDeleteRequest(request.id)}
                          >
                            Close
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;