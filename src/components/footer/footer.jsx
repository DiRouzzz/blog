import { useEffect, useState } from 'react';
import styled from 'styled-components';

const FooterContainer = ({ className }) => {
  const [weatherInfo, setWeatherInfo] = useState({});

  useEffect(() => {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=Saratov&units=metric&lang=ru&appid=ff5795b3082633d4898527135e49a80d'
    )
      .then((res) => res.json())
      .then(({ name, main, weather }) => {
        setWeatherInfo({
          name,
          temperature: Math.round(main.temp),
          weather: weather[0].description,
        });
      });
  }, []);

  return (
    <div className={className}>
      <div>
        <div>Блог веб-разработчика</div>
        <div>web@developer.ru</div>
      </div>
      <div>
        <div>
          {weatherInfo.name},{' '}
          {new Date().toLocaleDateString('ru', {
            day: 'numeric',
            month: 'long',
          })}
        </div>
        <div>
          {weatherInfo.temperature} градусов, {weatherInfo.weather}
        </div>
      </div>
    </div>
  );
};

export const Footer = styled(FooterContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
  height: 120px;
  padding: 20px 40px;
  box-shadow: rgb(0, 0, 0) 0px -2px 17px;
  background-color: white;
  font-weight: bold;
`;
