import client from './client';

export const authApi = {
  login: (email: string, password: string) =>
    client.post('/api/auth/login', { email, password }),
  logout: () => client.post('/api/auth/logout'),
  profile: () => client.get('/api/auth/me'),
  updateProfile: (data: unknown) => client.put('/api/auth/profile', data),
};

export const doctorsApi = {
  getAll: () => client.get('/api/doctors'),
  getById: (id: string) => client.get(`/api/doctors/${id}`),
  create: (data: FormData) =>
    client.post('/api/doctors', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id: string, data: FormData) =>
    client.put(`/api/doctors/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id: string) => client.delete(`/api/doctors/${id}`),
};

export const publicApi = {
  doctors: () => client.get('/api/public/doctors'),
  banners: () => client.get('/api/public/banners'),
  social: () => client.get('/api/public/social'),
  settings: () => client.get('/api/public/settings'),
};

export const appointmentsApi = {
  book: (data: unknown) => client.post('/api/public/appointments', data),
  getAll: () => client.get('/api/appointments'),
  updateStatus: (id: string, status: string) =>
    client.patch(`/api/appointments/${id}/status`, { status }),
};

export const enquiriesApi = {
  submit: (data: unknown) => client.post('/api/enquiries', data),
  getAll: () => client.get('/api/enquiries'),
  updateStatus: (id: string, status: string) =>
    client.patch(`/api/enquiries/${id}/read`, { isRead: status === 'replied' || status === 'closed' || status === 'new' ? status !== 'new' : true }),
};

export const bannersApi = {
  getPublic: () => client.get('/api/public/banners'),
  getAll: () => client.get('/api/banners'),
  create: (data: FormData) =>
    client.post('/api/banners', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id: string, data: FormData | Record<string, unknown>) =>
    client.put(`/api/banners/${id}`, data, data instanceof FormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined),
  delete: (id: string) => client.delete(`/api/banners/${id}`),
};

export const settingsApi = {
  get: () => client.get('/api/settings'),
  update: (data: unknown) => client.put('/api/settings', data),
};

export const socialApi = {
  get: () => client.get('/api/social'),
  update: (data: unknown) => client.put('/api/social', data),
};

export const dashboardApi = {
  stats: () => client.get('/api/dashboard'),
};
