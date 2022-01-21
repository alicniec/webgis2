require([
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
],

(Map, MapView,Graphic, GraphicsLayer, ) => {

    let map = new Map({
        basemap: "osm"
    });
    
    let view = new MapView({
    map: map,
    container: "map",
    center: [22.5666667, 51.25],
    zoom: 13
    });

    let geom = {
        type: "point",
        longitude: 22.533476,
        latitude: 51.243387,
    };

    let sym = {
        type: "simple-marker",
        color: "blue",
        size:20,
    };
    const attr = {
        country: "Polska",
        code: "POL",
    };

    const popTmpl = {
        title: "obiekt web-gis",
        content: "Zaznaczony obiekt pochodzi z kraju {country}"
    }

    let graph = new Graphic({
        geometry: geom,
        symbol: sym,
        attributes: attr,
        popupTemplate: popTmpl,
    });

    let gl = new GraphicsLayer();
    gl.graphics.add(graph);
    map.add(gl);

}
)