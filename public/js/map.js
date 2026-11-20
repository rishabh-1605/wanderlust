if (Array.isArray(coordinates) && coordinates.length === 2) {
  mapboxgl.accessToken = mapToken;

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: coordinates,
    zoom: 11,
  });

  const popup = new mapboxgl.Popup({
    offset: 25,
    closeButton: false,
    closeOnClick: false,
  }).setText(listingLocation);

  const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(coordinates)
    .setPopup(popup)
    .addTo(map);

  marker.togglePopup(); // opens the popup by default
} else {
  document.getElementById("map").style.display = "none";
}
