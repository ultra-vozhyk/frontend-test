import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './lib/apolloClient';
import { DailyReportPage } from './DailyReportPage';
import {  login } from './lib/user';

login('test1a@capmo.de', '123456qwerty');

function App() {
  return (
    <ApolloProvider client={apolloClient}><DailyReportPage /></ApolloProvider>
  );
}

export default App;
