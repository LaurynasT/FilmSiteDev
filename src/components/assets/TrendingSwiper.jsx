import React, { useState, useEffect } from 'react';
import { fetchTrending } from '../Api/Api';  
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules'; 
import { useNavigate } from 'react-router-dom'; 
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import "../styles/Swiper.css";  

const TrendingSwiper = () => {
  const [trendingData, setTrendingData] = useState([]);
  const [timeWindow, setTimeWindow] = useState('day'); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  const loadTrendingData = async () => {
    setLoading(true);
    try {
      const data = await fetchTrending(timeWindow);  
      setTrendingData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading trending data:', error);
      setLoading(false);
    }
  };

  
  const handleTimeWindowChange = (window) => {
    setTimeWindow(window);
  };

 
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
            delay: 3000, 
            disableOnInteraction: false,
          }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          modules={[Autoplay, EffectFade]}
        >
        
        
            {trendingData.map((item) => (
              <SwiperSlide key={item.id}>
                <div
                  className="spotlight-slide"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w1280${item.poster_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '400px',
                  }}
                  onClick={() => navigateToDetail(item)} 
                >
                 
                  <div className="overlay"></div>

                  
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
                          ? `${item.overview.substring(0, 150)}...`  
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
