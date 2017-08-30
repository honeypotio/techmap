import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Fuse from 'fuse.js';
import debounce from 'lodash.debounce';
import ResultList from './ResultList';
import PaneSubHeader from '../PaneSubHeader';
import LoadingIndicator from '../LoadingIndicator';

const SearchBar = styled.div`
  background-color: white;
  border-bottom: 1px solid #d6d6d6;
  display: flex;
  align-items: center;
  position: sticky;
  top: 59px;
  width: 100%;
  height: 60px;
  padding-left: 20px;
  padding-right: 20px;
`;

const SearchInput = styled.input`
  border: 1px solid #d6d6d6;
  border-radius: 5px;
  font-size: inherit;
  width: 100%;
  padding: 10px;
  outline: 0;

  &:focus {
    border-color: #104986;
  }
`;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      query: this.props.location.query.q,
      result: []
    };

    this.fuse = new Fuse(this.props.globalStore.companies, {
      shouldSort: true,
      threshold: 0.2,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['industry', 'name', 'station', 'technology']
    });

    this.updateResult = debounce(this.updateResult, 300);
  }

  componentDidMount() {
    this.updateResult(this.state.query);
  }

  handleChange = e => {
    const query = e.target.value;
    this.updateResult(query);
  };

  updateResult(query) {
    const result = query ? this.fuse.search(query) : [];
    this.setState({ query, result });
    browserHistory.push({
      pathname: this.props.location.pathname,
      query: query && { q: query }
    });
  }

  render() {
    const { loading, query, result } = this.state;
    return (
      <div>
        <PaneSubHeader
          title="Search"
          meta={`${result.length} results`}
          backButton="true"
          backTo="/london"
        />
        <SearchBar>
          <SearchInput
            type="search"
            defaultValue={query}
            onInput={this.handleChange}
            autoFocus={!query}
          />
        </SearchBar>
        {loading ? <LoadingIndicator /> : <ResultList data={result} />}
      </div>
    );
  }
}

Search.propTypes = {};

export default Search;
