import React from 'react';
import PropTypes from 'prop-types';
import { getThemeColor } from '../../utils';
import Content from './Content';
import PaneSubHeader from '../PaneSubHeader';
import Tag from '../Tag';

const CompanyDetails = props => {
  const { companies } = props.globalStore;
  const id = props.params.company;
  const company = companies.find(
    company => company.name === decodeURIComponent(id)
  ) || {};
  const themeColor = getThemeColor(company.industry);

  return (
    <div>
      <PaneSubHeader
        title={company.name}
        meta={company.industry}
        backButton="true"
      />
      <Content>
        <p>
          {company.technology.map((technology, idx) => (
            <Tag key={idx}>{technology}</Tag>
          ))}
        </p>
        <p>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(company.station)}%20station%20london`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              fill="#3685d6"
              height="18"
              viewBox="0 0 24 24"
              width="30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M16.49 15.5v-1.75L14 16.25l2.49 2.5V17H22v-1.5z" />
                <path d="M19.51 19.75H14v1.5h5.51V23L22 20.5 19.51 18z" />
                <g>
                  <path d="M9.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5.75 8.9L3 23h2.1l1.75-8L9 17v6h2v-7.55L8.95 13.4l.6-3C10.85 12 12.8 13 15 13v-2c-1.85 0-3.45-1-4.35-2.45l-.95-1.6C9.35 6.35 8.7 6 8 6c-.25 0-.5.05-.75.15L2 8.3V13h2V9.65l1.75-.75" />
                </g>
              </g>
            </svg>
            {company.station}
          </a>
        </p>
        <p>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(company.address)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="30"
              height="18"
              viewBox="0 0 13 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.36 12.89C5.73 15.37 6.5 18 6.5 18s.86-2.373 2.33-5.11C10.095 10.54 12 7.9 12 6.5 12 3.46 9.538 1 6.5 1S1 3.462 1 6.5c0 1.523 1.98 3.887 3.36 6.39z"
                stroke="#000"
                strokeWidth=".5"
                fill={themeColor}
              />
            </svg>
            <address>{company.address}</address>
          </a>
        </p>
        <p>
          <a
            href="https://github.com/honeypotio/techmap"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              fill="currentColor"
              height="18"
              viewBox="0 0 24 24"
              width="30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
            Suggest an edit
          </a>
        </p>
      </Content>
    </div>
  );
};

CompanyDetails.propTypes = {
  globalStore: PropTypes.object
};

export default CompanyDetails;
