import L from "leaflet";
import "leaflet/dist/leaflet.css";

const map = L.map("map").setView([25.077855115246464, 121.55387115519812], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
