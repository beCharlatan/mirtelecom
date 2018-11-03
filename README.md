# client

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

# add /src/services/config.js to configure axios urls like
import axios from 'axios'

export let server = () => {
  return axios.create({
    // для сервера
    // baseURL: ''
    // для локалки
    baseURL: ''
  })
}

export let geocode = () => {
  return axios.create({
    baseURL: 'https://geocode-maps.yandex.ru/1.x'
  })
}


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
