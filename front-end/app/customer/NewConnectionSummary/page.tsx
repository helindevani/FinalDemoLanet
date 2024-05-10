'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Sidebar from '@/components/Sidebar';

const MaritalStatus= {
  0 :'Single',
  1 : 'Married',
  2 : 'Divorced',
  3 : 'Widowed'
}

const Nationality = {
  0 : 'Indian',
  1 : 'Non Indian'
}

const RelatedType= {
  0 : 'Spouse',
  1 : 'Father',
}

const BookingStatus = {
  0 : 'Pending',
  1 : 'Approved',
  2 : 'Rejected',
}

interface NewConnectionFormDTO {
  connectionNo: number | null;
  name: string;
  email: string;
  dob: string;
  maritalStatus: string;
  mobileNo: string;
  gender: string;
  nationality: string;
  address: string;
  appliedDate: string;
  addressProof: string;
  rationCardNo: string;
  connectionStatus: string;
  related: string;
  firstName: string;
  lastName: string;
  relatedAddress: string;
  city: string;
  pinCode: string;
}

const UserSummaryReport: React.FC = () => {
  const [userData, setUserData] = useState<NewConnectionFormDTO[]>([]);

  useEffect(() => {
    axios.get<any[]>('http://localhost:5057/api/NewConnectionForms',{
      headers :{
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    })
      .then(response => {
        // Transform data to match the expected shape
        const transformedData = response.data.map(item => ({
          connectionNo: item.connectionNo,
          name: item.name,
          email: item.email,
          dob: new Date(item.dob).toLocaleDateString(),
          maritalStatus: MaritalStatus[item.maritalStatus as keyof typeof MaritalStatus],
          mobileNo: item.mobileNo,
          gender: item.gender,
          nationality: Nationality[item.nationality as keyof typeof Nationality],
          address: item.address,
          appliedDate: new Date(item.appliedDate).toLocaleDateString(),
          addressProof: item.addressProof,
          rationCardNo: item.rationCardNo,
          connectionStatus: BookingStatus[item.connectionStatus as keyof typeof BookingStatus],
          related: RelatedType[item.related as keyof typeof RelatedType],
          firstName: item.firstName,
          lastName: item.lastName,
          relatedAddress: item.relatedAddress,
          city: item.city,
          pinCode: item.pinCode
        }));
        setUserData(transformedData);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <Sidebar>
    <div>
      <h2>User Summary Report</h2>
      {userData.map((user, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <p><strong>Connection No:</strong> {user.connectionNo}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Date of Birth:</strong> {user.dob}</p>
          <p><strong>Marital Status:</strong> {user.maritalStatus}</p>
          <p><strong>Mobile No:</strong> {user.mobileNo}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Nationality:</strong> {user.nationality}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Applied Date:</strong> {user.appliedDate}</p>
          <p><strong>Address Proof:</strong> <Link href={user.addressProof}>View Document</Link></p>
          <p><strong>Ration Card No:</strong> {user.rationCardNo}</p>
          <p><strong>Connection Status:</strong> {user.connectionStatus}</p>
          <p><strong>Related:</strong> {user.related}</p>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Related Address:</strong> {user.relatedAddress}</p>
          <p><strong>City:</strong> {user.city}</p>
          <p><strong>Pin Code:</strong> {user.pinCode}</p>
        </div>
      ))}
    </div>
    </Sidebar>
  );
}

export default UserSummaryReport;
