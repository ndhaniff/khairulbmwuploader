import { defineConfig } from 'umi'

export default defineConfig({
  define: {
    'process.env.SUPABASE_URL': process.env.SUPABASE_URL,
    'process.env.ANON_KEY': process.env.ANON_KEY,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { exact: true, path: '/', component: '@/pages/index' },
    { exact: true, path: '/car', component: '@/pages/car' },
    { exact: true, path: '/media', component: '@/pages/media' },
    { component: '@/pages/404' },
  ],
  fastRefresh: {},
  tailwindcss: {},
})
