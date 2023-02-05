import './ArticlesContainer.css';
import { SingleArticle } from '../SingleArticle/SingleArticle';
import { useArticles } from '../../api/ArticlesApi';
import { useState, useEffect } from 'react';
import { ArticleCategory } from '../ArticleCategory/ArticleCategory';
import { Category, ArticleCategoryEnum, Article } from '../../Misc/types';
import { isolateUniqueCategoryPairsAndCount, navigateWithParams } from '../../Misc/utils';
import { useNavigate } from 'react-router-dom';

export function ArticlesContainer() {
    const [activeCategory, setActiveCategory] = useState<number>(0)
    const [categories, setCategories] = useState<Category[]>([])
    const [articles, setArticles] = useState<Article[]>([])
    const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
    const [searchQuery, setSearchQuery] = useState<string>('')

    const { isLoading, error, data } = useArticles();
    const navigate = useNavigate();

    useEffect(() => {
        if(articles){
            const paramsString = window.location.search;
            const searchParams = new URLSearchParams(paramsString);
            const query = searchParams.get('query');
            const filter = searchParams.get('filter');
            if(filter) {
                setActiveCategory(parseInt(filter))
            }
            if(query) {
                setSearchQuery(query)
            }
        }
    }, [articles])

    useEffect(() => {
        if (data) {
            setArticles(data);
            setFilteredArticles(data);
        }
    }, [data])

    useEffect(() => {
        const uniqueCategoriesAndCounts = isolateUniqueCategoryPairsAndCount(articles);
        let categories: Category[] = [];

        for(let i = 0; i < Object.keys(uniqueCategoriesAndCounts).length; i++) {
            const category: Category = {
                categoryId: parseInt(Object.keys(uniqueCategoriesAndCounts)[i]),
                categoryName: Object.values(ArticleCategoryEnum)[i],
                categoryCount: Object.values(uniqueCategoriesAndCounts)[i] as number
            }
            categories.push(category);
        }
        setCategories(categories);

    }, [articles])

    useEffect(() => {
        if(articles){
            if(searchQuery || activeCategory) {
                navigateWithParams(navigate, {
                    query: searchQuery.length >= 3 ? searchQuery : '',
                    filter: activeCategory.toString(),
                });
            }

            let filtered: Article[] = []

            if(activeCategory !== undefined) {
                filtered = activeCategory === 0 ? articles : articles.filter((article) => article.post_category_id.toString() === activeCategory.toString())
            }
            if(searchQuery.length >= 3) {
                filtered = filtered.filter((a) => a.title.toLowerCase().includes(searchQuery))
            }
            setFilteredArticles(filtered)
        }

    }, [articles, searchQuery, activeCategory, navigate])

    if (isLoading) return <div>Skeleton</div>

    if (error) return <div>"An error has occurred: "</div>

    if (data) return (
        <div className='articlesWrapper'>
            <div className='articlesNavbar'>
                {categories.map((category) => (
                    <ArticleCategory key={category.categoryName} selectCategory={(category) => setActiveCategory(category)} categoryId={category.categoryId} categoryName={category.categoryName} categoryCount={category.categoryCount}/>
                ))}
                <ArticleCategory selectCategory={(category) => setActiveCategory(category)} categoryId={0} categoryName={'Show all'} categoryCount={articles.length} />
            </div>
            <div className='searchInputContainer'><input className='searchInput' placeholder='Search articles' value={searchQuery} onInput={(e) => setSearchQuery(e.currentTarget.value)} type={'text'}></input></div>
            <p className='articlesCount'>Currently showing {articles.length} articles</p>
            <div className='articlesContainer'>
                {filteredArticles.length !== 0 ? filteredArticles.map((article) => (
                    <SingleArticle key={article.slug} articleData={article} />
                )) : <div className='noResultsContainer'>
                        No results for a given query
                    </div>}
            </div>
        </div>
    )

    return null
}
