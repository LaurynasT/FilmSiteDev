import React, { useState, useEffect, useRef } from "react";
import { fetchPopularMovies, IMAGE_BASE_URL } from "./Api/Api";
import { useNavigate } from 'react-router-dom';
import "./styles/ItemCard.css";

const PopularMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        const loadPopularMovies = async () => {
            setLoading(true);
            try {
                const [popularMovies] = await Promise.all([
                    fetchPopularMovies(),
                ])
                setMovies(popularMovies);
            } catch (err) {
                setError("Failed to fetch movies");
            } finally {
                setLoading(false);
            }
        };

        loadPopularMovies();
    }, []);

    const navigate = useNavigate();
    const goToMovieDetail = (id) => {
        navigate(`MovieDetail/${id}`);
    };

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    if (loading) return <p>Loading movies...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <div className="scroll-container">
                <button className="scroll-button left" onClick={scrollLeft}>&#10094;</button>
                <div className="scroll-content" ref={scrollRef}>
                    {movies.map((movie) => (
                        <div key={movie.id} className="flip-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <img
                                        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                                        alt={movie.title}
                                        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "25px" }}
                                    />
                                </div>
                                <div className="flip-card-back">
                                    <h3 className="title">{movie.title} ({new Date(movie.release_date).getFullYear()})</h3>
                                    <p>⭐ {movie.vote_average.toFixed(1)}</p>
                                    <button className="button1" onClick={() => goToMovieDetail(movie.id)}>View Details</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="scroll-button right" onClick={scrollRight}>&#10095;</button>
            </div>
        </div>
    );
};

export default PopularMovies;
