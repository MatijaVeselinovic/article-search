import './SingleArticle.css';
import { Article } from '../../Misc/types';
import { API_IMAGE_ENDPOINT, API_ARTICLE_ENDPOINT } from '../../api/ArticlesApi';

type SingleArticleProps = {
    articleData: Article
}

export function SingleArticle({articleData}: SingleArticleProps) {

    return (
    <div className='singleArticleContainer'>
        <div className='singleArticleImageContainer'><img className='singleArticleImage' alt={articleData.title} src={API_IMAGE_ENDPOINT + articleData.post_image}></img></div>
        <div className='singleArticleTextContainer'>
            <p className='singleArticleTitle'>{articleData.title}</p>
            <p className='singleArticleDate'>{new Date(articleData.date).toLocaleDateString()}</p>
            <p className='singleArticleExcerpt'>{articleData.excerpt.substring(3, articleData.excerpt.length - 6).replaceAll('&#39;', "'")}</p>
        </div>
        <a className='singleAriticleLink' href={API_ARTICLE_ENDPOINT + articleData.slug} target='_blank' rel="noreferrer" >Full Article</a>
    </div>
    )
}
