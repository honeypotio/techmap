const routes = [
  {
    path: '/',
    onEnter: (nextState, replace) => replace('/london')
  },
  {
    path: '/london',
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require('./containers/London').default);
      });
    },
    childRoutes: [
      {
        indexRoute: {
          component: require('./components/OverviewList').default
        }
      },
      {
        path: 'industries',
        component: require('./components/IndustryList').default
      },
      {
        path: 'technologies',
        component: require('./components/TechnologyList').default
      },
      {
        path: 'search',
        component: require('./components/Search').default
      },
      {
        path: 'technology/:technology',
        component: require('./components/CompanyList').default
      },
      {
        path: 'industry/:industry',
        component: require('./components/CompanyList').default
      },
      {
        path: 'station/:station',
        component: require('./components/CompanyList').default
      },
      {
        path: 'company/:company',
        component: require('./components/CompanyDetails').default
      }
    ]
  },

  // Catch unmatching routes
  {
    path: '*',
    getComponent(nextState, cb) {
      require.ensure([], require => {
        cb(null, require('./containers/NotFound').default);
      });
    }
  }
];

export default routes;
