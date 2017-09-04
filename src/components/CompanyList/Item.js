import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  color: #1f2228;
  display: flex;
  align-items: flex-start;
  font-weight: 500;
  padding: 15px 10px;
  text-decoration: none;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const MetaText = styled.span`
  color: #999999;
  display: block;
  font-size: 90%;
  font-weight: normal;
  margin-top: 2px;
`;

const Item = props => {
  return (
    <StyledLink to={props.href}>
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
          fill={props.themeColor}
        />
      </svg>
      <span>
        {props.text}
        <MetaText>{props.meta}</MetaText>
      </span>
    </StyledLink>
  );
};

Item.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  themeColor: PropTypes.string.isRequired
};

export default Item;
