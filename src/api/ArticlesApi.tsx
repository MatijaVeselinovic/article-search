import axios from "axios"
import { useQuery } from "react-query"
import { Article } from "../Misc/types"

export const API_ENDPOINT = 'https://www.alpha-orbital.com/last-100-news.json'
export const API_IMAGE_ENDPOINT = 'https://www.alpha-orbital.com/assets/images/post_img/'
export const API_ARTICLE_ENDPOINT = 'https://www.alpha-orbital.com/news/'

export function fetchArticles(): Promise<Article[]> {
    return axios.get(API_ENDPOINT).then((response) => response.data)
}

export function useArticles() {
    return useQuery({ queryKey: ['articles'], queryFn: fetchArticles })
}
