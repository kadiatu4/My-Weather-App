import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Forecast from "./Forecast";
import {devices} from "./DeviceSizes";


const WeatherContainer = styled.div`
    color: #a6a6a6;

    @media ${devices.laptop}{
        .grid_container{
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
            grid-gap: 1em;
        }
    }
`;


const MainForecast = styled.div`
    border-radius: 15px;
    box-shadow: 0 10px 15px #e6e6e6;
    background-image: linear-gradient(180deg, #bfbfbf, #d9d9d9);

    @media ${devices.laptop}{
        border-radius: 5px;
        box-shadow: none;
        background-image: none;
        background-color: #bfbfbf;
       
    }
    
`;


const HourlyForecastsLink = styled.div`
    text-align: center;
    padding-bottom: 1em;
  

    .forecast-collapse{
        text-decoration: none;
        font-weight: 100;
        color: #F8F8FF;
        font-size: 1rem;

        @media ${devices.laptop}{
            padding: 0 1em 1em;
        }
    }

    .forecast-collapse:hover, .forecast-collapse:active{
        color: #a6a6a6;
    }
`;

const HourlyForecasts = styled.div`
    margin: 0 auto;
   
    .hourly_Forecast{ 
        margin: 0.6rem 1.2rem;
        border-radius: 10px;
        box-shadow: 0 15px 15px #cccccc;
        background-color: #999999;
    } 
`;

const CurrentTime = styled.h4`
    font-size: 1.2rem;
    font-weight: 200;
`;

const Location = styled.div`
    margin: 3em 0;
    color: #3d6098;

    h3{
        font-size: 1.5rem;
        font-weight: 300;
    }
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
            {props.country && props.city && 
                <Location>
                    <h3>{props.city}, {props.country}</h3>
                    <CurrentTime>{currentTime}</CurrentTime>
                </Location> 
            }
         
            <div class='grid_container'>
                {props.forecastArray && props.forecastArray.map((forecast, i) => {
                    return(
                        <div>
                            <MainForecast>
        
                                <Forecast time={forecast[0].dt_txt} 
                                            weather={forecast[0].weather}
                                            main={forecast[0].main}
                                            wind={forecast[0].wind}
                                            clouds={forecast[0].clouds}
                                />

                                <HourlyForecastsLink>       
                                    <a class="forecast-collapse" data-toggle="collapse" href={"#CardNo" + i} role="button" aria-expanded="false" aria-controls="collapseExample">View Hourly Forecast</a>
                                </HourlyForecastsLink>
                            
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
            </div>
           
            {props.error && <p>{props.error}</p>}

        </WeatherContainer>
    )  
};

export default Weather;