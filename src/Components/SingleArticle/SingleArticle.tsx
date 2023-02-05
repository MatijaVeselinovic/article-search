import './SingleArticle.css';
import { Article } from '../../Misc/types';
import { API_IMAGE_ENDPOINT, API_ARTICLE_ENDPOINT } from '../../api/ArticlesApi';

type SingleArticleProps = {
    articleData: Article,
    deleteArticle: (slug : string) => void;
}

export function SingleArticle({articleData, deleteArticle}: SingleArticleProps) {

    return (
    <div className='singleArticleContainer'>
        <div className={'singleArticleDelete'} onClick={() => deleteArticle(articleData.slug)}>X</div>
        <div className='singleArticleImageContainer'><a href={API_ARTICLE_ENDPOINT + articleData.slug} target='_blank' rel="noreferrer"><img className='singleArticleImage' alt={articleData.title} src={API_IMAGE_ENDPOINT + articleData.post_image}></img></a></div>
        <div className='singleArticleTextContainer'>
        <p className='singleArticleTitle'><a className='unstyledLink' href={API_ARTICLE_ENDPOINT + articleData.slug} target='_blank' rel="noreferrer">{articleData.title}</a></p>
            <p className='singleArticleDate'>{new Date(articleData.date).toLocaleDateString()}</p>
            <p className='singleArticleExcerpt'>{articleData.excerpt.substring(3, articleData.excerpt.length - 6).replaceAll('&#39;', "'")}</p>
        </div>
        <a className='singleAriticleLink' href={API_ARTICLE_ENDPOINT + articleData.slug} target='_blank' rel="noreferrer" >Full Article</a>
    </div>
    )
}
