import React, { useState } from 'react';

const NewsItem = ({ title, description, content, url, image, publishedAt, removeNews }) => {
    const [readMore, setReadMore] = useState()

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    return <article className="single-tour">
        <img src={image} alt={title} />
        <footer>
            <div className='tour-info'>
                <h4>{title}</h4>
            </div>
            <p>
                {readMore ? description : `${description.substring(0, 100)}...`
                }
                <button onClick={() => { setReadMore(!readMore) }}>
                    {readMore ? 'show less' : 'read more'}
                </button>
            </p>
            <div className="buttonbox">
                <button className="read-btn" onClick={() => openInNewTab(url)}> read article</button>
                <button className="delete-btn" onClick={() => removeNews(url)} >not interested</button>
            </div>
            <div className='publisheddate'>
                <i><p>published on {publishedAt.substring(0, 10)}</p></i>
            </div>
        </footer>
    </article>;
};

export default NewsItem;
