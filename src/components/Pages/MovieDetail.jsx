import { fetchMovieDetail, fetchMovieTrailer, fetchMovieCredits, fetchSimilar, fetchMovieReviews, IMAGE_BASE_URL } from "../Api/Api.jsx";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "../styles/Moviedetail.css";
import {ScrollLeft, ScrollRight} from "../assets/Scroll.jsx";


const MovieDetail = () => {
    const { id } = useParams();
    const [movieDetail, setMovieDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [credits, setCredits] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [reviews, setReviews] = useState([]);
    const scrollRef = useRef(null);
    const similarScrollRef = useRef(null);

    useEffect(() => {
        const loadMovieData = async () => {
            setLoading(true);
            try {
                const [movieData, trailerData, creditsData, similarMovies, movieReviews] = await Promise.all([
                    fetchMovieDetail(id),
                    fetchMovieTrailer(id),
                    fetchMovieCredits(id),
                    fetchSimilar(id),
                    fetchMovieReviews(id),
                    
                ]);

                setMovieDetail(movieData);
                setTrailer(trailerData);
                setCredits(creditsData);
                setSimilar(similarMovies);
                setReviews(movieReviews);
            } catch (err) {
                setError("Failed to fetch movie data");
            } finally {
                setLoading(false);
            }
        };

        loadMovieData();
    }, [id]);

    
    
    const stripHtml = (html) => {
        return html.replace(/<[^>]*>/g, ''); 
    };
    
    const navigate = useNavigate();
    const goToCompanyDetail = (companyId) => {
        navigate(`/CompanyDetail/${companyId}`);
    };

    if (loading) return <p>Loading movie details...</p>;
    if (error) return <p>{error}</p>;
    if (!movieDetail) return <p style={{marginTop: "60px"}}>No movie data found.</p>;

    const rating = movieDetail.vote_average * 10;

    return (
        <div className="moviedetail">
            <div className="moviedetailwidth">
                <div className="background">
                    <div className="moviedetail-container">
                        <img
                            src={`${IMAGE_BASE_URL}${movieDetail.poster_path}`}
                            alt={movieDetail.title}
                            className="moviedetail-img"
                        />
                        {trailer ? (
                            <div className="movie-trailer-container iframe">
                                <iframe
                                    src={trailer}
                                    title="Movie Trailer"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <p>No trailer available</p>
                        )}
                    </div>
                    <div className="moviedetail-genres">
                        {movieDetail.genres.map((genre, index) => (
                            <span key={index} className="movie-genre-badge">{genre.name}</span>
                        ))}
                    </div>

                    <div className="moviedetail-container2">
                        <h2>{movieDetail.title} ({movieDetail.release_date?.split("-")[0]})</h2>
                        <p>{movieDetail.runtime} minutes</p>
                        <p>Rating: {movieDetail.vote_average.toFixed(1)}/10</p>
                        <div style={{ width: 50, height: 50, margin: "10px"}}>
                        <CircularProgressbar 
                        value={rating}
                        text={`${rating}%`}
                        styles={buildStyles({
                            textColor: "white",
                            pathColor: rating > 70 ? "green" : rating > 40 ? "orange" : "red",
                            trailColor: "#d6d6d6"
                        })}
                        />
                        </div>
                    </div>
                </div>

                <div className="moviedetail-container3">
                    <p>
                        <strong>Production companies: </strong>
                        {movieDetail.production_companies.map((company, index) => (
                            <span
                                key={company.id}
                                onClick={() => goToCompanyDetail(company.id)}
                                style={{ cursor: 'pointer', color: 'blue' }} 
                            >
                                {company.name}
                                {index < movieDetail.production_companies.length - 1 && ", "}
                            </span>
                        ))}
                    </p>
                    <p><strong>Budget:</strong> ${movieDetail.budget.toLocaleString()}</p>
                    <p><strong>Revenue:</strong> ${movieDetail.revenue.toLocaleString()}</p>
                    <p><strong>Overview:</strong> {movieDetail.overview}</p>
                    <p><strong>Status:</strong> {movieDetail.status}</p>
                </div>

                <div>
                    <p className="moviedetail-container3-home">
                        <strong>Homepage: </strong> <br />
                        {movieDetail.homepage ? (
                            <a href={movieDetail.homepage} target="_blank" rel="noopener noreferrer">
                                {movieDetail.homepage}
                            </a>
                        ) : (
                            "No official homepage available"
                        )}
                    </p>
                </div>
            </div>

            <div className="cast-section">
                <h2 className="h2">Cast</h2>
                <div className="cast-scroll-wrapper">
                    <ScrollLeft scrollRef={scrollRef}/>
                    <div className="cast-scroll-container" ref={scrollRef}>
                        {credits.cast.map((cast) => (
                            <div key={cast.id} className="cast-card">
                                <img
                                    src={cast.profile_path ? `${IMAGE_BASE_URL}${cast.profile_path}` : "https://via.placeholder.com/120"}
                                    alt={cast.name}
                                    className="cast-image"
                                />
                                <p className="cast-name">{cast.name}</p>
                                <p className="cast-character">as {cast.character}</p>
                            </div>
                        ))}
                    </div>

                   <ScrollRight scrollRef={scrollRef} />
                </div>
            </div>
            <div className="cast-section">
            <h2 style={{color: "black"}}>Similar Movies</h2>
            <div className="cast-scroll-wrapper">
            <ScrollLeft scrollRef={scrollRef}/>
            <div className="cast-scroll-container" ref={similarScrollRef}>
                {similar.map((similars) => (
                    <div className="cast-card" key={similars.id}>
                        
                         <img
                                    src={similars.poster_path ? `${IMAGE_BASE_URL}${similars.poster_path}` : "https://via.placeholder.com/120"}
                                    alt={similars.title}
                                    
                                    
                                />
                        <p style={{color: "black"}}>{similars.title}</p>
                    </div>
                ))}
            </div>
            <ScrollRight scrollRef={similarScrollRef} />
            </div>
            </div>
            <div>
            <h2 style={{color: "black"}}>Comments</h2>
                {reviews.map((review) => (
                    <div key={review.id}>
                        <p style={{color: "black"}}><strong>Name: </strong>{review.author}</p>
                        <p style={{color: "black"}}>{stripHtml(review.content)}</p>
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default MovieDetail;
