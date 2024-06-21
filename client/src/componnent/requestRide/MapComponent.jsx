// import React from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '400px',
// };

// const center = {
//   lat: 0,
//   lng: 0,
// };

// const MapComponent = ({ from, to }) => {
//   const fromCoords = from ? { lat: from.lat, lng: from.lng } : null;
//   const toCoords = to ? { lat: to.lat, lng: to.lng } : null;

//   return (
//     <LoadScript googleMapsApiKey="AIzaSyAOADq1o80YyWo4Tvp5vlbzimVXDYpJVWA">
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={10}
//       >
//         {fromCoords && (
//           <Marker
//             position={fromCoords}
//             label="A"
//             title="From"
//           />
//         )}
//         {toCoords && (
//           <Marker
//             position={toCoords}
//             label="B"
//             title="To"
//           />
//         )}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default MapComponent;
