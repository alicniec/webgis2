
require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "dijit/form/Button",
    "esri/Graphic",
    "esri/layers/Graphicslayer",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Expand",
    "esri/widgets/Legend",
],
    (Map, MapView, FeatureLayer, Button, Graphic, GraphicsLayer, BasemapGallery, Expand, Legend) => {


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

    const legend = new Legend({
        view:view
    });

    view.ui.add(legend,{
        position: "bottom:right",
    })

    //query

    let query = fl.createQuery();

    query.where = "EVENTID = 'Alberto'";
    query.outFields = ['*'];
    query.returnGeometry = true;

    fl.query.features(query)
    .them(response =>{
        console.log(response);
        getResults(response.features);
    })
    .catch(err =>{
        console.log(err);
    })

    const getResults = (features) =>{
        const symbol = {
            type: "simple-marker",
            size: 6,
            color: "red",
            style: "square",
        }
    }

    features.map(elem =>{
        elem.symbol = symbol;
    })
    gl.addMany(features);


    //rendering
    const simple = {
        type: "simple",
        symbol:{
            type: "simple",
            size: 6,
            color: "red",
            style: "square"
        },
        label: "Hurricane",
        visualVariables:[
            {
                type: "color",
                field: "PRESSURE",
                stops: [
                    {
                        value: XX,
                        color: "blue"
                                        },
                                        {
                        value: XX,
                        color: "red"
                                        },
                    {
                        value: XX,
                        color: "green"
                                        }
                ]
            }
        ]
    };

    fl.renderer = simple;


});

