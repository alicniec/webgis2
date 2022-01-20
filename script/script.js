
require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "dijit/form/Button",
    "esri/Graphic",
    "esri/layers/Graphicslayer",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Expand",
],
    (Map, MapView, FeatureLayer, Button, Graphic, GraphicsLayer, BasemapGallery, Expand) => {


    const map = new Map({
        basemap: "osm"
    });
    
    const view = new MapView({
    map: map,
    container: "map",
    center: [22.5666667, 51.25],
    zoom: 13
    })

    const zoomIn = new Button({
        onClick: ()=>{
            view.zoom = view.zoom + 1;
        }
    }, "zoomIn");

    const zoomOut = new Button({
        onClick: () => {
            view.zoom = view.zoom -1;
        }
    }, "zoomOut");


    //Warstwy
    const gl = new GraphicsLayer();
    const fl = new FeatureLayer({
        url: ""
    }) ;
    
    map.add(fl);
    map.add(gl)


    //Grafiki
    const geom = {
        type: "polyline",
        paths: [[-97.06236, 32.759], [-97.06298, 32.755]]
    };

    const sym = {
        type: "simple-line",
        color: "blue",
        width: 2,
        style: "dash",
    };

    const attr = {
        country: "Polska",
        code: "POL",
    };

    const popTmpl = {
        title: "obiekt web-gis",
        content: "Zaznaczony obiekt pochodzi z kraju {country}"
    }

    const graph = new Graphic({
        geometry: geom,
        symbol: sym,
        attributes: attr,
        popupTemplate: popTmpl,
    });

    gl.add(graph);


    //Widgety
    const bmWg = new BasemapGallery({
        view: view
    });

    const expandWg = new Expand({
        view: view,
        content: bmWg
    });

    view.ui.add(expandWg, {
        position: "top-right"
    });
}
);

