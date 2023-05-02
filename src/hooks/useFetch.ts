import {useEffect, useState} from "react";
import { Response } from "../models/Response";
import { IFetchResult } from "./useFetch.types";

export const useFetch = <T>(fetchPromise: () => Promise<Response<T>>, dependencies?: string[]): IFetchResult<T> => {
    const [fetchData, setFetchData] = useState<IFetchResult<T>>(
        {
            data: null,
            isLoading: true,
            errors: ""
        }
    )

    useEffect(() => {
        fetchPromise()
            .then((response: Response<T>) =>
                setFetchData((prevFetchData: IFetchResult<T>) => {
                    return {
                        ...prevFetchData,
                        data: response
                    };
                })
            )
            .catch((error: string) =>
                setFetchData((prevFetchData: IFetchResult<T>) => {
                    return {
                        ...prevFetchData,
                        errors: error
                    };
                })
            )
            .finally(() =>
                setFetchData((prevFetchData: IFetchResult<T>) => {
                    return {
                        ...prevFetchData,
                        isLoading: false
                    };
                })
            )

    }, dependencies);

    return fetchData;
};