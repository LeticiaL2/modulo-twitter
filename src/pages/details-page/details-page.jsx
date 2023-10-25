import React from 'react'
import './styles'
import TweetDetails from '../../components/molecules/tweet-details/tweet-details'
import {BoxCenter, Container} from './styles'



function DetailsPage() {



    
    return(
        <Container>
            <BoxCenter>
                <TweetDetails></TweetDetails>


                
            </BoxCenter>
        </Container>
    );
}

export default DetailsPage;