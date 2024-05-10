'use client';
import React, { useState } from 'react';

const TakeAction = ({ onClose } :any) => {
  const [remark, setRemark] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = () => {
    // Handle submit logic here
    console.log('Remark:', remark);
    console.log('Status:', status);
    onClose(); // Close the pop-up box
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Pop-Up Box</h2>
        <div>
          <label htmlFor="remark">Remark:</label>
          <input
            type="text"
            id="remark"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default TakeAction;
