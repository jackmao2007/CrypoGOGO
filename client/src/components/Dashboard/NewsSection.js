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

        ],
        articles: {},
        maxArticles: 3
    }

    populateNewsSection = () => {
        let newArticles = [];
        const allArticles = this.state.articles.articles;
        for (let i = 0; i < this.state.maxArticles && i < allArticles.length; i++){
            let articleObj = {
                site: allArticles[i].source.name,
                title:  allArticles[i].title,
                url:  allArticles[i].url,
                text:  allArticles[i].content,
                published:  allArticles[i].publishedAt,
                image:  allArticles[i].urlToImage
            };
            newArticles.push(articleObj);
        }
        this.setState({newsList:newArticles, maxArticles: this.state.maxArticles + 2});
    }

    getNewsFromGoogleNews() {
        const apiKey = "b394b31e64e74e78bca68f9d8442cf00";
        const url = "https://cors-anywhere.herokuapp.com/http://newsapi.org/v2/everything?q=crypto&sortBy=date&apiKey=" + apiKey;
        const req = new Request(url)
        return fetch(req)
        .then(response => response.json())
        .then((data) => 
            {
                this.setState({articles: data, }, this.populateNewsSection);
            });
    }

    componentDidMount() {
        this.getNewsFromGoogleNews()
    }

    render() { 
        return ( 
            <div className='news-list-container'>
                <h className="news-header"> News </h>
                {this.state.newsList.map(
                    (news) => <News site={news.site} title={news.title} url={news.url} text={news.text} published={news.published} image={news.image}/>)}

                <button className="news-read-more-btn" onClick={this.populateNewsSection}> read more </button>
            </div>
        );
    
    }
}
 
export default NewsSection;