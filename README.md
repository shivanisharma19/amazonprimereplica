# Amazon Prime Replica
 
Amazon Prime Replica application created with create-react-app; using React, Javascript, TMDB Api.

## Features

Amazon Prime Replica
- Navigation Bar
    Sticky navigation bar
    Buttons are inactive
- Banner
    Movies banner
- Movie List
    100 rows with 20 movie movie card in each row
    Infinite scroll with 10 rows loaded at once
    Button scroller to view all the movie cards ( visible only 5 at once) 
- Movies card
    Movie poster with movie title and alt message as o=movie description

## Installation
Git clone

```bash
    git clone https://github.com/shivanisharma19/amazonprimereplica.git
    cd amazonprimereplic
```

## How to build the application

In the project directory, you can run:

* `npm install`
* `npm run build`

## How to run the application

In the project directory, you can run:

* `npm install`
* `npm start`

To Access the movie api, you will need to register yourself on [TMDB](https://developer.themoviedb.org/) and get an authentication key.
Paste your authentication key in front of `auth_key` in [fetchMovies.js](\src\features\Movies\fetchMovies.js)

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## Tesing

    Basic tests are written both in cypress and @testing-library/react

## How to run test

### Cypress
 
 To run cypress in cypress browser window
* `npm install` _[Optional]_
* `npm run cy:debug`
* run the spec

 To run cypress in command line
* `npm install` _[Optional]_
* `npm run cy:e2e`

### React Testing Library
 
* `npm install` _[Optional]_
* `npm run test`

## Technologies Stack

1) Javascript

2) React

This project uses [React](https://reactjs.org/)

3) React Router

4) TMDB

This project fetch data from the movie database [TMDB](https://developer.themoviedb.org/reference/account-details)

5) Cypress

Tests are made using [Cypress](https://www.cypress.io/).

## Performance Pptimization

In order to achieve good performance
- Bundling of application ( create-react-app command uses webpack underhood) - to pack application in optimize bundle(s)
- Implemented infinite scroll and load only 10 rows of data at once, not all at once, so user do not have to wait to load complete data in order to use the application
- Used Fragment <>
- Added lazy loading of movie posters to optimize CLS(cumulative layout shift)

## Improvements
- Code Additions
    - Use Redux/Zustand for state management
    - Use PostCSS/Saas to implement nested css, variables and mixin
- Feature Additions
    - Add navigation in nav items
    - Add Search
    - Add Filter
- Improvements
    - Improve CSS
    - Write more test cases
