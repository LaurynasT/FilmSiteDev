import React, { useState, useEffect, useRef } from "react";
import { fetchTvSeriesDetail, fetchTvSeriesCredits, IMAGE_BASE_URL, fetchTvSeasons, fetchTvTrailer, fetchSimilarTvSeries } from "../Api/Api";
import FavoriteButton from "../assets/FavoriteButton";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/TvseriesDetail.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { ScrollLeft, ScrollRight } from "../assets/Scroll.jsx";
import WatchListButton from "../assets/WatchListButton.jsx";

const TvSeriesDetails = () => {
    const { id } = useParams();
    const [tvDetail, setTvDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [credits, setCredits] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [similar, setSimilar] = useState([]);
    const scrollRef = useRef(null);
    const seasonsScrollRef = useRef(null);
    const navigate = useNavigate();
    const similarScrollRef = useRef(null);


    useEffect(() => {
        const loadTvSeriesData = async () => {
            try {
                const [tvData, tvDataCredits, tvSeasons, tvTrailer, tvSimilar] = await Promise.all([
                    fetchTvSeriesDetail(id),
                    fetchTvSeriesCredits(id),
                    fetchSimilarTvSeries(id),
                    fetchTvTrailer(id),

                ]);
                console.log('TV Seasons:', tvSeasons);
                setTvDetails(tvData);
                setCredits(tvDataCredits);
                setSimilar(tvSimilar);
                setTrailer(tvTrailer);

                fetchSeasonEpisodes(1);
            } catch (err) {
                setError("Failed to fetch movie details");
            } finally {
                setLoading(false);
            }
        };

        loadTvSeriesData();
    }, [id]);

    const fetchSeasonEpisodes = async (seasonNumber) => {
        try {
            const tvSeasons = await fetchTvSeasons(id, seasonNumber);
            setEpisodes(tvSeasons.episodes);
            setSelectedSeason(seasonNumber);
        } catch (err) {
            setError("Failed to fetch episodes");
        }
    };

    const handleToggleFavorite = (isFavorite) => {
        toast(
            `TV series ${isFavorite ? 'added to' : 'removed from'} favorites`,
            { type: isFavorite ? 'success' : 'info' }
        );
    };

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

    const handleNavigateToActor = id => {
        navigate(`/ActorDetail/${id}`);
    }


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
                        <div style={{ marginTop: 15 }}>
                            <FavoriteButton
                                mediaId={tvDetail.id}
                                mediaType="tv"
                                title={tvDetail.name}
                                posterPath={tvDetail.poster_path}
                                onToggle={handleToggleFavorite}
                            />
                            <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} />
                        </div>
                        <div style={{ marginTop: 17 }}>
                            <WatchListButton
                                mediaId={tvDetail.id}
                                mediaType="tv"
                                title={tvDetail.name}
                                posterPath={tvDetail.poster_path}
                                onToggle={(isAdded) => console.log(isAdded ? 'Added to watchlist' : 'Removed from watchlist')}
                            />
                        </div>
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
                <h2>Seasons</h2>
                <select
                    value={selectedSeason}
                    onChange={(e) => fetchSeasonEpisodes(e.target.value)}
                    className="seasons-dropdown"
                >
                    {Array.from({ length: tvDetail.number_of_seasons }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            Season {i + 1}
                        </option>
                    ))}
                </select>
                <div className="seasons-scroll-wrapper">
                    <button className="scroll-button seasons-left" onClick={scrollLeftE}>&#10094;</button>
                    {episodes.length > 0 ? (
                        <div className="seasons-scroll-container" ref={seasonsScrollRef}>
                            {episodes.map((episode) => (
                                <div key={episode.id} className="seasons-card">
                                    <img
                                        src={episode.still_path ? `${IMAGE_BASE_URL}${episode.still_path}` : "https://via.placeholder.com/200"}
                                        alt={episode.name}
                                        className="seasons-flex-img"
                                    />
                                    <p>{episode.episode_number}. {episode.name}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No episodes available for this season.</p>
                    )}
                    <button className="scroll-button seasons-right" onClick={scrollRightE}>&#10095;</button>
                </div>

            </div>
            <div className="cast-section">
                <h2 className="h2">Cast</h2>
                <div className="cast-scroll-wrapper">
                    <button className="scroll-button cast-left" onClick={scrollLeft}>&#10094;</button>
                    <div className="cast-scroll-container" ref={scrollRef}>
                        {credits.cast.map((cast) => (
                            <div key={cast.id} className="cast-card" onClick={() => handleNavigateToActor(cast.id)}>
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
            <div className="similar-section">
                <h2 style={{ color: "black" }}>Similar Tv Series </h2>
                <div className="similar-scroll-wrapper">
                    <ScrollLeft scrollRef={similarScrollRef} />
                    <div className="similar-scroll-container" ref={similarScrollRef}>
                        
                        {Array.isArray(similar) && similar.length > 0 ? (
                            similar.map((similars) => (
                                <div className="similar-card" key={similars.id} onClick={() => handleNavigateToDetail(similars.id)}>
                                    <img
                                        src={similars.poster_path ? `${IMAGE_BASE_URL}${similars.poster_path}` : "https://via.placeholder.com/120"}
                                        alt={similars.title}
                                        className="similar-image"
                                    />
                                    <p style={{ color: "black" }}>{similars.title}</p>
                                </div>
                            ))
                        ) : (
                            <p style={{ color: "black" }}>No similar Tv series available.</p>
                        )}
                    </div>
                    <ScrollRight scrollRef={similarScrollRef} />
                </div>
            </div>


        </div>
    );
};

export default TvSeriesDetails;
