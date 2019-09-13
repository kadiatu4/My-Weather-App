import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Forecast from "./Forecast";


const WeatherContainer = styled.div`
    margin: 2rem;
    padding: 1rem;
    color: white;
    
    .forecast-collapse{
        width: 100%;
        text-decoration: none;
        color: white;
    }
`;

const MainForecast = styled.div`
    background-image: linear-gradient(180deg, rgba(76, 166, 245), rgba(145, 184, 219));
    border-radius: 23px;
`;

const HourlyForecasts = styled.div`
    width: 98%;
    margin: 0 auto;
   
    .hourly_Forecast{ 
        margin: 0.6rem 1.2rem;
        border-radius: 10px;
        background-image: linear-gradient(180deg, rgba(33, 50, 66), rgba(21, 46, 69));
    } 
`;

const CurrentTime = styled.h4`
    font-size: 1.5rem;
    font-weight: 100;
`;


const Weather = (props) => {
   
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));

    useEffect(() => {
        setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))
        }, 1000)
    });

    return(
        <WeatherContainer>
 
            {props.country && props.city && <h3>{props.city}, {props.country}</h3>}
            <CurrentTime>{currentTime}</CurrentTime>

            {props.forecastArray && props.forecastArray.map((forecast, i) => {
                return(
                    <div>
                        <MainForecast>
    
                            <a class="forecast-collapse" data-toggle="collapse" href={"#CardNo" + i} role="button" aria-expanded="false" aria-controls="collapseExample">
                                <Forecast time={forecast[0].dt_txt} 
                                          weather={forecast[0].weather}
                                          main={forecast[0].main}
                                          wind={forecast[0].wind}
                                          clouds={forecast[0].clouds}
                                />
                            </a>
                
                        </MainForecast>

                        <HourlyForecasts>
                            <div class="collapse" id={"CardNo" + i}>

                                {forecast && forecast.map((hourlyForecast) => {

                                    return(
                                        <div class="hourly_Forecast">
                                            <Forecast time={hourlyForecast.dt_txt} 
                                                weather={hourlyForecast.weather}
                                                main={hourlyForecast.main}
                                                wind={hourlyForecast.wind}
                                                clouds={hourlyForecast.clouds}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </HourlyForecasts>
                    </div>
                )
            })} 
           
            {props.error && <p>{props.error}</p>}

        </WeatherContainer>
    )  
};

export default Weather;