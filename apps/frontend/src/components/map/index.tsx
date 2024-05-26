import { LatLngTuple } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useWatchPosition } from '../../hooks/use-watch-position';
import { useEffect } from 'react';

export const Map = () => {
  const userCoordinates = useWatchPosition();

  const center: LatLngTuple = [-30.069619, -51.166494];
  const userPosition: LatLngTuple | undefined = userCoordinates.currentPosition?.coords
    ? [userCoordinates.currentPosition.coords.latitude, userCoordinates.currentPosition.coords.longitude]
    : undefined;

  useEffect(() => {
    userCoordinates.startWatch({ enableHighAccuracy: true });
    return () => userCoordinates.clearWatch();
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <MapContainer className="flex flex-col flex-1" center={center} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={20}
        />
        {userPosition && (
          <Marker position={userPosition}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};
