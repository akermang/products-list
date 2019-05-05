import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HeaderComponent from '../../components/header/header.component.jsx';
import { OpenDrawerAction } from '../../../common/state/drawer/drawer.actions';
import Container from './styles';

const DefaultLayout = ({
  loggedInUser, path, component, openDrawer, title
}) => {
  const Component = component;

  return (
    <Route
      path={path}
      render={matchProps => (
        <div>
          <HeaderComponent
            path={path}
            openDrawer={openDrawer}
            loggedInUser={loggedInUser}
            title={title}
          />
          <Container>
            <Component {...matchProps} />
          </Container>
        </div>
      )}
    />
  );
};

function mapStateToProps (state) {
  return {
    title: state.shared.title
  };
}

function mapDispatchToProps (dispatch) {
  return {
    openDialog: (title, component) => dispatch(new OpenDrawerAction(title, component)),
    openDrawer: () => dispatch(new OpenDrawerAction())
  };
}

DefaultLayout.propTypes = {
  path: PropTypes.string.isRequired,
  openDrawer: PropTypes.func.isRequired,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultLayout);
