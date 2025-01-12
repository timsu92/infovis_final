import L from "leaflet";
import "leaflet/dist/leaflet.css";

import data from "../data.json";
import markerIcon from "./markerIcon";

L.Marker.prototype.options.icon = markerIcon;

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
    style: function (feature) {
      return {
        // fillColor: feature.properties.color,
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup(feature.properties.name);
    },
  }
);

geojson.addTo(map);
