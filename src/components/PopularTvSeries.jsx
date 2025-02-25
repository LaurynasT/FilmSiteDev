import React, { useState, useEffect, useRef } from "react";
import { fetchPopularTvSeries, IMAGE_BASE_URL } from "./Api/Api";
import { useNavigate } from "react-router-dom";
import "./ItemCard.css";

const PopularTvSeries = () => {
    const [tvseries, setTvSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        const loadPopularTvSeries = async () => {
            setLoading(true);
            try {
                const[popularTvSeries] = await Promise.all ([
                    fetchPopularTvSeries(),
                ])
                setTvSeries(popularTvSeries);
            } catch (err) {
                setError("Failed to fetch movies");
            } finally {
                setLoading(false);
            }
        };

        loadPopularTvSeries();
    }, []);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    const navigate = useNavigate();
    const goToTvSeriesDetail = (id) => {
        navigate(`TvSeriesDetail/${id}`);
    };


    if (loading) return <p>Loading movies...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            
            <div className="scroll-container">
                <button className="scroll-button left" onClick={scrollLeft}>&#10094;</button>
                <div className="scroll-content" ref={scrollRef}>
                    {tvseries.map((tv) => (
                        <div key={tv.id} className="flip-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <img
                                        src={`${IMAGE_BASE_URL}${tv.poster_path}`}
                                        alt={tv.name}
                                        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "25px"}}
                                    />
                                </div>

                                <div className="flip-card-back">
                                    <h3>{tv.name}</h3>
                                    <p>⭐ {tv.vote_average.toFixed(1)}</p>
                                    <button className="button1" onClick={() => goToTvSeriesDetail(tv.id)}>View Details</button>
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

export default PopularTvSeries;
