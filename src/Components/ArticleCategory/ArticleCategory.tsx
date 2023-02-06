import './ArticleCategory.css';

export interface ArticleCategoryProps {
    categoryId: number;
    categoryName: string;
    categoryCount: number;
    selectCategory: (n : number) => void;
    deleteCategoryArticles: (n : number) => void;
    verticalMenu?: boolean;
}

export function ArticleCategory({categoryName, categoryCount, categoryId, verticalMenu, selectCategory, deleteCategoryArticles}: ArticleCategoryProps) {

    return (
        <div className={verticalMenu ? 'verticalArticleCategory' : 'articleCategory'} onClick={() => selectCategory(categoryId)}>
            <div className='articleCategoryName'>
                {categoryName}
                {verticalMenu && <div className='articleCategoryCount'>
                    {' (' + categoryCount + ')'}
                </div>
                }
            </div>

            {verticalMenu && <div className='deleteArticleCategory' onClick={() => deleteCategoryArticles(categoryId)}>
                X
            </div>
            }
        </div>
    )
}
