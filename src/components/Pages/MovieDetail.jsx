import { fetchMovieDetail, fetchMovieTrailer, fetchMovieCredits, IMAGE_BASE_URL } from "../Api/Api.jsx"; 
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./Moviedetail.css";

const MovieDetail = () => {
    const { id } = useParams();
    const [movieDetail, setMovieDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [credits, setCredits] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        const loadMovieData = async () => {
            setLoading(true);
            try {
                const [movieData, trailerData, creditsData] = await Promise.all([
                    fetchMovieDetail(id),
                    fetchMovieTrailer(id),
                    fetchMovieCredits(id),
                ]);

                setMovieDetail(movieData);
                setTrailer(trailerData);
                setCredits(creditsData);
            } catch (err) {
                setError("Failed to fetch movie data");
            } finally {
                setLoading(false);
            }
        };

        loadMovieData();
    }, [id]);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    if (loading) return <p>Loading movie details...</p>;
    if (error) return <p>{error}</p>;
    if (!movieDetail) return <p>No movie data found.</p>;

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
                        <div className="trailer-container iframe">
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
                        <span key={index} className="genre-badge">{genre.name}</span>
                    ))}
                </div>

                <div className="moviedetail-container2">
                    <h2>{movieDetail.title} ({movieDetail.release_date?.split("-")[0]})</h2>
                    <p>{movieDetail.runtime} minutes</p>
                    <p>Rating: {movieDetail.vote_average.toFixed(1)}/10</p>
                </div>
                </div>

                <div className="moviedetail-container3">
                    <p><strong>Production companies:</strong> {movieDetail.production_companies.map(company => company.name).join(", ")}</p>
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
                <button className="scroll-button left" onClick={scrollLeft}>&#10094;</button>

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

                <button className="scroll-button right" onClick={scrollRight}>&#10095;</button>
            </div>
        </div>
    );
};

export default MovieDetail;
