// redux/Provider.tsx
"use client"
import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { store, AppStore } from './store';

const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = store();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
