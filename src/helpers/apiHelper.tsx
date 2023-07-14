import {Response as IResponse} from "../models/Response" 
import ResponseBody, { Methods } from "../models/ResponseBody";
import BASE_URL from '../config.json'
import Cookies from "universal-cookie";
import { ACCESS_TOKEN } from "../library/constants";

class ApiHelper {

    request = async<T,>(endpoint: string, method: Methods, body?: T): Promise<IResponse<T>> => {
        try {
            const cookie = new Cookies();
            const responseBody: ResponseBody = {
                method: method,
                credentials: 'include',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
                },
            }

            if (cookie.get(ACCESS_TOKEN) !== undefined) {
                responseBody.headers = { ...responseBody.headers, 'Access-Token': cookie.get(ACCESS_TOKEN) }
            }

            if (method !== 'GET' || 'DELETE') {
                responseBody.body = JSON.stringify(body);
            }

            const response: Response = await fetch(`${BASE_URL.BASE_URL}${endpoint}`, responseBody);

            if (response.status === 204) {
                return { Status: response.status };
            }

            if (response.status !== 200) {
                const status: number = response.status;
                if (status === 400) {
                    return { Status: status, Error: 'Bad Request' };
                }
                if (status === 401) {
                    return { Status: status, Error: 'Unauthorized' };
                }
                if (status === 404) {
                    return { Status: status, Error: 'Not Found' };
                }
                if (status === 500) {
                    return { Status: status, Error: 'Server Error' };
                }
            }

            const data = await response.json();
            return { Data: data, Status: response.status };

        } catch (error) {
            return { Error: error as string }
        }
    };
}

export const APIHelper = new ApiHelper();