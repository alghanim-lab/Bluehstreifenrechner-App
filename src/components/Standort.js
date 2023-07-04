import React, { useEffect, useState } from 'react';

const MapWithLocation = () => {
  const [map, setMap] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          initMap(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  const initMap = (latitude, longitude) => {
    const mapOptions = {
      center: { lat: latitude, lng: longitude },
      zoom: 10
    };

    const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);
    setMap(map);
  };

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div id="map" style={{ height: '400px', width: '100%' }}></div>
      )}
    </div>
  );
};

export default MapWithLocation;
