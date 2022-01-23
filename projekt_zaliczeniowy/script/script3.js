require([
  "esri/Map",
  "esri/views/MapView",
  "esri/renderers/UniqueValueRenderer",
  "esri/PopupTemplate",
  "esri/layers/GeoJSONLayer",
  "esri/widgets/BasemapGallery",
  "esri/widgets/Expand",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/widgets/Legend",
  "esri/widgets/LayerList",
  "esri/widgets/Search",
  "esri/widgets/DistanceMeasurement2D"
], (
  Map,
  MapView,
  UniqueValueRenderer,
  PopupTemplate,
  GeoJSONLayer,
  BasemapGallery,
  Expand,
  SimpleMarkerSymbol,
  Legend,
  LayerList,
  Search,
  DistanceMeasurement2D
) => {
  let map = new Map({
    basemap: "osm",
  });

  let view = new MapView({
    map: map,
    container: "map",
    center: [22.5666667, 51.25],
    zoom: 3,
  });

  let poinRen = {
    type: "unique-value",
    field: "nazwa",
    legendOptions: { title: "Nazwa rasy" },
    uniqueValueInfos: [
      {
        value: "Kot Syjamski",
        symbol: {
          type: "simple-marker",
          color: "blue",
        },
      },
      {
        value: "Maine Coon",
        symbol: {
          type: "simple-marker",
          color: "red",
        },
      },
      {
        value: "Devon Rex",
        symbol: {
          type: "simple-marker",
          color: "pink",
        },
      },
      {
        value: "Kot Syberyjski",
        symbol: {
          type: "simple-marker",
          color: "green",
        },
      },
    ],
  };

  let popTmpl = new PopupTemplate({
    title: "{nazwa}",
    content: "Koty tej rasy pochodzą z kraju: {kraj}",
  });

  let geoJSONLayer = new GeoJSONLayer({
    url: "./script/cats.geojson",
    renderer: poinRen,
    popupTemplate: popTmpl,
    title: "Rasy kotów",
  });

  map.add(geoJSONLayer);

  //widgety
  let bmWg = new BasemapGallery({
    view: view,
  });

  let expandWg = new Expand({
    view: view,
    content: bmWg,
  });

  view.ui.add(expandWg, {
    position: "top-right",
  });

  let legend = new Legend({
    view: view,
  });

  view.ui.add(legend, "bottom-right");

  let btnGoTo = document.getElementsByClassName("btnGoTo");

  for (let btn of btnGoTo) {
    let idName = parseInt(btn.getAttribute("idName"));
    btn.addEventListener("click", () => {
      view.popup.close()
      geoJSONLayer.queryFeatures().then((obj) => {
        let geo = obj.features.find((x) => x.attributes.id === idName).geometry;
        
        let opts = {
          duration: 2000,
        };

        view.goTo({ target: geo, zoom: 6}, opts);
        view.popup.open({ 
          location: geo.centroid,
          features: [obj.features.find((x) => x.attributes.id === idName)]
        }); 
      });

    });
  }

  let layerList = new LayerList({
    view: view
  });

  let expandLL = new Expand({
    view: view,
    content: layerList,
  });
  view.ui.add(expandLL, {
    position: "top-left"
  });

  let searchWidget = new Search({
    view: view
  });
  let expandSW = new Expand({
    view: view,
    content: searchWidget,
  });
  view.ui.add(expandSW, {
    position: "top-left",
    index: 2
  });

  let measurementWidget = new DistanceMeasurement2D({
    view: view
  });
  let expandMA = new Expand({
    view: view,
    content: measurementWidget,
  });
  view.ui.add(expandMA, "top-right");


});
