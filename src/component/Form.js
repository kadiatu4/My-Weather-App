import React from "react";
import styled from "styled-components";


const BannerContainer = styled.div`
    display: flex;
`;

const Titles = styled.div`
    margin: 2rem 2rem;
        
    h1{
        color: rgb(76, 166, 245);
        font-weight: 300;
        font-size: 2rem;   
    }

    h2{
        color: white;
        font-weight: 200;
        font-size: 1.3rem;   
    }

    p{
        color: white;
        font-weight: 100;
    }
`;

const FormContainer = styled.div`
    margin: 2rem 2rem;
       
    .btn{
        background-color: #ffbb33;
        margin-left: 2rem;
        color: white;
    }

    input, 
    input[type=text]:focus{
        border: 0;
        border-radius: 0;
        color: white;
        background-color: #1C2331;
        border-bottom: 1px solid white;
        font-size: 1rem;
        font-weight: 100;
    }
`;



const Form = (props) => {

    return(
        <BannerContainer>
            <div class="row">

                <div class="col-7">
                    <Titles> 
                        <h1>My Weather App </h1>
                        <h2>5 Day 3 Hour Forecast</h2>
                        <p>Enter a <strong>Zipcode</strong> or <strong>City, Country </strong>and we will provide you with a
                            5-day weather forecast for that location.
                        </p>
                    </Titles>
                </div>
            
                <div class="col-5">
                    <FormContainer>

                        <div class="form-group"> 

                            <form onSubmit={props.loadWeather}>
                                <div class="form-inline">  
                                    <input type="text" class="form-control" name="location" placeholder="Enter city and country, or zipcode " />
                                    <button type="submit" class="btn">Get Weather</button>
                                </div>
                            </form>

                        </div>

                    </FormContainer>
                </div>
            </div>
        </BannerContainer> 
    )

};

export default Form;