import './ArticleCategory.css';

export interface ArticleCategoryProps {
    categoryId: number;
    categoryName: string;
    categoryCount: number;
    selectCategory: (n : number) => void;
}

export function ArticleCategory({categoryName, categoryCount, categoryId, selectCategory}: ArticleCategoryProps) {

    return (
        <div className='articleCategory' onClick={() => selectCategory(categoryId)}>
            <div className='articleCategoryName'>
                {categoryName}
            </div>
            <div className='articleCategoryCount'>
                {'(' + categoryCount + ')'}
            </div>
        </div>
    )
}
