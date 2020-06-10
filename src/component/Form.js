import React from "react";
import styled from "styled-components";
import {devices} from "./DeviceSizes";

const Container = styled.div`
  
`;

const Titles = styled.div`
    margin: 0 1em;

    h1{
        
        font-weight: 300;  
        color: #3d6098;
        margin: 1em 0;
        font-size: 1.8rem;

        @media ${devices.mobile}{
            font-size: 3.5rem; 
        }

        @media ${devices.tablet}{
            font-size: 2rem; 
            margin: 0.6em 0;
        }
        
    }

    h2{
        color: #213159;
        font-weight: 300;
        font-size: 1.2rem;  
        margin: 0.8em 0; 

        @media ${devices.mobile}{
            font-size: 2rem;  
            margin: 1.8em 0; 
        }

        @media ${devices.tablet}{
            font-size: 1.2rem; 
            margin: 0.8em 0; 
        }
    }

    p{
        color: #213159;
        font-weight: 200;
        font-size: 1rem;
        margin-bottom: 1.2em;


        @media ${devices.mobile}{
            font-size: 1.6rem;
            margin-bottom: 1.5em;
        }

        @media ${devices.tablet}{
            font-size: 1rem; 
            margin: 2em 0; 
        }
    }
`;

const FormContainer = styled.div`
    
    .btn{
        background-color: #f04b4c;
        color: white;
        margin: 1em 0;     
        font-size: 1rem;
        font-weight: 200;

        @media ${devices.mobile}{
            font-size: 1rem;
        }

        @media ${devices.tablet}{
            font-size: 1rem;  
        }
    }

    input, 
    input[type=text]:focus{
        border: 0;
        border-radius: 0;
        background-color: #e6f2ff;
        border-bottom: 1px solid white;
        font-size: 1rem;
        font-weight: 200;
        color: #213159;

        @media ${devices.mobile}{  
            font-size: 1rem;
        }

        @media ${devices.tablet}{
            font-size: 1rem;  
        }
    }
`;



const Form = (props) => {

    return(

        <Container>
            <div class="row">
                <Titles> 
                    <h1>My Weather App </h1>
                    <h2>5 Day 3 Hour Forecast</h2>
                    <p>Enter a <strong>Zipcode</strong> or <strong>City, Country </strong>and we will provide you with a
                        5-day weather forecast for that location.
                    </p>
                </Titles>
            </div>
        
        
            <FormContainer>
            
                <form onSubmit={props.loadWeather}>

                    <input class="form-control" type="text" name="location" placeholder="Search..." />
                    <button type="submit" class="btn">Get Weather</button>
                
                </form> 
                

            </FormContainer>
            
        </Container>
       
    )

};

export default Form;