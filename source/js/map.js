const map = L.map('map').setView([59.968277, 30.317432], 18);

const iconMarker = L.icon({
  iconUrl: '../img/map-pin.png',

  iconSize: [38, 50],
  iconAnchor: [22, 50],
});

L.marker([59.968277, 30.317432], {icon: iconMarker}).addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
