import { Response } from "../models/Response";

export interface IFetchResult<T> {
    data: Response<T> | null;
    isLoading: boolean;
    errors: string;
}