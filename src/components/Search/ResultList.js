import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../Icon';

const Item = styled(Link)`
  color: #1f2228;
  display: flex;
  align-items: center;
  font-weight: 500;
  padding: 15px 10px;
  text-decoration: none;
  width: 100%;

  &:hover {
    background-color: #f2f2f2;
  }

  > svg {
    margin-left: 8px;
    margin-right: 15px;
  }
`;

const ResultList = ({ data }) => {
  const items = data.map((item, idx) => {
    const url = `/london/company/${encodeURIComponent(item.name)}`;
    return (
      <Item key={idx} to={url}>
        <Icon name="business" fill="#104986" />{item.name}
      </Item>
    );
  });

  return (
    <div>
      {items.length ? items : ''}
    </div>
  );
};

ResultList.propTypes = {
  data: PropTypes.array
};

export default ResultList;
