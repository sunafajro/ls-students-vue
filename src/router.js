import Vue from 'vue';
import Router from 'vue-router';
import Detail from './components/Detail/Detail.vue';
import Invoice from './components/Invoice/Invoice.vue';
import Payment from './components/Payment/Payment.vue';
import Transfer from './components/Transfer/Transfer.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/invoice',
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
    },
    {
      path: '/invoice',
      name: 'invoice',
      component: Invoice,
    },
    {
      path: '/payment',
      name: 'payment',
      component: Payment,
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: Transfer,
    },
  ],
});
