import React from 'react';
import NewsItem from './NewsItem';

const NewsList = ({ thenews, removeNews }) => {
    return (
        <section>
            <div>
                {thenews.map((news) => {
                    return <NewsItem key={news.url} {...news}
                        removeNews={removeNews} />;
                }
                )}
            </div>
        </section>
    )
};

export default NewsList;
