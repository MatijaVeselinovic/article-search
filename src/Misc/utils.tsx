import { createSearchParams, NavigateFunction, URLSearchParamsInit } from "react-router-dom";
import { Article } from "./types";

export function isolateUniqueCategoryPairsAndCount(data: Article[]) {
    return data.map(d => d.post_category_id).reduce((result: any, current: number) => {
        if (result[current]) {
            result[current] = ++result[current];
        } else {
            result[current] = 1;
        }
        return result;
    }, {});
}

export const navigateWithParams = (navigate:NavigateFunction, params: URLSearchParamsInit) => {
    const options = {
        pathname: '/',
        search: `?${createSearchParams(params)}`,
    };
    navigate(options, { replace: true });
}
