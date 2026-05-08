import { getAnalytics, isSupported } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config';

export const app = initializeApp(firebaseConfig);

export const analyticsPromise = isSupported().then((supported) =>
  supported ? getAnalytics(app) : null,
);
