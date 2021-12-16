
require([
    "esri/Map",
    "esri/views/MapView"
],
    (Map, MapView) => {
        const map = new Map({
            basemap: "osm"
        });
    
    const view = new MapView({
    map: map,
    container: "map",
    center: [22.5666667, 51.25],
    zoom: 13
    })
}
);