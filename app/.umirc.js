
// ref: https://umijs.org/config/
export default {
  proxy: {
    '/jsonrpc': {
      'target': 'http://127.0.0.1:65534/jsonrpc/',
      'changeOrigin': true,
    },
  },
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' },
        { path: '/a', component: '../pages/a'}
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: false,
      dva: false,
      dynamicImport: false,
      title: 'go_temp',
      dll: false,

      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],

}
