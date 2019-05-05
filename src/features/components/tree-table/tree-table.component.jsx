import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import styles from './tree-table.module.scss';

class TreeTableComponent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      rowData: props.treeData,
      columns: props.columnDefs
    };

    this.getOptions = this.getOptions.bind(this);
    this.onRowDoubleClicked = this.onRowDoubleClicked.bind(this);
  }

  componentDidUpdate (prevProps, prevState) {
    const { treeData, columnDefs, selectedId } = this.props;
    if (treeData !== prevProps.treeData || columnDefs !== prevProps.columnDefs) {
      /* eslint-disable react/no-did-update-set-state */
      this.setState({ rowData: treeData, columns: columnDefs });
      /* eslint-disable react/no-did-update-set-state */
    }

    if (selectedId !== prevProps.selectedId && !selectedId) {
      this.gridOptions.api.deselectAll();
    }
  }

  componentWillUnmount () {
    this.destroyed = true;
  }

  onRowDoubleClicked (data) {
    const { onSelection } = this.props;
    onSelection && onSelection(data.data.id);
  }

  getNodeChildDetails (rowItem) {
    if (rowItem.children) {
      return {
        group: true,
        children: rowItem.children,
        key: rowItem.derControllerId
      };
    }
    return null;
  }

  getOptions () {
    const { selectedId } = this.props;
    // const fitColumns = this.fitColumns.bind(this);
    const self = this;

    return {
      getNodeChildDetails: this.getNodeChildDetails,
      rowSelection: 'single',
      suppressRowClickSelection: true,
      defaultColDef: {
        sortable: false,
        resizable: false
      },
      onGridReady: (params) => {
        params.api.resetRowHeights();
        this.gridOptions = params;
        self.gridOptions = this;
        const expand = (node) => {
          node.setExpanded(true);
          node.parent && expand(node.parent);
        };

        params.api.forEachNode((node, i) => {
          const { id } = node.data;

          if (id === selectedId) {
            node.setSelected(true);

            // scroll
            let index;
            if (!node.parent) {
              index = node.rowIndex;
            } else {
              index = node.parent.rowIndex;
            }
            params.api.ensureIndexVisible(index, 'top');

            expand(node);
          }
        });
      }
    };
  }

  fitColumns (params) {
    const { sizeColumnsToFit } = this.props;
    if (sizeColumnsToFit) {
      !this.destroyed && params.api.sizeColumnsToFit();
    }
  }

  autoSizeColumns (params) {
    const allColumnIds = [];
    const { columnApi } = params;
    columnApi.getAllColumns().forEach(column => allColumnIds.push(column.colId));
    columnApi.autoSizeColumns(allColumnIds);
  }

  render () {
    const { rowData, columns } = this.state;
    return (
      <div className={styles.container}>
        <div className="ag-theme-material" style={{ height: '100%', Width: 'fit-content' }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columns}
            gridOptions={this.getOptions()}
            onRowDoubleClicked={this.onRowDoubleClicked}
          />
        </div>
      </div>
    );
  }
}

TreeTableComponent.propTypes = {
  treeData: PropTypes.arrayOf(
    PropTypes.shape({
      ...PropTypes.shape(PropTypes.any).isRequired,
      children: PropTypes.arrayOf(PropTypes.any)
    })
  ).isRequired,
  onSelection: PropTypes.func,
  selectedId: PropTypes.string,
  columnDefs: PropTypes.arrayOf(
    PropTypes.shape({
      headerName: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired,
      cellRendererFramework: PropTypes.any
    })
  ).isRequired,
  sizeColumnsToFit: PropTypes.bool
};

TreeTableComponent.defaultProps = {
  selectedId: null,
  sizeColumnsToFit: false,
  onSelection: null
};

export default TreeTableComponent;
