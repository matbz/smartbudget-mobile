import Vue from 'vue';
import Router from 'vue-router';

const Login = () => import('@/components/User/Login');
const Budget = () => import('@/components/Budget/Budget');
const Turnover = () => import('@/components/Turnover/Turnover');
const TurnoverAdd = () => import('@/components/Turnover/TurnoverAdd');
const TurnoverAddAmount = () => import('@/components/Turnover/TurnoverAddAmount');
const TurnoverAddCategory = () => import('@/components/Turnover/TurnoverAddCategory');
const TurnoverAddPayee = () => import('@/components/Turnover/TurnoverAddPayee');
const TurnoverAddAccount = () => import('@/components/Turnover/TurnoverAddAccount');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: { name: 'turnoverAddAmount' },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresNotAuth: true,
      },
    },
    {
      path: '/budget',
      name: 'budget',
      component: Budget,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/accounts',
      name: 'turnover',
      component: Turnover,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/turnover/add',
      name: 'turnoverAdd',
      component: TurnoverAdd,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/turnover/add/amount',
      name: 'turnoverAddAmount',
      component: TurnoverAddAmount,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/turnover/add/category',
      name: 'turnoverAddCategory',
      component: TurnoverAddCategory,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/turnover/add/payee',
      name: 'turnoverAddPayee',
      component: TurnoverAddPayee,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/turnover/add/account',
      name: 'turnoverAddAccount',
      component: TurnoverAddAccount,
      meta: {
        requiresAuth: true,
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  }
});


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

  if (token) {
    router.app.$options.store.dispatch('setUserAndToken', { token });
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      return next({ path: '/login' });
    }
  }

  if (to.matched.some(record => record.meta.requiresNotAuth)) {
    if (token) {
      return next({ path: '/' });
    }
  }
  next();
});

export default router;
