import React from 'react';
import Details from '../containers/details'
import CarsList from '../containers/cars-list'

const WebPage = () => (
    <div>
        <h3>Cars:</h3>
        <CarsList/>
        <hr/>
        <h3>Details:</h3>
        <Details/>
    </div>
);

export default WebPage;