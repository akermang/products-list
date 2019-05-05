import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import { Input, InputAdornment } from '@material-ui/core';
import styles from './filter.component.scss';
import PaginationComponent from '../pagination/pagination.component.jsx';

const LOCAL_STORAGE_KEY_PER_PAGE = 'item-per-page';

class FilterComponent extends Component {
  constructor (props) {
    super(props);

    const storedPerPageValue = localStorage.getItem(LOCAL_STORAGE_KEY_PER_PAGE);

    this.state = {
      searchString: '',
      filtered: props.array,
      page: 0,
      perPage: storedPerPageValue ? parseInt(storedPerPageValue, 10) : 5
    };
  }

  componentDidUpdate (prevProps, prevState) {
    const { searchString } = this.state;
    const { array, blackList } = this.props;

    if (searchString !== prevState.searchString || array !== prevProps.array) {
      const filtered = array.filter((item) => {
        const x = Object.keys(item).filter((key) => {
          if (blackList.indexOf(key) > -1) {
            return false;
          }
          const value = item[key] ? item[key].toString().toUpperCase() : '';
          return value.indexOf(searchString.toUpperCase()) > -1;
        });
        return x.length ? { ...x } : null;
      });
      this.setState({ filtered }); // eslint-disable-line
    }
  }

  getPaginatedArray () {
    const { filtered, page, perPage } = this.state;
    return [...filtered].slice(page * perPage, page * perPage + perPage);
  }

  render () {
    const { children, array } = this.props;
    const { searchString, page, perPage } = this.state;

    return (
      <div className={styles.container}>
        {array.length > 0 && (
          <div
            className={styles.top}
            style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}
          >
            <Input
              type="search"
              className={styles.input}
              value={searchString}
              onChange={e => this.setState({ searchString: e.target.value })}
              inputProps={{ placeholder: 'search product name' }}
              startAdornment={(
                <InputAdornment position="start">
                  <SearchIcon className={styles.icon} />
                </InputAdornment>
              )}
            />
          </div>
        )}

        {children(this.getPaginatedArray())}

        {array.length > 0 && (
          <PaginationComponent
            onPageChange={(e, p) => this.setState({ page: p })}
            onPerPageChange={(e) => {
              const newPerPage = parseInt(e.target.value, 10);
              localStorage.setItem(LOCAL_STORAGE_KEY_PER_PAGE, newPerPage);
              this.setState({ perPage: newPerPage });
            }}
            page={page}
            perPage={perPage}
            arrayLength={array.length}
          />
        )}
      </div>
    );
  }
}

FilterComponent.propTypes = {
  array: PropTypes.arrayOf(PropTypes.any).isRequired,
  children: PropTypes.func.isRequired,
  blackList: PropTypes.arrayOf(PropTypes.string)
};

FilterComponent.defaultProps = { blackList: ['category', 'price', 'createdDate'] };

export default FilterComponent;
