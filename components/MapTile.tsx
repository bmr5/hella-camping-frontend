import React, { useState } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { getCenter } from "geolib";

type Props = {
  parkLocation: {
    longitude?: number;
    latitude?: number;
  };
  campgrounds?: {
    longitude: number;
    latitude: number;
  }[];
};

function MapTile({ campgrounds, parkLocation }: Props) {
  const [selectedCampground, setSelectedCampground] = useState<{
    longitude: number;
    latitude: number;
  } | null>();

  const { latitude, longitude } = parkLocation;

  // const coordinates = campgrounds.map((campground, i) => {
  //   return {
  //     longitude: campground.longitude,
  //     latitude: campground.latitude,
  //   };
  // });

  // fallback to San Francisco, it's very odd that this function type returns false
  // const center = getCenter(coordinates) || {
  //   longitude: -122.4,
  //   latitude: 37.8,
  // };

  const [viewState, setViewState] = useState({
    longitude,
    latitude,
    zoom: 10,
  });

  return (
    <Map
      initialViewState={viewState}
      style={{
        height: "400px",
        borderRadius: "10px",
        boxShadow: "0 0 0 1px white",
      }}
      mapStyle="mapbox://styles/benray5/claswqh7b000915puqtg6xs8o"
      mapboxAccessToken={process.env.mapbox_key}
    >
      <NavigationControl />

      {latitude != null && longitude != null && (
        <Marker
          latitude={latitude}
          longitude={longitude}
          anchor={"bottom"}
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setSelectedCampground({ latitude, longitude });
          }}
        ></Marker>
      )}

      {selectedCampground && (
        <Popup
          key={`popup-${selectedCampground.latitude}`}
          onClose={() => setSelectedCampground(null)}
          anchor="top"
          latitude={selectedCampground.latitude}
          longitude={selectedCampground.longitude}
          closeOnClick={true}
          className=""
        >
          <h1 className="pr-1">{""}</h1>
        </Popup>
      )}
    </Map>
  );
}

export default MapTile;
