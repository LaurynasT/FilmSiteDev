import React, { useState, useEffect } from 'react';
import { fetchTrending } from '../Api/Api';  
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules'; // 👈 import modules
import { useNavigate } from 'react-router-dom'; // For navigation
import 'swiper/css';
import 'swiper/css/effect-fade'; // 👈 Needed for fade effect to work properly
import 'swiper/css/autoplay';
import "../styles/Swiper.css";  // Make sure you have styles for this

const TrendingSwiper = () => {
  const [trendingData, setTrendingData] = useState([]);
  const [timeWindow, setTimeWindow] = useState('day'); // 'day' or 'week' for time window
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  const loadTrendingData = async () => {
    setLoading(true);
    try {
      const data = await fetchTrending(timeWindow);  // Pass timeWindow here
      setTrendingData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading trending data:', error);
      setLoading(false);
    }
  };

  // Switch between 'day' and 'week' trends
  const handleTimeWindowChange = (window) => {
    setTimeWindow(window);
  };

  // Navigate to the appropriate detail page based on the media type
  const navigateToDetail = (item) => {
    if (item.media_type === 'movie') {
      navigate(`/MovieDetail/${item.id}`);
    } else if (item.media_type === 'tv') {
      navigate(`/TvSeriesDetail/${item.id}`);
    } else if (item.media_type === 'person') {
      navigate(`/ActorDetail/${item.id}`);
    }
  };

  useEffect(() => {
    loadTrendingData(); 
  }, [timeWindow]);

  return (
    <div>
        <h2>Trending</h2>
        
        {/* Button Container for Day/Week Toggle */}
        <div className="swipercategory">
          <div className="swipercategory-buttons">
            <button 
              onClick={() => handleTimeWindowChange('day')} 
              className={timeWindow === 'day' ? 'active' : ''}
            >
              Day
            </button>
            <button 
              onClick={() => handleTimeWindowChange('week')} 
              className={timeWindow === 'week' ? 'active' : ''}
            >
              Week
            </button>
          </div>
        </div>

        
        {loading && <div>Loading...</div>}

        
        {!loading && (
          <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000, // 3 seconds between slides (you can adjust)
            disableOnInteraction: false,
          }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          modules={[Autoplay, EffectFade]} // 👈 required
        >
        
        
            {trendingData.map((item) => (
              <SwiperSlide key={item.id}>
                <div
                  className="spotlight-slide"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w1280${item.poster_path})`, // Larger image
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '400px', // Adjust height for smaller section
                  }}
                  onClick={() => navigateToDetail(item)} // Navigate to the detail page on click
                >
                  {/* Dark Overlay */}
                  <div className="overlay"></div>

                  {/* Spotlight Content */}
                  <div className="spotlight-content">
                    <div className="spotlight-thumbnail">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                        alt={item.title || item.name}
                        className="thumbnail-image"
                      />
                    </div>

                    <div className="spotlight-info">
                      <div className="spotlight-title">
                        {item.title || item.name}
                      </div>
                      <div className="spotlight-description">
                        {item.overview && item.overview.length > 150
                          ? `${item.overview.substring(0, 150)}...`  // Truncate the description
                          : item.overview}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
    </div>
  );
};

export default TrendingSwiper;
