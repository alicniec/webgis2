require([
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/widgets/Zoom"
],

(Map, MapView,Graphic, GraphicsLayer, Zoom) => {

    let map = new Map({
        basemap: "osm"
    });
    
    let view = new MapView({
    map: map,
    container: "map",
    center: [22.5666667, 51.25],
    zoom: 3
    });

    //syjam cat
    let geom = {
        type: "point",
        longitude: 100.992541,
        latitude: 15.870032,
    };

    let sym = {
        type: "simple-marker",
        color: "blue",
        size: 12,
    };
    const attr = {
        country: "Tajlandia",
        code: "THA",
    };

    const popTmpl = {
        title: "Kot syjamski",
        content: "Koty tej rasy pochodzą z kraju {country}"
    }

    let syjam = new Graphic({
        geometry: geom,
        symbol: sym,
        attributes: attr,
        popupTemplate: popTmpl,
    });

    //maine coon
    let geom2 = {
        type: "point",
        longitude: -69.211388,
        latitude: 45.389738,
    };

    let sym2 = {
        type: "simple-marker",
        color: "red",
        size: 12,
    };
    const attr2 = {
        country: "Stany Zjednoczone",
        code: "USA",
    };

    const popTmpl2 = {
        title: "Maine Coon",
        content: "Koty tej rasy pochodzą z kraju {country}"
    }

    let mco = new Graphic({
        geometry: geom2,
        symbol: sym2,
        attributes: attr2,
        popupTemplate: popTmpl2,
    });

    //devon rex
    let geom3 = {
        type: "point",
        longitude: -3.777625,
        latitude: 50.478393,
    };

    let sym3 = {
        type: "simple-marker",
        color: "green",
        size: 12,
    };
    const attr3 = {
        country: "Wielka Brytania",
        code: "GBR",
    };

    const popTmpl3 = {
        title: "Devon Rex",
        content: "Koty tej rasy pochodzą z kraju {country}"
    }

    let dvn = new Graphic({
        geometry: geom3,
        symbol: sym3,
        attributes: attr3,
        popupTemplate: popTmpl3,
    });

    //syberyjski
    let geom4 = {
        type: "point",
        longitude: 97.475517,
        latitude: 62.012063,
    };

    let sym4 = {
        type: "simple-marker",
        color: "pink",
        size: 12,
    };
    const attr4 = {
        country: "Rosja",
        code: "RUS",
    };

    const popTmpl4 = {
        title: "Kot Syberyjski",
        content: "Koty tej rasy pochodzą z kraju {country}"
    }

    let sybr = new Graphic({
        geometry: geom4,
        symbol: sym4,
        attributes: attr4,
        popupTemplate: popTmpl4,
    });

    let gl = new GraphicsLayer();

    gl.add(syjam);
    gl.add(mco);
    gl.add(dvn);
    gl.add(sybr);

    map.add(gl);


    btnZoom1 = document.getElementById('btnZoom');
    btnZoom2 = document.getElementById('btnZoom2');
    btnZoom3 = document.getElementById('btnZoom3');
    btnZoom4 = document.getElementById('btnZoom4');

    btnZoom1.addEventListener('click', function(){
        let opts = {
            duration: 2000
        };
          
        view.goTo({
            target: syjam.geometry,
            zoom: 8
          }, opts);

    });

    btnZoom2.addEventListener('click', function(){
        let opts = {
            duration: 2000
        };
          
        view.goTo({
            target: mco.geometry,
            zoom: 8
          }, opts);

    });

    btnZoom3.addEventListener('click', function(){
        let opts = {
            duration: 2000
        };
          
        view.goTo({
            target: dvn.geometry,
            zoom: 8
          }, opts);

    });

    btnZoom4.addEventListener('click', function(){
        let opts = {
            duration: 2000
        };
          
        view.goTo({
            target: sybr.geometry,
            zoom: 8
          }, opts);

    });
}
)

