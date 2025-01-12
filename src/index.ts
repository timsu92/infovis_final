import L from "leaflet";
import "leaflet/dist/leaflet.css";

import data from "../data.json";

// component settings
const map = L.map("map").setView([25.077855115246464, 121.55387115519812], 12);

// 底圖
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const abs_year = document.getElementById("abs_year") as HTMLSelectElement;
const view_mode = document.getElementById("view_mode") as HTMLSelectElement;

let geojson: L.GeoJSON | undefined = undefined;

function updateGeojson() {
  if (geojson) {
    map.removeLayer(geojson);
  }

  geojson = L.geoJSON(
    // @ts-ignore
    data,
    {
      pointToLayer: function (geoJsonPoint, latlng) {
        if (view_mode.value === "log 7") {
          return L.circleMarker(latlng, { radius: Math.log(geoJsonPoint.properties[abs_year.value + "年"] / 100000) / Math.log(7) * 17 });
        } else {
          return L.circleMarker(latlng, { radius: geoJsonPoint.properties[abs_year.value + "年"] / 100000 });
        }
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.名稱 + "\n" + feature.properties[abs_year.value + "年"] + "人");
        layer.bindTooltip(feature.properties.名稱);
      },
    }
  );

  geojson.addTo(map);
}

// element hooks
abs_year.addEventListener("change", updateGeojson);
view_mode.addEventListener("change", updateGeojson);

//lifespan hooks
function onMounted() {
  updateGeojson();
}

onMounted();