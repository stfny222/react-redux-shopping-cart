# react-redux-shopping-cart

## Get Started

1. Clone repository: `git clone https://github.com/stfny222/react-redux-shopping-cart.git`
2. `cd react-redux-seed`
3. Install dependencies: `npm install`
4. Run fake REST API: `npm run server`
5. Run for development: `npm run dev`
6. Go to http://localhost:1234/

## Directory Layout
    .
    ├── ...
    ├── src                           
    │   ├── assets                    # includes stylesheets and the base html template
    │   ├── components                # presentational components
    │   ├── containers                # container components
    │       ├── Root                  # root component
    │       ├── ...
    │       └── routes.js             # set up routes for react-router-dom                
    │   ├── layout                    # base layout configuration with material-ui theme
    │   ├── redux     
    │       ├── constants             # BASEURL and other constants
    │       ├── ducks                 # set of actions, reducer, action creators and epics by feature
    │       ├── reducers              # root reducer
    │       └── store                 # store configuration for dev and prod
    │   └── entrypoint.js                  
    ├── .babelrc                      # babel configuration for es6
    ├── .eslintrc.json                # lint configuration for es6
    ├── .webpack.config.dev.js        # development configuration (including webpack-dev-server)
    ├── .webpack.config.prod.js       # production configuration
    └── ...
