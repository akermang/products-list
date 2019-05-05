import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TablePagination, TableRow, Table, TableFooter
} from '@material-ui/core';
import styles from './pagination.component.scss';

class PaginationComponent extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  getPerPageOptions () {
    const options = [5, 10, 25, 50, 100];
    const { arrayLength } = this.props;

    if (arrayLength > 100) {
      options.push(arrayLength);
    }

    return options;
  }

  render () {
    const {
      onPageChange, onPerPageChange, page, perPage, arrayLength
    } = this.props;

    return (
      <Table className={styles.container}>
        <TableFooter style={{ width: '100%' }}>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={this.getPerPageOptions()}
              count={arrayLength}
              rowsPerPage={perPage}
              page={page}
              onChangePage={onPageChange}
              onChangeRowsPerPage={onPerPageChange}
            />
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}

PaginationComponent.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  onPerPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  arrayLength: PropTypes.number.isRequired
};

export default PaginationComponent;
