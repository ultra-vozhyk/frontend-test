import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './lib/apolloClient';
import { DailyReportPage } from './DailyReportPage';
import {  login } from './lib/user';

login('test1a@capmo.de', '123456qwerty');

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <DailyReportPage 
        projectId="a5b60f3a-8e94-11ea-be39-b300a4e40f96"
        date="2020-11-08"
      />
    </ApolloProvider>
  );
}

export default App;
