# SkyCast - Modern Weather Dashboard

A professional, visually striking weather forecasting dashboard built with React. Features a clean, modern design with glassmorphism effects, dark/light mode, and responsive layout.

## Features

- **Modern UI Design**: Glassmorphism cards with backdrop blur effects
- **Dynamic Themes**: Light/Dark mode with smooth transitions
- **Responsive Layout**: Mobile-first design that works on all devices
- **Weather Data**: Current weather, 5-day forecast, and detailed metrics
- **Interactive Elements**: Smooth animations and hover effects
- **Search Functionality**: City search with auto-suggestions
- **Professional Styling**: Production-ready design with attention to detail

## Tech Stack

- React 18 with Hooks
- Styled Components for styling
- Lucide React for icons
- OpenWeatherMap API integration
- Local Storage for theme persistence

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure API Key**
   - Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
   - Update the `.env` file with your API key:
     ```
     REACT_APP_WEATHER_API_KEY=your_actual_api_key_here
     ```

3. **Start Development Server**
   ```bash
   npm start
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── App.js          # Main application component
├── index.js        # React entry point
public/
├── index.html      # HTML template
package.json        # Dependencies and scripts
.env               # Environment variables
```

## Key Components

- **App**: Main application with theme provider and weather logic
- **useWeather**: Custom hook for weather data management
- **useTheme**: Custom hook for theme switching and persistence
- **WeatherCard**: Reusable card component with glassmorphism styling
- **WeatherIcon**: Dynamic weather icon component

## Styling Features

- Gradient backgrounds that change with weather conditions
- Glassmorphism effects with backdrop blur
- Smooth transitions and hover animations
- Responsive grid layouts
- Modern typography and spacing

## API Integration

The app uses OpenWeatherMap API for:
- Current weather data
- 5-day weather forecast
- City search functionality

Mock data is included for development and demo purposes.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for learning or commercial purposes.