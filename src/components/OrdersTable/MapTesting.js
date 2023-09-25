// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// function MapTesting({ onCoordinatesChanged }) {
//   const [lat, setLat] = useState(null);
//   const [lng, setLng] = useState(null);

//   const onMapClick = (event) => {
//     const { lat, lng } = event.latlng;
//     console.log(lat, lng);
//     setLat(lat);
//     setLng(lng);

//     if (onCoordinatesChanged) {
//       onCoordinatesChanged(lat, lng);
//     }
//   };

//   return (
//     <div className="sender">
//       <MapContainer
//         center={[51.505, -0.09]}
//         zoom={13}
//         style={{ height: '300px', width: '100%' }}
//         eventHandlers={{ click: onMapClick }}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         {lat && lng && (
//           <Marker position={[lat, lng]}>
//             <Popup>
//               You clicked at {lat}, {lng}
//             </Popup>
//           </Marker>
//         )}
//       </MapContainer>
//       <label htmlFor="latitude">Latitude:</label>
//       <input type="text" id="latitude" name="latitude" value={lat || ''}  />
//       <label htmlFor="longitude">Longitude:</label>
//       <input type="text" id="longitude" name="longitude" value={lng || ''}  />
//     </div>
//   );
// }

// export default MapTesting;

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";


const MapTesting = () => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    const provider = new OpenStreetMapProvider();
    const results = await provider.search({ query: address });
    if (results.length > 0) {
      setCoordinates([results[0].y, results[0].x]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {coordinates && (
        <MapContainer center={coordinates} zoom={13}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={coordinates}>
            <Popup>{address}</Popup>
          </Marker>
          <GeoSearchControl />
        </MapContainer>
      )}
    </div>
  );
};

export default MapTesting;
