import React from "react";
import styled from "styled-components";
import {devices} from "./DeviceSizes";

const ForecastContainer = styled.div`
  
    @media ${devices.tablet}{
        .gridContainer{
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 1em;
        }
    } 

    @media ${devices.laptop}{
        .gridContainer{
            display: block;
        }
    }
    
    margin: 2em 0;
`;



const LeftColumn = styled.div`  
  
    @media only screen and (max-width: 576px) {
        text-align: center;
    }

    text-align: left; 

    @media ${devices.laptop}{
        text-align: center;
    }

    h2{
        font-size: 3rem;
        font-weight: 200;
        margin-bottom: 0.4em;
        color: #595959;
       

        @media ${devices.mobile}{
            font-size: 3.5rem; 
        }

        @media ${devices.tablet}{
            font-size: 2.5rem;
        }
    }

  
    .description{
        font-size: 1.2rem;
        color: #666666;
        font-weight: 300;

        @media ${devices.mobile}{
            font-size: 2.2rem;
        }

        @media ${devices.tablet}{
            font-size: 1.3rem;
        }
    }

    .highLow,
    .feels-like {
        font-size: 1.4rem;
        font-weight: 200;
        color: #f2f2f2;
        margin: 0.5em 0;

        @media ${devices.mobile}{
            font-size: 1.8rem;
        }

        @media ${devices.tablet}{
            font-size: 1.2rem;
        }

        @media ${devices.laptop}{
            display: none;
        }
    }

    padding: 0.5em 0;
`;

const CenterColumn = styled.div`
  
    h2, h3 {
        margin: 0 0.5em;
        text-align: center;
        color: #f2f2f2;
        font-size: 1.3rem;
        font-weight: 200;

        @media ${devices.mobile}{
            font-size: 1.8rem;
        }

        @media ${devices.tablet}{
            font-size: 1.2rem;
        }

    }

    padding: 2em 0;
   
`;

const RightColumn = styled.div`

    @media only screen and (max-width: 575px) {
      display: none;
    }

    @media ${devices.laptop}{
        display: none;
    }

   
    .row{
        display: block;
        margin: 1em;
        text-align: right; 

        h2{
            font-size: 1.3rem;
            font-weight: 300;
            color: #666666;

            @media ${devices.mobile}{
                font-size: 1.8rem;
            }

            @media ${devices.tablet}{
                font-size: 1.2rem;
            }

        }

        h3{
            
            font-size: 1.3rem;
            font-weight: 300;
            color: #f2f2f2;
            margin-left: 1em;

            @media ${devices.mobile}{
                font-size: 1.8rem;
            }
          
            @media ${devices.tablet}{
                font-size: 1rem;
            }
        }

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

            <div class="container">
        
                <div class="col-sm-auto">
                    <CenterColumn>
                        <h2>{getWeekDay(new Date(props.time).getDay())}</h2>
                        <h3>{new Date(props.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</h3>
                    </CenterColumn>
                </div>

                <div class="gridContainer">
              
                    <div class="col-sm-auto">
                    
                        <LeftColumn>
                            <img src={url + props.weather[0].icon + "@2x.png"} alt={props.weather.main}/>
                            
                            <h2>
                                {/* <strong>{parseInt((props.main.temp * 1.8) + 32)}</strong><span>&#176; F</span> */}
                               {parseInt((props.main.temp * 1.8) + 32)}
                               <span>&#176; F</span>
                 
                            </h2>

                            <p class="description">{props.weather[0].description.toUpperCase()}</p>

                            <p class="feels-like"> feels like <strong>{parseInt((props.main.temp * 1.8) + 32)}</strong><span>&#176; F</span></p>

                            <p class="highLow"> H <strong>{parseInt((props.main.temp_min * 1.8) + 32)}</strong> <span>&#176; F </span> / 
                                L <strong>{parseInt((props.main.temp_max * 1.8) + 32)}</strong><span>&#176; F</span> 
                            </p>

                        </LeftColumn>
                    </div>
            
                    <div class="col-sm-auto">

                        <RightColumn>

                            <div class="row">
                                <h2>Humidity</h2>
                                <h3>{props.main.humidity} % </h3>

                            </div>
                        
                            <div class="row">
                                <h2>Pressure</h2>
                                <h3>{props.main.pressure} hPa</h3>
                            </div>

                            <div class="row">
                                <h2>Wind</h2>
                                <h3>{degToCompass(props.wind.speed * 2.2369)} {parseInt(props.wind.speed * 2.2369)} mph</h3>  
                            </div>

                            <div class="row">
                                <h2>Cloudiness</h2>
                                <h3>{props.clouds.all} %</h3>
                            </div>

                        </RightColumn> 
                  
                </div>
                </div>
            </div>
        
        </ForecastContainer>
    )
};

export default Forecast;