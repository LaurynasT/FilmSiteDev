import React from 'react';
import '../styles/About.css';

const About = () => {
    return (
        <div className="about-page">
            <div className="about-container">
                <h1>About This WebSite</h1>
                <p>
                    Welcome to <strong>MovieSearch</strong> – your go-to platform to explore and discover movies and TV shows!
                </p>
                <p>
                    This app uses the <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">TMDB API</a> to fetch up-to-date information on movies and TV shows, including genres, ratings, popularity, and more.
                </p>
                <img
                    src="/TMDB.svg"
                    alt="TMDB Logo"
                    className="tmdb-logo"
                />

                <p>
                    Easily filter your results by genre, release year, or sort by popularity and ratings. Whether you're in the mood for a trending blockbuster or a hidden gem, DiscoverFlix helps you find something great to watch.
                </p>
                <p>
                    Built with ❤️ using <strong>React</strong>, this project demonstrates how to integrate external APIs, manage state with hooks, and create responsive UIs.
                </p>
            </div>
        </div>
    );
};

export default About;
