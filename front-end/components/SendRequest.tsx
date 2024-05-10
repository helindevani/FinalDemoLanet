'use client';
import React, { useState } from 'react';
import Cookies from 'js-cookie';

const SendRequest: React.FC = () => {
  const [description, setDescription] = useState('');
  const [requestTypeName, setRequestTypeName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = Cookies.get('token');

    if (!token) {
      setError('JWT token not found');
      return;
    }

    const decodedToken = parseJwt(token);
    const userId = decodedToken ? decodedToken.sub : null;

    if (!userId) {
      setError('User ID not found in token');
      return;
    }
    const data = { Description: description, RequestTypeName:requestTypeName,Id :userId };
 
    try {
      const response = await fetch('http://localhost:5057/api/AdminRequests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Request submitted successfully');
      } else {
        setError('Failed to submit request');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      setError('Error submitting request');
    }
  };

  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Send a Request</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label htmlFor="requestTypeName" className="block text-sm font-medium mb-2">Request Type</label>
          <input
            type="text"
            id="requestTypeName"
            name="requestTypeName"
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400"
            value={requestTypeName}
            onChange={(e) => setRequestTypeName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendRequest;



