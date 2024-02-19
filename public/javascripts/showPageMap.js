mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/outdoors-v11', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 7, // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());
// create the popup
// const popup = new mapboxgl.Popup({ offset: 25 }).setText(
//     'Construction on the Washington Monument began in 1848.'
// );
const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
    `<h5>${campground.title}</h5><p>${campground.location}</p>`
);

     
// create DOM element for the marker
const el = document.createElement('div');
el.id = 'marker';

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(popup)
    .addTo(map)

    // .setPopup(
    //     new mapboxgl.Popup({ offset: 25 })
    //         .setHTML(
    //             `<h3>${campground.title}</h3><p>${campground.location}</p>`
    //         )
    // )