declare global {
    interface Window {
        __OPENSHIPS_CONFIG__?: {
            apiUrl?: string;
            vesselsMaxAgeMinutes?: number;
            baseUrl?: string;
        };
    }
}

const runtimeConfig =
    typeof window !== "undefined" ? window.__OPENSHIPS_CONFIG__ : undefined;

export const API_URL = runtimeConfig?.apiUrl || "http://localhost:5018";

export const VESSELS_MAX_AGE_MINUTES =
    Number(runtimeConfig?.vesselsMaxAgeMinutes) || 60;

export const BASE_URL = runtimeConfig?.baseUrl || "https://openships.de";