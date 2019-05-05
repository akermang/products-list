import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import SpinnerComponent from '../../components/spinner/spinner.component.jsx';
import DialogComponent from '../../components/dialog/dialog.component.jsx';
import DrawerComponent from '../../components/drawer/drawer.component.jsx';
import { OpenDialogAction, CloseDialogAction } from '../../../common/state/dialog/dialog.actions';
import { ROUTES } from '../../../common/constants';
import { CloseDrawerAction } from '../../../common/state/drawer/drawer.actions';
import {
  StartLoaderAction,
  StopLoaderAction
} from '../../../common/state/shared/shared.actions';
import {
  FetchProductsListAction,
  FetchCategoriesListAction
} from '../../../common/state/products/products.actions';

class App extends Component {
  componentDidMount () {
    const { history, location } = this.props;
    this.initiateData();

    // redirect to homepage if route is empty
    if (location.pathname === ROUTES.empty) {
      history.push(ROUTES.home);
    }

    // set site title on route change
    // setTitle(ROUTES.home);
    // history.listen(path => setTitle(path.pathname));
  }

  // onChangeLanguage (language) {
  //   const { changeLanguage } = this.props;
  //   changeLanguage(language);
  // }

  initiateData () {
    const {
      startLoader, stopLoader, fetchProductsList, fetchCategoriesList
    } = this.props;
    startLoader();
    fetchProductsList()
      .then(() => fetchCategoriesList())
      .then(() => stopLoader());
  }

  render () {
    const {
      loading,
      children,
      isDialogRender,
      dialogComponent,
      closeDrawer,
      dialogTitle,
      dialogType,
      isDrawerRender,
      closeDialog,
      categories
    } = this.props;

    return (
      <div>
        {/* Loader */}
        {loading && <SpinnerComponent />}

        {/* Routes */}
        {(categories.length > 0 && children)}

        {/* Dialog */}
        <DialogComponent
          open={isDialogRender}
          title={dialogTitle}
          type={dialogType}
          closeDialog={closeDialog}
          component={dialogComponent || ''}
        />

        {/* Drawer menu */}
        <DrawerComponent open={isDrawerRender} closeDrawer={closeDrawer} />
      </div>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.element.isRequired,
  isDialogRender: PropTypes.bool.isRequired,
  dialogComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  dialogTitle: PropTypes.string.isRequired,
  dialogType: PropTypes.string,
  isDrawerRender: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

App.defaultProps = {
  loading: true,
  dialogComponent: '',
  dialogType: null
};

function mapStateToProps (state) {
  return {
    loading: state.shared.loading,
    isDialogRender: state.dialog.isRender,
    dialogTitle: state.dialog.title,
    dialogComponent: state.dialog.component,
    dialogType: state.dialog.type,
    isDrawerRender: state.drawer.isRender,
    products: state.products.productsList,
    categories: state.products.categoriesList
  };
}

function mapDispatchToProps (dispatch) {
  return {
    openDialog: bindActionCreators(OpenDialogAction, dispatch),
    closeDialog: bindActionCreators(CloseDialogAction, dispatch),
    closeDrawer: bindActionCreators(CloseDrawerAction, dispatch),
    startLoader: bindActionCreators(StartLoaderAction, dispatch),
    stopLoader: bindActionCreators(StopLoaderAction, dispatch),
    fetchProductsList: bindActionCreators(FetchProductsListAction, dispatch),
    fetchCategoriesList: bindActionCreators(FetchCategoriesListAction, dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTranslation()(App))
);
