import { createPinia } from 'pinia';
import { useAuthStore } from './modules/auth';
import { useSystemStore } from './modules/sc-system';
import { useCompanyStore } from './modules/sc-company';

export const systemStore = useSystemStore();
export const authStore = useAuthStore();
export const companyStore = useCompanyStore();

export default { systemStore, authStore, companyStore }