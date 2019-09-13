import React from "react";
import styled from "styled-components";

const ForecastContainer = styled.div`
    margin: 0.9rem;
   

    .gridContainer{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        margin: 2rem;
        padding: 1rem;
    }
   
`;

const LeftColumn = styled.div`  
    text-align: left;

    h4{
        font-size: 2.5rem;
        font-weight: 100;
        margin-bottom: 1.5rem;
    }

    p{
        margin: 0 auto;
    }

    .description{
        font-size: 1rem;
    }

    .highLow{
        font-size: 1rem;
    }
    
    img{
        margin: 0 auto;
    }
`;

const CenterColumn = styled.div`
    display: flex;
    height: 10%;
    width: 65%;

    h4, p {
        margin: 0 0.5rem;
        text-align: center;
    }
   
`;
const RightColumn = styled.div`
    h4, p {
        margin: 0.5 0rem;
        text-align: right;
    }

    h4{
        font-size: 1.1rem;
        font-weight: 500;
    }

    p{
        font-size: 0.9rem;
        font-weight: 100;
        border-bottom: 1px solid rbg(170, 171, 173);
    }
`;

const Forecast = (props) =>{
    var url = "http://openweathermap.org/img/wn/";
    

    const getWeekDay = (value) => {

        //Check if the date matches today's date
        if(value == new Date().getDay()) return "Today";

        //Check if the date tomorrow's date 
        else if(value == new Date().getDay() + 1) return "Tomorrow";

        //Check for the other dates
        else{
            switch(value){
                case 0: return "Sunday";
                case 1: return "Monday";
                case 2: return "Tuesday"
                case 3: return "Wednesday";
                case 4: return "Thursday";
                case 5: return "Friday";
                case 6: return "Saturday";
                default: return "Invalid WeekDay";
            }
        }   
     };

    const degToCompass = (degree) =>{
        var val = Math.floor((degree / 22.5) + 0.5);
        var directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return directions[(val % 16)];
    };

    return (
      
        <ForecastContainer>

            <div class="gridContainer">

                <LeftColumn>
                    <img src={url + props.weather[0].icon + "@2x.png"} alt={props.weather.main}/>
                    
                    <h4>
                        <strong>{parseInt((props.main.temp * 1.8) + 32)}</strong><span>&#176; F</span>
                    </h4>

                    <p class="description">{props.weather[0].description.toUpperCase()}</p>

                    <p> feels like <strong>{parseInt((props.main.temp * 1.8) + 32)}</strong><span>&#176; F</span></p>

                     <p class="highLow"> H <strong>{parseInt((props.main.temp_min * 1.8) + 32)}</strong> <span>&#176; F </span> / 
                         L <strong>{parseInt((props.main.temp_max * 1.8) + 32)}</strong><span>&#176; F</span> 
                    </p>
                </LeftColumn>
            
                <CenterColumn>
                    <h4>{getWeekDay(new Date(props.time).getDay())}</h4>
                    <p>at {new Date(props.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                    
                </CenterColumn>


                <RightColumn>
                    <h4>Humidity</h4>
                    <p>{props.main.humidity} % </p>

                    <h4>Pressure</h4>
                    <p>{props.main.pressure} hPa</p>

                    <h4>Wind</h4>
                    <p>{degToCompass(props.wind.speed * 2.2369)} {parseInt(props.wind.speed * 2.2369)} mph</p>  

                    <h4>Cloudiness</h4>
                    <p>{props.clouds.all} %</p>

                </RightColumn>
                  
            </div>
        </ForecastContainer>
    )
};

export default Forecast;