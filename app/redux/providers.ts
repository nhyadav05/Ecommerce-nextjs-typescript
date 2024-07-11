// redux/providers.ts
"use client"
// app/redux/providers.ts

import React from 'react';
import { Provider } from 'react-redux';
import store from './store'; // Adjust the path as necessary

const Providers: React.FC = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;



