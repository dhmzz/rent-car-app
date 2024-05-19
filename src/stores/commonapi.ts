import { defineStore } from "pinia";
import axios, { AxiosError } from 'axios';
import type { AxiosResponse } from 'axios';
import { URL_BASE_APP, JWT_TOKEN } from "@/stores/global";

export const useCommonAPI = defineStore("common-api", () => {
    async function getRequest(url: string, callback?: Function): Promise<any> {
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JWT_TOKEN,
            },
        };

        try {
            const response: AxiosResponse<any> = await axios.get(URL_BASE_APP + url, config);
            if (callback) {
                return callback(response, null);
            }
            return response;
        } catch (error) {
            const errorResponse = error as AxiosError<any>;
            if (callback) {
                return callback(errorResponse.response, error);
            }
            throw error;
        }
    }

    async function postRequest(url: string, body: any, callback?: Function): Promise<any> {
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JWT_TOKEN,
            },
        };

        try {
            const response: AxiosResponse<any> = await axios.post(URL_BASE_APP + url, body, config);
            if (callback) {
                return callback(response, null);
            }
            return response;
        } catch (error) {
            const errorResponse = error as AxiosError<any>;
            if (callback) {
                return callback(errorResponse.response, error);
            }
            throw error;
        }
    }

    async function putRequest(url: string, body: any, callback?: Function): Promise<any> {
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JWT_TOKEN,
            },
        };

        try {
            const response: AxiosResponse<any> = await axios.put(URL_BASE_APP + url, body, config);
            if (callback) {
                return callback(response, null);
            }
            return response;
        } catch (error) {
            const errorResponse = error as AxiosError<any>;
            if (callback) {
                return callback(errorResponse.response, error);
            }
            throw error;
        }
    }

    async function deleteRequest(url: string, body: any, callback?: Function): Promise<any> {
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JWT_TOKEN,
            },
        };

        try {
            const response: AxiosResponse<any> = await axios.delete(URL_BASE_APP + url, config);
            if (callback) {
                return callback(response, null);
            }
            return response;
        } catch (error) {
            const errorResponse = error as AxiosError<any>;
            if (callback) {
                return callback(errorResponse.response, error);
            }
            throw error;
        }
    }

    return {
        getRequest,
        postRequest,
        putRequest,
        deleteRequest
    }
})