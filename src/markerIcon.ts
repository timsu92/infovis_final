import L from "leaflet";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import shadow from "leaflet/dist/images/marker-shadow.png";
import retina from "leaflet/dist/images/marker-icon-2x.png";

export default L.icon({
  "iconUrl": icon,
  "shadowUrl": shadow,
  "iconRetinaUrl": retina,
  "iconSize": [25, 41],
  "iconAnchor": [4, 41],
  "popupAnchor": [9, -37],
  "tooltipAnchor": [17, -28],
  "shadowSize": [25, 41],
  "shadowAnchor": [0, 41],
});
