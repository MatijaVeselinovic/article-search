export interface Article {
    date: Date;
    excerpt: string;
    post_category_id: number;
    post_image: string;
    post_thumbnail: string;
    slug: string;
    title: string;
}

export interface Category {
    categoryId: number;
    categoryName: string;
    categoryCount: number;
}

export const ArticleCategoryEnum  = {
    1: 'X Universe',
    2: 'Elite: Dangerous',
    3: 'Starpoint Gemini',
    4: 'EVE Online'
}
