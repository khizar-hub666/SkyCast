import React, { useState, useEffect, createContext, useContext } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Sun, Moon, MapPin, Search, RefreshCw, Wind, Droplets, Eye, Gauge, Sunrise, Sunset } from 'lucide-react';

// Theme Context
const ThemeContext = createContext();

const lightTheme = {
  primary: '#3B82F6',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  cardBg: 'rgba(255, 255, 255, 0.25)',
  text: '#1F2937',
  textSecondary: '#6B7280',
  border: 'rgba(255, 255, 255, 0.3)',
};

const darkTheme = {
  primary: '#60A5FA',
  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  cardBg: 'rgba(0, 0, 0, 0.25)',
  text: '#F9FAFB',
  textSecondary: '#D1D5DB',
  border: 'rgba(255, 255, 255, 0.2)',
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: ${props => props.theme.background};
    color: ${props => props.theme.text};
    min-height: 100vh;
    transition: all 0.3s ease;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.background};
  padding: 20px;
  transition: all 0.3s ease;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const Logo = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.text};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
  margin: 0 20px;
  
  @media (max-width: 768px) {
    margin: 0;
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 45px 12px 20px;
  border: none;
  border-radius: 25px;
  background: ${props => props.theme.cardBg};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.text};
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: ${props => props.theme.textSecondary};
  }
  
  &:focus {
    transform: scale(1.02);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.textSecondary};
  cursor: pointer;
`;

const ThemeToggle = styled.button`
  background: ${props => props.theme.cardBg};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.border};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${props => props.theme.text};
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }
`;

const MainContent = styled.main`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const WeatherCard = styled.div`
  background: ${props => props.theme.cardBg};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.border};
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 64px rgba(0, 0, 0, 0.15);
  }
`;

const CurrentWeather = styled(WeatherCard)`
  text-align: center;
`;

const Temperature = styled.div`
  font-size: 4rem;
  font-weight: 300;
  margin: 20px 0;
  color: ${props => props.theme.text};
`;

const Location = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const WeatherDescription = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 30px;
  text-transform: capitalize;
`;

const WeatherDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const DetailItem = styled.div`
  text-align: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
`;

const DetailLabel = styled.p`
  color: ${props => props.theme.textSecondary};
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

const DetailValue = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const ForecastContainer = styled(WeatherCard)``;

const ForecastTitle = styled.h3`
  margin-bottom: 20px;
  font-size: 1.3rem;
`;

const ForecastList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ForecastItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateX(5px);
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  
  svg {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

// Custom Hooks
const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async (city = 'London') => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock data for demo purposes
      const mockWeather = {
        name: city,
        main: { temp: 22, feels_like: 25, humidity: 65, pressure: 1013 },
        weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
        wind: { speed: 3.5 },
        visibility: 10000,
        sys: { sunrise: 1640925600, sunset: 1640961600 }
      };
      
      const mockForecast = {
        list: [
          { dt_txt: '2024-01-01', main: { temp_max: 25, temp_min: 18 }, weather: [{ main: 'Sunny' }] },
          { dt_txt: '2024-01-02', main: { temp_max: 23, temp_min: 16 }, weather: [{ main: 'Cloudy' }] },
          { dt_txt: '2024-01-03', main: { temp_max: 20, temp_min: 14 }, weather: [{ main: 'Rain' }] },
          { dt_txt: '2024-01-04', main: { temp_max: 24, temp_min: 17 }, weather: [{ main: 'Partly Cloudy' }] },
          { dt_txt: '2024-01-05', main: { temp_max: 26, temp_min: 19 }, weather: [{ main: 'Sunny' }] }
        ]
      };
      
      setWeather(mockWeather);
      setForecast(mockForecast);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return { weather, forecast, loading, error, fetchWeather };
};

const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDark));
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return { isDark, toggleTheme, theme: isDark ? darkTheme : lightTheme };
};

// Components
const WeatherIcon = ({ condition, size = 64 }) => {
  const iconMap = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Snow': '❄️',
    'Thunderstorm': '⛈️',
    'Drizzle': '🌦️',
    'Mist': '🌫️',
    'Sunny': '☀️',
    'Cloudy': '☁️',
    'Partly Cloudy': '⛅'
  };
  
  return (
    <span style={{ fontSize: `${size}px`, display: 'block', margin: '20px 0' }}>
      {iconMap[condition] || '☀️'}
    </span>
  );
};

function App() {
  const { isDark, toggleTheme, theme } = useTheme();
  const { weather, forecast, loading, error, fetchWeather } = useWeather();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchWeather(searchQuery.trim());
      setSearchQuery('');
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Header>
          <Logo>
            <Sun size={32} />
            SkyCast
          </Logo>
          
          <SearchContainer>
            <form onSubmit={handleSearch}>
              <SearchInput
                type="text"
                placeholder="Search for a city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchIcon size={20} onClick={handleSearch} />
            </form>
          </SearchContainer>
          
          <ThemeToggle onClick={toggleTheme}>
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </ThemeToggle>
        </Header>

        {loading ? (
          <LoadingSpinner>
            <RefreshCw size={48} />
          </LoadingSpinner>
        ) : error ? (
          <WeatherCard>
            <p style={{ textAlign: 'center', color: '#ef4444' }}>{error}</p>
          </WeatherCard>
        ) : (
          <MainContent>
            <CurrentWeather>
              <Location>
                <MapPin size={24} />
                {weather?.name}
              </Location>
              
              <WeatherIcon condition={weather?.weather[0]?.main} size={80} />
              
              <Temperature>{Math.round(weather?.main?.temp)}°C</Temperature>
              
              <WeatherDescription>
                {weather?.weather[0]?.description}
              </WeatherDescription>
              
              <WeatherDetails>
                <DetailItem>
                  <DetailLabel>Feels like</DetailLabel>
                  <DetailValue>{Math.round(weather?.main?.feels_like)}°C</DetailValue>
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>Humidity</DetailLabel>
                  <DetailValue>
                    <Droplets size={16} />
                    {weather?.main?.humidity}%
                  </DetailValue>
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>Wind</DetailLabel>
                  <DetailValue>
                    <Wind size={16} />
                    {weather?.wind?.speed} m/s
                  </DetailValue>
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>Pressure</DetailLabel>
                  <DetailValue>
                    <Gauge size={16} />
                    {weather?.main?.pressure} hPa
                  </DetailValue>
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>Visibility</DetailLabel>
                  <DetailValue>
                    <Eye size={16} />
                    {(weather?.visibility / 1000).toFixed(1)} km
                  </DetailValue>
                </DetailItem>
                
                <DetailItem>
                  <DetailLabel>Sunrise</DetailLabel>
                  <DetailValue>
                    <Sunrise size={16} />
                    {formatTime(weather?.sys?.sunrise)}
                  </DetailValue>
                </DetailItem>
              </WeatherDetails>
            </CurrentWeather>

            <ForecastContainer>
              <ForecastTitle>5-Day Forecast</ForecastTitle>
              <ForecastList>
                {forecast?.list?.map((item, index) => (
                  <ForecastItem key={index}>
                    <div>
                      <p style={{ fontWeight: '600' }}>
                        {index === 0 ? 'Today' : new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })}
                      </p>
                      <p style={{ color: theme.textSecondary, fontSize: '0.9rem' }}>
                        {item.weather[0].main}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <WeatherIcon condition={item.weather[0].main} size={32} />
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontWeight: '600' }}>{Math.round(item.main.temp_max)}°</p>
                        <p style={{ color: theme.textSecondary }}>{Math.round(item.main.temp_min)}°</p>
                      </div>
                    </div>
                  </ForecastItem>
                ))}
              </ForecastList>
            </ForecastContainer>
          </MainContent>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;