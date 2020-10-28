import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import GaspData from '../types/GaspData';

interface MapOptions {
  center: { lat: number, lng: number };
  zoom?: number;
  data: GaspData | undefined;
  range: number[];
  polygons: JSX.Element[]
}

const containerStyle = {
  width: '700px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const GMap = (props: MapOptions) => {
  return (
    <div>
      <LoadScript
        googleMapsApiKey="AIzaSyAwGICRC7pLNMuzoJh_jHAK_wNo1azWCwA"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={props.center ? props.center : center}
          zoom={props.zoom ? props.zoom : 10}
        >
          {props.polygons}
          <></>
        </GoogleMap>
      </LoadScript>
    </div>
  )
};

export default GMap;