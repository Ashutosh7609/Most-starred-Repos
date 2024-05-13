// src/components/RepoItem.js
import React, { useState } from 'react';
import { Accordion, AccordionSummary, Typography, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchCommitHistory, fetchContributorStats, fetchCodeFrequency   } from '../app/reducers/repoDetailSlice';
import { useDispatch, useSelector } from 'react-redux';
import RepoDetail from './RepoDetail';

// Component to display repository details in an accordion
const RepoItem = ({ repo, handleAccordionExpand, expanded }) => {
  const dispatch = useDispatch();
  // Selecting commit history, contributor stats, loading state, and error from the Redux store
  const commitHistory = useSelector((state) => state.repoDetail.commitHistory);
  const contributorStats = useSelector((state) => state.repoDetail.contributorStats);
  const codeFrequency = useSelector((state) => state.repoDetail.codeFrequency);
  const loading = useSelector((state) => state.repoDetail.loading);
  const error = useSelector((state) => state.repoDetail.error);

  // State declaration
  const [dataType, setDataType] = useState('commit_activity'); 

  // Function to handle accordion expand event
  const handleExpand = (event) => {
    handleAccordionExpand(repo.id)
    let owner = repo.owner.login
    let name = repo.name
    dispatch(fetchCommitHistory({ owner, name }));
    dispatch(fetchContributorStats({ owner, name }));
    dispatch(fetchCodeFrequency({ owner, name }));
  };

  // Function to handle data type change
  const handleSelectChange = (event) => {
    setDataType(event)
  }

  // Function to handle last pushed date
  const lastPushed = new Date(repo.pushed_at).toLocaleString('en-US', {
    hour12: true,
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <>
    <Accordion expanded={expanded === repo.id} onChange={handleExpand}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt={repo.owner.login} src={repo.owner.avatar_url} />
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant="h5">{repo.name}</Typography>}
            secondary={
              <React.Fragment>
                <Typography component="span" variant="body2" color="textPrimary" style={{ fontSize: '1.1rem' }}>
                  {repo.description}
                </Typography>
                <br />
                <Typography component="span" variant="body2" color="textPrimary" style={{ marginRight: '10px' }}>
                  Stars: {repo.stargazers_count}
                </Typography>
                {/* <br /> */}
                <Typography component="span" variant="body2" color="textPrimary" style={{ marginRight: '10px' }}>
                  Issues: {repo.open_issues_count}
                </Typography>
                {/* <br /> */}
                <Typography component="span" variant="body2" color="textPrimary">
                  Last pushed {lastPushed} by {repo.owner.login}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </AccordionSummary>
    </Accordion>
    {((commitHistory && commitHistory.length > 0) || (contributorStats && contributorStats.length > 0)) && expanded === repo.id &&
      <RepoDetail 
        owner={repo.owner.login}
        repo={repo.name}
        commitHistory={commitHistory}
        loading={loading}
        error={error}
        contributorStats={contributorStats}
        handleSelectChange={handleSelectChange}
        dataType={dataType}
        codeFrequency={codeFrequency}
      />
    }
    </>
  );
};

export default RepoItem;
