# vue-vuex-alb

## Vue + VueX + NodeJs + Express + MongoDB
In this project I am using following libraries:
- vue-router - for routing
- axios - HTTP client for making API requests
- vee-validate - for validation (I have used my custom validations and messages)
- vue-sweetalert2 - to display alert popup for better UI
## Project setup
```
npm install in /vue-vuex-alb and /vue-vuex-alb/backend (to run node server)
```

## Description
```
We can run this project in two ways-
- with node server where we can perform CRUD operations on dynamic data
    - Use this url - http://localhost:8080/
- with static data that I have stored in src/assets/data.json
    - Use this url - http://localhost:8080/static
```

## VueX Modules
```
In store folder I have created 2 different modules, one for dynamic data(comming from MongoDB - http://localhost:8080/) and another for static data (http://localhost:8080/static)
```

### Compiles and hot-reloads for development
```
npm run serve for vue project
nodemon index.js (to run node server for api calls)
```