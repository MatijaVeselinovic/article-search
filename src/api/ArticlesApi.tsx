import axios from "axios";
import { useQuery } from "react-query";
import { Article } from "../Misc/types";

export function fetchArticles(): Promise<Article[]> {
    return axios.get(process.env.REACT_APP_API_ENDPOINT as string).then((response) => response.data)
}

export function useArticles() {
    return useQuery({ queryKey: ['articles'], queryFn: fetchArticles })
}
