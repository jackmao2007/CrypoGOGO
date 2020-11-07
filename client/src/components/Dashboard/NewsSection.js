import React, { Component } from 'react';
import News from './News'

class NewsSection extends Component {
    state = { 
        newsList: [
            {
                site: 'jacksweb.com',
                title: 'Bitcoin Signals for Massive Upside, Top Analyst Warns for Risks',
                url: 'https://www.google.com/search?q=Bitcoin',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget sit amet tellus cras adipiscing enim eu turpis. Semper feugiat nibh sed pulvinar. Enim ut sem viverra aliquet eget sit amet ...',
                published: '2020-10-27',
                image: 'https://picsum.photos/300/300',
            },
            {
                site: 'jackswebtwo.com',
                title: 'Mnuchin Says the Money Printer Needs to Brrrrrrrrrrr, Powell Agrees',
                url: 'https://www.youtube.com/watch?v=O1hCLBTD5RM',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget sit amet tellus cras adipiscing enim eu turpis. Semper feugiat nibh sed pulvinar. Enim ut sem viverra aliquet eget sit amet ...',
                published: '2020-10-27',
                image: 'https://picsum.photos/300/300',
            }

        ]
    }

    getNewsFromGoogleNews() {
        // access google news api
        // populate this.state.newsList
    }

    componentDidMount() {
        this.getNewsFromGoogleNews();
    }



    render() { 
        return ( 
            <div className='news-list-container'>
                <h className="news-header"> News </h>
                {this.state.newsList.map(
                    (news) => <News site={news.site} title={news.title} url={news.url} text={news.text} published={news.published} image={news.image}/>)}

                <a className="news-read-more-btn" href="https://www.google.com" target="_blank"> read more </a>
            </div>
        );
    }
}
 
export default NewsSection;