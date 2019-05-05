import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Header, Title } from './styles';

const HeaderComponent = ({ openDrawer }) => (
  <div>
    <Header position="static">
      <Toolbar>
        <IconButton onClick={openDrawer} className="hamburger">
          <MenuIcon />
        </IconButton>
        <Title>products app</Title>
      </Toolbar>
    </Header>
  </div>
);

HeaderComponent.propTypes = {
  openDrawer: PropTypes.func.isRequired
};

export default HeaderComponent;
