import L from "leaflet";
import "leaflet/dist/leaflet.css";

import data from "../data.json";

const map = L.map("map").setView([25.077855115246464, 121.55387115519812], 12);

// 底圖
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const geojson = L.geoJSON(
  // @ts-ignore
  data,
  {
    pointToLayer: function (geoJsonPoint, latlng) {
      return L.circleMarker(latlng, { radius: 10 });
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup(feature.properties.name);
    },
  }
);

geojson.addTo(map);
