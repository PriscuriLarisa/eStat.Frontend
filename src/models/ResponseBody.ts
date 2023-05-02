export default interface ResponseBody {
    method: Methods,
    headers: HeadersInit,
    body?: BodyInit | null,
    credentials?: RequestCredentials
};

export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';