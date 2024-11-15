import React from 'react';

export interface contextType {
  children: React.ReactNode;
}

export interface userType {
  userId: number;
  role: string;
  exp: number;
}

export interface UserContextValue {
  user: userType | null;
  token: string | null;
  setUser: (user: userType | null) => void;
  setTokenToLocal: (token: string) => void;
}
