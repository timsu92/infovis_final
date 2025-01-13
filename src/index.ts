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
const from_year = document.getElementById("from_year") as HTMLSelectElement;
const to_year = document.getElementById("to_year") as HTMLSelectElement;
const view_mode2 = document.getElementById("view_mode2") as HTMLSelectElement;
const tab1 = document.getElementById("tab1") as HTMLInputElement;
const tab2 = document.getElementById("tab2") as HTMLInputElement;

let geojson: L.GeoJSON | undefined = undefined;
let major_mode: "tab1" | "tab2" = "tab1";

function updateGeojson() {
  if (geojson) {
    map.removeLayer(geojson);
  }

  geojson = L.geoJSON(
    // @ts-ignore
    data,
    {
      pointToLayer: function (geoJsonPoint, latlng) {
        let raw_data;
        if (major_mode === "tab1") {
          raw_data = geoJsonPoint.properties[abs_year.value + "年"];
        } else {
          raw_data =
            geoJsonPoint.properties[to_year.value + "年"] -
            geoJsonPoint.properties[from_year.value + "年"];
        }

        if (view_mode.value === "log 7") {
          return L.circleMarker(latlng, {
            radius: (Math.log(raw_data / 100000) / Math.log(7)) * 17,
          });
        } else if (view_mode.value === "絕對數字") {
          return L.circleMarker(latlng, {
            radius: raw_data / 100000,
          });
        } else if (view_mode.value === "Steven's Power Law") {
          const k = 0.13;
          return L.circleMarker(latlng, {
            radius: Math.sqrt((k * Math.pow(raw_data, 0.7)) / Math.PI),
          });
        } else {
          throw new Error("no such view mode: " + view_mode.value);
        }
      },
      onEachFeature: function (feature, layer) {
        let raw_data;
        if (major_mode === "tab1") {
          raw_data = feature.properties[abs_year.value + "年"];
        } else {
          raw_data =
            feature.properties[to_year.value + "年"] -
            feature.properties[from_year.value + "年"];
        }

        layer.bindPopup(feature.properties.名稱 + " " + raw_data + "人");
        layer.bindTooltip(feature.properties.名稱 + " " + raw_data + "人");
      },
    },
  );

  geojson.addTo(map);
}

// element hooks
abs_year.addEventListener("change", updateGeojson);
view_mode.addEventListener("change", updateGeojson);
from_year.addEventListener("change", updateGeojson);
to_year.addEventListener("change", updateGeojson);
view_mode2.addEventListener("change", () => {
  view_mode.value = view_mode2.value;
  updateGeojson();
});
tab1.addEventListener("click", () => {
  major_mode = "tab1";
  view_mode.value = view_mode2.value;
  updateGeojson();
});
tab2.addEventListener("click", () => {
  major_mode = "tab2";
  view_mode2.value = view_mode.value;
  updateGeojson();
});

//lifespan hooks
function onMounted() {
  updateGeojson();
}

onMounted();
