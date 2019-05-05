import React from 'react';
import { HashRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import App from './features/pages/app/app.page.jsx';
import DefaultLayout from './features/pages/default-layout/default-layout.page.jsx';
import HomePage from './features/pages/home/home.page.jsx';
import AboutPage from './features/pages/about/about.page.jsx';
import { ROUTES } from './common/constants';
import DefaultTheme from './assets/themes/default';

const Root = ({ store }) => ({
  render () {
    return (
      <Provider store={store}>
        <ThemeProvider theme={DefaultTheme}>
          <Router>
            <App>
              <Switch>
                <DefaultLayout path={ROUTES.home} component={HomePage} />
                <DefaultLayout path={ROUTES.about} component={AboutPage} />
              </Switch>
            </App>
          </Router>
        </ThemeProvider>
      </Provider>
    );
  }
});

export default Root;
