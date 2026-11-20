import loadEnvConfig from "@next/env";

export const API_URL = process.env.API_URL || "http://localhost:5018";

export const VESSELS_MAX_AGE_MINUTES =
    Number(process.env.VESSELS_MAX_AGE_MINUTES) || 60;

export const BASE_URL = process.env.BASE_URL || "https://openships.de";