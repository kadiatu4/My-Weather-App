import React from "react";
import Form from "./Form";
import Weather from "./Weather";
import Head from "./Head";
import styled from "styled-components";

const AppContainer = styled.div`
    background-color: #1C2331;
`;

class App extends React.Component {

    // cityIDList = undefined;
    state = {
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        timezone: undefined,
        forecastArray: undefined,
        error: undefined
    };

    render(){

        return (
                <div>
                    <Head/>
                    <AppContainer>
                        <Form loadWeather={this.getWeather}/>
            
                        <Weather city={this.state.city}
                                country={this.state.country}
                                sunrise={this.state.sunrise}
                                sunset={this.state.sunset}
                                timezone={this.state.timezone}
                                forecastArray={this.state.forecastArray}
                                error={this.state.error}
                        />
                    </AppContainer>

                </div>
                
        )
    }

   getWeather = async (e) => {

        //prevent full page refresh
        e.preventDefault();

        //Stores the city, country and openweathermap API Key
        const location = e.target.elements.location.value;

        const Api_Key = "55548a48ad548e9ec2f9b8384e05ee1f";
        var api_call = "";

        //Regexes to check the conditions
        var regexZipcode = new RegExp('\\d{5}');
        var regexAddress = new RegExp('\\w+\\, \\w+|\\w+,\\w+');

        //Checks if the input is a zipcode
        if(regexZipcode.test(location)){
            
            //Makes call/requests to the open weather map api 
            api_call = await fetch( `http://api.openweathermap.org/data/2.5/forecast?zip=${location},US&units=metric&appid=${Api_Key}`);

        }

        //Checks if the input is in the format City, Country
        else if(regexAddress.test(location)){

            var splitString = location.split([","], 2);

            var city = splitString[0];
            var country = splitString[1];

            api_call = await fetch( `http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=${Api_Key}`);
        }
        //Otherwise the input was invalid
        else{
            this.setState({error: "Invalid Input. Please enter a valid Zipcode or \"City, Country\""});
            return;
        }
       
        //Stores the response received from the api call
        const response = await api_call.json();


        //Checks whether the city or zipcode was
        //not found or not
        if(response.cod == '404'){
            this.setState({error: "Invalid Zipcode or City, Country Entered."});
            return;
        }
        else{

            this.seperateDayForecast(response.list);

            this.setState({
                city: response.city.name,
                country: response.city.country,
                sunrise: response.city.sunrise,
                sunset: response.city.sunset,
                timezone: response.city.timezone,
                error: ""
            });

           
        }
           
    }

    seperateDayForecast = (responseList) => {

        var count = -1;
        var tempArray = new Array(5);
        var currentDay = -1;

        //Loops through array and creates a new array 
        //to store the forecast for a particular day
        responseList.map((forecast) =>{

            //Stores the current date
            var getCurrentDay = new Date(forecast.dt_txt).getDay();

            //Checks if the dates are different 
            //if so, create a new array for the new date 
            if(currentDay != getCurrentDay){
                currentDay = getCurrentDay;
                count += 1;
                tempArray[count] = [];
                tempArray[count].push(forecast);
            }   
            //Else, add the data to the array corresponding to
            //to the current date  
            else{
                tempArray[count].push(forecast);
            } 
        });

        this.setState({
            forecastArray: tempArray,
        });
    }
}

export default App;