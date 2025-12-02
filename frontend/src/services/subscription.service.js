import api from './api';

export const subscriptionService = {
  async getAll(userId, params = {}) {
    const { page = 1, limit = 10, search = '', billingCycle = '' } = params;
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
      ...(billingCycle && { billingCycle }),
    });
    const response = await api.get(`/subscriptions/user/${userId}?${queryParams}`);
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/subscriptions/${id}`);
    return response.data;
  },

  async create(subscriptionData) {
    const response = await api.post('/subscriptions', subscriptionData);
    return response.data;
  },

  async update(id, subscriptionData) {
    const response = await api.put(`/subscriptions/${id}`, subscriptionData);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/subscriptions/${id}`);
    return response.data;
  },

  async cancel(id) {
    const response = await api.put(`/subscriptions/${id}/cancel`);
    return response.data;
  },

  async getUpcomingRenewals() {
    const response = await api.get('/subscriptions/upcoming-renewals');
    return response.data;
  },
};
