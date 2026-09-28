import { ofetch } from 'ofetch';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
    throw new Error(
        'NEXT_PUBLIC_API_BASE_URL is not defined. Please check your environment variables.',
    );
}

const apiClient = ofetch.create({
    baseURL: BASE_URL,
    credentials: 'include',
    headers: {
        Accept: 'application/json',
    },
});

export default apiClient;
