import React from 'react';
import { useauthstore } from '../store/store';
export default function UserProfile() {
  const {user} = useauthstore();
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">User Profile Page</h1>
      {user?.name && <p>Name: {user.name}</p>}
      {user?.email && <p>Email: {user.email}</p>}
      {user?.role && <p>Role: {user.role}</p>}
      {user?.fcmToken && <p>FCM Token: {user.fcmToken}</p>}
      {user?._id && <p>ID: {user._id}</p>}
      
    </div>
  );
}
