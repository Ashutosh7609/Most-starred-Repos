import React from 'react';
import ReposList from './components/ReposList';
import { Typography, Container, CssBaseline } from '@mui/material';
import './App.css';

// Main App component
function App() {
  return (
    <div>
      <CssBaseline />
      <Container>
        <Typography variant="h3" className="repo-header">Most Starred Repos</Typography>
        <div style={{ display: 'flex' }}>
          <ReposList />
        </div>
      </Container>
    </div>
  );
}

export default App;
