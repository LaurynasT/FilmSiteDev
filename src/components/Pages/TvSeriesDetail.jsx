import React, { useState, useEffect, useRef } from "react";
import { fetchTvSeriesDetail, fetchTvSeriesCredits, IMAGE_BASE_URL, fetchTvSeasons, fetchTvTrailer } from "../Api/Api";
import { useParams } from "react-router-dom";
import "./TvseriesDetail.css";

const TvSeriesDetails = () => {
    const { id } = useParams();
    const [tvDetail, setTvDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const scrollRef = useRef(null);
    const [credits, setCredits] = useState([]);
    const [seasons, setSeasons] = useState(null);
    const seasonsScrollRef = useRef(null);


    useEffect(() => {
        const loadTvSeriesData = async () => {
            try {
                const [tvData, tvDataCredits, tvSeasons, tvTrailer] = await Promise.all([
                    fetchTvSeriesDetail(id),
                    fetchTvSeriesCredits(id),
                    fetchTvSeasons(id),
                    fetchTvTrailer(id),
                    
                ]);
                console.log('TV Seasons:', tvSeasons);

                setTvDetails(tvData);
                setCredits(tvDataCredits);
                setSeasons(tvSeasons);
                setTrailer(tvTrailer);
            } catch (err) {
                setError("Failed to fetch movie details");
            } finally {
                setLoading(false);
            }
        };

        loadTvSeriesData();
    }, [id]);

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
    };
    const scrollLeftE = () => {
        seasonsScrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRightE = () => {
        seasonsScrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
    };


    if (loading) return <p>Loading movie details...</p>;
    if (error) return <p>{error}</p>;
    if (!tvDetail) return <p>No movie data found.</p>;

    return (
        <div className="tvDetail">
            <div className="tvDetailwidth">
                <div className="background">
                <div className="tvDetail-container">
                    <img
                        src={`${IMAGE_BASE_URL}${tvDetail.poster_path}`}
                        alt={tvDetail.name}
                        className="tvDetail-img"
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
                <div className="tvDetail-genres">
                    {tvDetail.genres.map((genre, index) => (
                        <span key={index} className="genre-badge">{genre.name}</span>
                    ))}
                </div>

                <div className="tvDetail-container2">
                    <h2>{tvDetail.name} ({tvDetail.first_air_date?.split("-")[0]})</h2>
                    <p>{tvDetail.number_of_seasons} Seasons</p>
                    <p>Rating: {tvDetail.vote_average.toFixed(1)}/10</p>
                </div>
                </div>

                <div className="tvDetail-container3">
                    <p><strong>Production companies:</strong> {tvDetail.production_companies.map(company => company.name).join(", ")}</p>
                    <p><strong>Networks:</strong> {tvDetail.networks.map(network => network.name).join(", ")}</p>
                    <p><strong>Overview:</strong> {tvDetail.overview}</p>
                    <p><strong>Status:</strong> {tvDetail.status}</p>
                </div>

                <div>
                    <p className="tvDetail-container3-home">
                        <strong>Homepage: </strong> <br />
                        {tvDetail.homepage ? (
                            <a href={tvDetail.homepage} target="_blank" rel="noopener noreferrer">
                                {tvDetail.homepage}
                            </a>
                        ) : (
                            "No official homepage available"
                        )}
                    </p>
                </div>
            </div>
            <div className="seasons">
                <h2>Season: {seasons.season_number}</h2>
                <div className="seasons-scroll-wrapper">
                    <button className="scroll-button seasons-left" onClick={scrollLeftE}>&#10094;</button>
                    <div className="seasons-scroll-container" ref={seasonsScrollRef}>
                        {seasons.episodes.map((episode) => (
                            <div key={episode.id} className="seasons-card">
                                <img
                                    src={episode.still_path ? `${IMAGE_BASE_URL}${episode.still_path}` : "https://via.placeholder.com/200"}
                                    alt={episode.name}
                                    className="seasons-flex-img"
                                />
                                <p>{episode.name}</p>
                            </div>
                        ))}
                    </div>
                    <button className="scroll-button seasons-right" onClick={scrollRightE}>&#10095;</button>
                </div>
            </div>

            <div className="cast-section">
                <h2 className="h2">Cast</h2>
                <button className="scroll-button cast-left" onClick={scrollLeft}>&#10094;</button>

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

                <button className="scroll-button cast-right" onClick={scrollRight}>&#10095;</button>
            </div>
        </div>
    );
};

export default TvSeriesDetails;
