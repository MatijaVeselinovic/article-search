import './ArticlesContainer.css';
import { SingleArticle } from '../SingleArticle/SingleArticle';
import { fetchArticles, useArticles } from '../../api/ArticlesApi';
import { useState, useEffect } from 'react';
import { ArticleCategory } from '../ArticleCategory/ArticleCategory';
import { Category, ArticleCategoryEnum, Article } from '../../Misc/types';
import { isolateUniqueCategoryPairsAndCount, navigateWithParams } from '../../Misc/utils';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';

export function ArticlesContainer() {
    const [activeCategory, setActiveCategory] = useState<number>(0)
    const [categories, setCategories] = useState<Category[]>([])
    const [articles, setArticles] = useState<Article[]>([])
    const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [searchValue, setSearchValue] = useState<string>('')
    const [deletePopupSlug, setDeletePopupSlug] = useState<string>('')
    const [deleteCategoryIdPopup, setDeleteCategoryIdPopup] = useState<string>('')
    const [toggleCategoryList, setToggleCategoryList] = useState<boolean>(false)

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
                setSearchValue(query)
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
                const fuse = new Fuse(filtered, {
                    keys: [
                        'title',
                        'excerpt'
                    ]
                })
                filtered = fuse.search(searchQuery).map(result => result.item)
            }
            setFilteredArticles(filtered)
        }

    }, [articles, searchQuery, activeCategory, navigate]);

    const checkDeleteArticle = (slug: string) => {
        setDeletePopupSlug(slug);
    }

    const deleteArticle = (slug: string) => {
        setArticles(articles.filter((article) => article.slug !== slug));
        setDeletePopupSlug('')
    }

    const refetchData = () => {
        fetchArticles().then(data => {
            setArticles(data);
        })
    }

    const checkDeleteCategoryArticles = (categoryId: number) => {
        setDeleteCategoryIdPopup(categoryId.toString())
    }

    const deleteCategoryArticles = (categoryId: string) => {
        setArticles(articles.filter((article) => article.post_category_id.toString() !== categoryId.toString()));
        setDeleteCategoryIdPopup('')
    }

    //add skeleton
    if (isLoading) return <div>Skeleton</div>

    //add some error example
    if (error) return <div>"An error has occurred: "</div>

    if (data) return (
        <>
        {deletePopupSlug.length > 0 &&
            <div className='popupBackground' onClick={() => setDeletePopupSlug('')}>
                <div className='popup'>
                    <p>Are you sure you want to delete this article?</p>
                    <div className='popupButtonContainer'>
                        <button onClick={() => deleteArticle(deletePopupSlug)}>Yes, I am sure</button>
                        <button onClick={() => setDeletePopupSlug('')}>No, cancel</button>
                    </div>
                </div>
            </div>
        }
        {deleteCategoryIdPopup.length > 0 &&
            <div className='popupBackground' onClick={() => setDeleteCategoryIdPopup('')}>
                <div className='popup'>
                    <p>Are you sure you want to delete this category?</p>
                    <div className='popupButtonContainer'>
                        <button onClick={() => deleteCategoryArticles(deleteCategoryIdPopup)}>Yes, I am sure</button>
                        <button onClick={() => setDeleteCategoryIdPopup('')}>No, cancel</button>
                    </div>
                </div>
            </div>
        }
        <div className='articlesWrapper'>
            <div className='articlesNavbar'>
                {categories.map((category) => {
                    if(category.categoryCount > 0)
                    return <ArticleCategory key={category.categoryName} selectCategory={((category) => setActiveCategory(category))} categoryId={category.categoryId} categoryName={category.categoryName} categoryCount={category.categoryCount} deleteCategoryArticles={() => {}}/>
                })}
                <ArticleCategory selectCategory={(category) => setActiveCategory(category)} categoryId={0} categoryName={'Show all'} categoryCount={articles.length} deleteCategoryArticles={() => {}} />
            </div>
            <div className='searchInputContainer'>
                <input className='searchInput' placeholder='Search articles' value={searchValue} onInput={(e) => setSearchValue(e.currentTarget.value)} type={'text'}></input>
                <button onClick={() => setSearchQuery(searchValue)}>SEARCH</button>
            </div>
            <div className='toggleButtonContainer'>
                <button onClick={() => setToggleCategoryList(!toggleCategoryList)}>Toggle categories</button>
                {toggleCategoryList && categories.map((category) => {
                    if(category.categoryCount > 0)
                    return <ArticleCategory key={category.categoryName} selectCategory={() => {}} categoryId={category.categoryId} categoryName={category.categoryName} categoryCount={category.categoryCount} verticalMenu={true} deleteCategoryArticles={(cat) => checkDeleteCategoryArticles(cat)}/>
                })}
            </div>
            <div className='articlesCountInfo'>
                {articles.length < 100 && activeCategory === 0 && <button className='refetchButton' onClick={() => refetchData()}>Refetch</button>}
                <div className='articlesCount'>Currently showing {filteredArticles.length} articles</div>
            </div>
            <div className='articlesContainer'>
                {filteredArticles.length !== 0 ? filteredArticles.map((article) => (
                    <SingleArticle key={article.slug} articleData={article} deleteArticle={checkDeleteArticle} />
                )) : <div className='noResultsContainer'>
                        No results for the given query
                    </div>}
            </div>
        </div>
        </>
    )

    return null
}
