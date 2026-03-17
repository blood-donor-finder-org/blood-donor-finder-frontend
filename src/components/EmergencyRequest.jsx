import React, { useState } from 'react';
import '../styles/EmergencyRequest.css';
import axios from 'axios';
import API_BASE_URL from '../config/api';

const EmergencyRequest = () => {
  const [formData, setFormData] = useState({
    bloodGroup: '',
    requiredUnits: '',
    hospitalName: '',
    hospitalLocation: '',
    patientName: '',
    patientAge: '',
    medicalCondition: '',
    urgencyLevel: 'HIGH',
    contactPerson: '',
    contactPhone: '',
    additionalInfo: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const requiredByHours =
        formData.urgencyLevel === 'CRITICAL' ? 2 :
        formData.urgencyLevel === 'HIGH' ? 6 :
        formData.urgencyLevel === 'MEDIUM' ? 12 : 24;

      const requiredByDate = new Date();
      requiredByDate.setHours(requiredByDate.getHours() + requiredByHours);
      const requiredBy = requiredByDate.toISOString().slice(0, 19);

      const payload = {
        patientName: formData.patientName,
        bloodGroup: formData.bloodGroup,
        unitsRequired: Number(formData.requiredUnits),
        hospitalName: formData.hospitalName,
        hospitalAddress: formData.hospitalLocation,
        city: formData.hospitalLocation,
        contactPerson: formData.contactPerson,
        contactNumber: formData.contactPhone,
        requiredBy,
        additionalInfo: formData.additionalInfo,
      };

      await axios.post(`${API_BASE_URL}/api/emergency-requests`, payload);
      setMessage('🚨 Emergency request created! Donors will be notified.');
      setFormData({
        bloodGroup: '',
        requiredUnits: '',
        hospitalName: '',
        hospitalLocation: '',
        patientName: '',
        patientAge: '',
        medicalCondition: '',
        urgencyLevel: 'HIGH',
        contactPerson: '',
        contactPhone: '',
        additionalInfo: '',
      });
      setTimeout(() => setMessage(''), 4000);
    } catch (_error) {
      console.error('Failed to create emergency request:', _error);
      const backendError = _error?.response?.data?.message;
      setMessage(backendError ? `❌ ${backendError}` : '❌ Failed to create request. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="emergency-request">
      <div className="emergency-wrapper">
        <div className="emergency-card">
          <div className="emergency-header">
            <h2>🚨 Emergency Blood Request</h2>
            <p>Save Lives Now</p>
            <div className="pulse-animation"></div>
          </div>

          <form onSubmit={handleSubmit} className="emergency-form">
            {/* Blood Details */}
            <div className="form-section">
              <h3>🩸 Blood Requirements</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="em-bloodGroup">Blood Group *</label>
                  <select
                    id="em-bloodGroup"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Blood Group</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="requiredUnits">Units Required *</label>
                  <input
                    id="requiredUnits"
                    type="number"
                    name="requiredUnits"
                    value={formData.requiredUnits}
                    onChange={handleChange}
                    min="1"
                    placeholder="e.g., 2"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Hospital Details */}
            <div className="form-section">
              <h3>🏥 Hospital Details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="hospitalName">Hospital Name *</label>
                  <input
                    id="hospitalName"
                    type="text"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleChange}
                    placeholder="Enter hospital name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="hospitalLocation">Location *</label>
                  <input
                    id="hospitalLocation"
                    type="text"
                    name="hospitalLocation"
                    value={formData.hospitalLocation}
                    onChange={handleChange}
                    placeholder="Enter hospital location"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Patient Details */}
            <div className="form-section">
              <h3>👤 Patient Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="patientName">Patient Name *</label>
                  <input
                    id="patientName"
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    placeholder="Enter patient name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="patientAge">Age *</label>
                  <input
                    id="patientAge"
                    type="number"
                    name="patientAge"
                    value={formData.patientAge}
                    onChange={handleChange}
                    min="0"
                    placeholder="Enter age"
                    required
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="medicalCondition">Medical Condition *</label>
                <textarea
                  id="medicalCondition"
                  name="medicalCondition"
                  value={formData.medicalCondition}
                  onChange={handleChange}
                  placeholder="Describe the medical condition"
                  rows="3"
                  required
                ></textarea>
              </div>
            </div>

            {/* Urgency & Contact */}
            <div className="form-section">
              <h3>⚠️ Urgency & Contact</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="urgencyLevel">Urgency Level *</label>
                  <select
                    id="urgencyLevel"
                    name="urgencyLevel"
                    value={formData.urgencyLevel}
                    onChange={handleChange}
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="CRITICAL">Critical</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="contactPerson">Contact Person *</label>
                  <input
                    id="contactPerson"
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    placeholder="Name of contact person"
                    required
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="contactPhone">Contact Phone *</label>
                <input
                  id="contactPhone"
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="10-digit phone number"
                  pattern="[0-9]{10}"
                  required
                />
              </div>
            </div>

            {/* Additional Info */}
            <div className="form-group full-width">
              <label htmlFor="additionalInfo">Additional Information</label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Any additional details"
                rows="2"
              ></textarea>
            </div>

            <button type="submit" className="submit-btn emergency-btn" disabled={loading}>
              {loading ? '⏳ Sending...' : '🚨 Send Emergency Request'}
            </button>
          </form>

          {message && <div className="message emergency-message">{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default EmergencyRequest;
