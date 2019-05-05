import React from 'react';
import PropTypes from 'prop-types';
import HomeIcon from '@material-ui/icons/Home';
import { MenuItem } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../common/constants';
import LogoComponent from '../logo/logo.component.jsx';
import { StyledDrawer, Wrapper, Logo } from './styles';

const DrawerComponent = ({ closeDrawer, open }) => (
  <StyledDrawer open={open} variant="temporary" onClose={closeDrawer}>
    <Wrapper>
      <Logo>
        <LogoComponent />
      </Logo>
      <DrawerLink to={ROUTES.home} icon={<HomeIcon />} label="home" closeDrawer={closeDrawer} />
    </Wrapper>
  </StyledDrawer>
);

const DrawerLink = ({
  closeDrawer, iconSrc, label, to, icon
}) => (
  <NavLink activeClassName="active" to={to}>
    <MenuItem onClick={() => closeDrawer()}>
      {icon}
      {!icon && iconSrc && <img src={iconSrc} alt={`${label} link`} />}
      <span>{label}</span>
    </MenuItem>
  </NavLink>
);

DrawerLink.propTypes = {
  to: PropTypes.string.isRequired,
  iconSrc: PropTypes.string,
  icon: PropTypes.element,
  label: PropTypes.string.isRequired,
  closeDrawer: PropTypes.func.isRequired
};

DrawerLink.defaultProps = {
  iconSrc: null,
  icon: null
};

DrawerComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired
};

export default DrawerComponent;
