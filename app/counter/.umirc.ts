import { defineConfig } from 'umi';

export default defineConfig({
  proxy: {
      '/jsonrpc': {
        'target': 'http://127.0.0.1:65534/jsonrpc/',
        'changeOrigin': true,
      },
    },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/new', component: '@/pages/new' },
  ],
  fastRefresh: {},
});
