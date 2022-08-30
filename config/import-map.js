const isDev = process.env.NODE_ENV === 'development';

module.exports = [
  {
    name: '@app/single-spa-app-vue3-vite-template',
    entry: isDev ? 'http://localhost:8881/js/app.js' : './static/single-spa-app-vue3-vite-template/js/app.js',
  },
];
