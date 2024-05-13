// src/components/RepoDetail.js
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Component to display repository details
const RepoDetail = ({ owner, repo, commitHistory, contributorStats, loading, error, handleSelectChange, dataType, codeFrequency }) => {

  // Options for commit history chart
  const options = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Total Changes',
    },
    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical',
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        month: '%e. %b',
        year: '%b',
      },
      title: {
        text: 'Date',
      },
    },
    yAxis: {
      title: {
        text: dataType === "commit_activity" ? 'Number of Commits' : 'Number of Lines',
      },
    },
    series: [
      {
        name: dataType === 'commit_activity' ? 'Commits' : dataType === 'additions' ? 'Additions' : 'Deletions',
        data: dataType === 'commit_activity'
          ? commitHistory && commitHistory.length > 0 ? commitHistory.map((week) => [new Date(week.week * 1000).getTime(), week.total]): []
          : dataType === 'additions'
          ? codeFrequency && codeFrequency.length > 0 ? codeFrequency.map((week) => [new Date(week[0] * 1000).getTime(), week[1]]) : []
          : codeFrequency && codeFrequency.length > 0 ? codeFrequency.map((week) => [new Date(week[0] * 1000).getTime(), -week[2]]) : [],
      },
    ],
  };

  // Options for contributor stats chart
  const contributorOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Contributor Changes',
    },
    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical',
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        month: '%e. %b',
        year: '%b',
      },
      title: {
        text: 'Date',
      },
    },
    yAxis: {
      title: {
        text: 'Number of Changes',
      },
    },
    series: contributorStats && contributorStats.length > 0
      ? contributorStats.map((contributor) => ({
          name: contributor.author.login,
          data: contributor.weeks.map((week) => [new Date(week.w * 1000).getTime(), week[dataType.charAt(0)]]),
        }))
      : [],
  };

  return (
    <div>
      <select
        className="select-container"
        value={dataType}
        onChange={(event) => handleSelectChange(event.target.value)}
        style={{ marginBottom: '20px' }}
      >
        <option value="commit_activity">Commits</option>
        <option value="additions">Additions</option>
        <option value="deletions">Deletions</option>
      </select>
      <div>
        {commitHistory && commitHistory.length > 0 && owner && repo && (
          <div>
            {error ? (
              <p>{error}</p>
            ) : (
              <>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <HighchartsReact highcharts={Highcharts} 
                  options={options}
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>
      <div>
        {contributorStats && contributorStats.length > 0 && owner && repo && (
          <div>
            {error ? (
              <p>{error}</p>
            ) : (
              <>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <HighchartsReact highcharts={Highcharts} 
                  options={contributorOptions}
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RepoDetail;
