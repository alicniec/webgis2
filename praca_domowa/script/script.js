require ([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "esri/tasks/support/Query",
    "esri/layers/GraphicsLayer",
    "esri/renderers/Renderer",
    "esri/renderers/visualVariables/ColorVariable"

],(
    Map,
    SceneView,
    FeatureLayer,
    Query,
    GraphicsLayer,
    Renderer,
    ColorVariable

) => {
    let map = new Map({
        basemap: "osm",
      });
    
      let view = new SceneView({
        map: map,
        container: "map",
        center: [22.5666667, 51.25],
        zoom: 3,
      });

    let gl = new GraphicsLayer();
      
    let fl1 = new FeatureLayer({
        url: "https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer/0"
    }) ;

    map.add(gl)
    // map.add(fl1);

    let fl2 = new FeatureLayer({
        url: "https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer/0"
    }) ;
    map.add(fl2);


    let query = fl1.createQuery();
    query.where = "MAGNITUDE > 4";
    query.outFields = [ "*" ];
    query.returnGeometry = true;

    fl1.queryFeatures(query)
    .then(response =>{
        getResults(response.features);

    })
    .catch(err =>{
        console.log(err);
    });

    let getResults = (features) => {
        let symbol = {
            type: 'simple-marker',
            size: 15,
            color: "green",
            style: "circle"
        };

        features.map(elem => {
            elem.symbol = symbol;
        });

        gl.addMany(features)

    };

    let renderer = {
        type: "simple",
        symbol: {
            type: 'point-3d',
            symbolLayers: [
                {
                    type: "object",
                    resource: {
                        primitive: "cone"
                    },
                    width: 5000
                }

            ]
        },
        label: 'Earthquakes',
        visualVariables: [
            {
                type: "color",
                field: "MAGNITUDE",
                stops: [
                    {
                        value: 0.5,
                        color: "green",
                    },
                    {
                        value: 4.48,
                        color: "red"
                    }
                ]
            },
            {
                type: "size",
                field: "DEPTH",
                stops: [
                    {
                        value: -3.39,
                        size: 100000
                    },
                    {
                        value: 30.97,
                        size: 200000
                    }
                ]
            }
        ]
    };

    fl2.renderer = renderer;

}   
)