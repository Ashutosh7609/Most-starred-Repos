// src/components/ReposList.js
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRepos, selectRepo } from '../app/reducers/repoReducer';
import { List } from '@mui/material';
import RepoItem from './RepoItem';
import Loader from './Loader';
import InfiniteScroll from 'react-infinite-scroll-component'; // Import react-infinite-scroll-component

// Component to display a list of repositories
const ReposList = () => {
  const dispatch = useDispatch();
  const [timePeriod, setTimePeriod] = useState('1 month');
  const [page, setPage] = useState(1);
  const repos = useSelector((state) => state.repo.repos);
  const loading = useSelector((state) => state.repo.loading);
  const error = useSelector((state) => state.repo.error);
  const [expanded, setExpanded] = useState(false);

  // Function to handle accordion expand
  const handleAccordionExpand = (data) => {
    setExpanded(data);
  };

  // Fetch repositories when time period or page changes
  useEffect(() => {
    fetchRepositories(timePeriod, page);
  }, [timePeriod, page]);

  // Fetch repositories based on selected time period and page number
  const fetchRepositories = (period, pageNumber) => {
    let date = new Date();
    switch (period) {
      case '1 week':
        date.setDate(date.getDate() - 7 * pageNumber);
        break;
      case '2 weeks':
        date.setDate(date.getDate() - 14 * pageNumber);
        break;
      case '1 month':
      default:
        date.setDate(date.getDate() - 30 * pageNumber);
    }
    const formattedDate = date.toISOString().split('T')[0];
    dispatch(fetchRepos({formattedDate, page: pageNumber})); // Use pageNumber instead of page
  };

  // Handle repository selection
  const handleRepoSelect = (repo) => {
    dispatch(selectRepo(repo));
  };

  // Ref for the last repository element
  const lastRepoElementRef = useRef(null);

  return (
    <div>
      <select
        value={timePeriod}
        onChange={(event) => {
          setPage(1);
          setTimePeriod(event.target.value);
        }}
        style={{ marginBottom: '20px' }}
      >
        <option value="1 week">1 Week</option>
        <option value="2 weeks">2 Weeks</option>
        <option value="1 month">1 Month</option>
      </select>
      {loading && page === 1 && <Loader />}
      {error && <p>Error: {error}</p>}
      <InfiniteScroll
        dataLength={repos?.items?.length || 0}
        next={() => setPage(page + 1)}
        hasMore={true}
        loader={<Loader />}
        scrollThreshold={0.9}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>No more repositories to load</b>
          </p>
        }
      >
        <List>
          {repos?.items?.map((repo, index) => {
            return (
              <RepoItem
                key={repo.id}
                repo={repo}
                onClick={() => handleRepoSelect(repo)}
                ref={repos.items.length === index + 1 ? lastRepoElementRef : null}
                expanded={expanded}
                handleAccordionExpand={handleAccordionExpand}
              />
            );
          })}
        </List>
      </InfiniteScroll>
    </div>
  );
};

export default ReposList;
