import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Noty from 'noty';
import { getCSRF, prepareYears } from './utils';

Vue.use(Vuex);
const el = document.getElementById('app');

export default new Vuex.Store({
  state: {
    invoiceHints: [],
    invoiceLabels: {},
    invoicePermSale: [],
    invoiceProcSales: [],
    invoiceRubSales: [],
    invoiceServices: [],
    paymentDetails: {
      columns: [],
      rows: [],
    },
    paymentDetailsFilter: '',
    paymentDetailsYears: [],
    paymentLabels: [],
    offices: [],
    sid: parseInt(el.dataset.sid),
    user: {},
  },
  mutations: {
    updateInvoiceData(state, data) {
      state.invoiceHints = data.hints ? data.hints : [];
      state.invoiceServices = data.services ? data.services : [];
      state.invoiceRubSales = data.rubsales ? data.rubsales : [];
      state.invoiceProcSales = data.procsales ? data.procsales : [];
      state.invoicePermSale = data.permsale ? data.permsale : {};
      state.invoiceLabels = data.labels ? data.labels : {};
    },
    updateOfficeInfo(state, data) {
      state.offices = data;
    },
    updateStudentPaymentDetails(state, data) {
      state.paymentDetails = data.details;
      state.paymentDetailsFilter = data.filter;
      state.paymentDetailsYears = data.years;
    },
    updatePaymentDetailsFilter(state, data) {
      state.paymentDetailsFilter = data.filter;
    },
    updateUserInfo(state, data) {
      state.user = data;
    },
  },
  actions: {
    async getInvoiceData({ commit, dispatch, state }) {
      try {
        const { data: token } = await getCSRF();
        token.sid = state.sid;
        const { data } = await axios.post('/invoice/get-data', token);
        commit('updateInvoiceData', data);
      } catch (e) {
        dispatch('showNotification', {
          text:
            'Ошибка получения данных для создания счета!' +
            (e && e.message ? ' ' + e.message : ''),
          type: 'error',
        });
      }
    },
    async getOfficesInfo({ commit, dispatch }) {
      try {
        const { data } = await axios.get('/office/index');
        commit('updateOfficeInfo', data);
      } catch (e) {
        dispatch('showNotification', {
          text:
            'Ошибка получения сведений об офисах!' +
            (e && e.message ? ' ' + e.message : ''),
          type: 'error',
        });
      }
    },
    async getStudentPaymentDetails({ commit, dispatch, state }) {
      try {
        const { data: token } = await getCSRF();
        const { data } = await axios.post(
          `/studname/detail?id=${state.sid}`,
          token
        );
        const { filter, years } = prepareYears(data.detailsData.rows);
        commit('updateStudentPaymentDetails', {
          details: data.detailsData,
          filter: String(filter),
          years,
        });
      } catch (e) {
        dispatch('showNotification', {
          text:
            'Ошибка получения детализации оплат пользователя!' +
            (e && e.message ? ' ' + e.message : ''),
          type: 'error',
        });
      }
    },
    async getUserInfo({ commit, dispatch }) {
      try {
        const { data } = await axios.get('/user/get-info');
        commit('updateUserInfo', data.userData ? data.userData : data);
      } catch (e) {
        dispatch('showNotification', {
          text:
            'Ошибка получения сведений о пользователе!' +
            (e && e.message ? ' ' + e.message : ''),
          type: 'error',
        });
      }
    },
    showNotification(args, { text, type }) {
      new Noty({
        theme: 'bootstrap-v4',
        text: text,
        timeout: 2000,
        type: type,
      }).show();
    },
  },
});
