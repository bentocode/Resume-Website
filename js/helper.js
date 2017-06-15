/*The script in helper.js inserts data elements from resumebuilder.js elements into the DOM
helper.js also generates a customized Google Map*/

var HTMLheaderName = '<h1 id="name">%data%</h1>';
var HTMLheaderRole = '<span id="role">%data%</span><hr>';

var HTMLcontactGeneric = '<li class="flex-item"><span class="orange-text">%contact%</span><span class="white-text">%data%</span></li>';
var HTMLmobile = '<li class="flex-item nobullet"><span class="orange-text">mobile</span><span class="white-text">%data%</span></li>';
var HTMLemailIcon = '<li class="flex-item nobullet fa fa-envelope"><a href="mailto:%data%"></a></li>';
var HTMLemail = '<li class="flex-item nobullet"><span class="orange-text">email</span><span class="white-text">%data%</span></li>';
var HTMLtwitterIcon = '<li class="flex-item nobullet fa fa-twitter"><a href="https://twitter.com/%data%"></a></li>';
var HTMLtwitter = '<li class="flex-item nobullet"><span class="orange-text">twitter</span><span class="white-text">%data%</span></li>';
var HTMLgithubIcon = '<li class="flex-item nobullet fa fa-github"><a href="https://github.com/%data%"></a></li>';
var HTMLgithub = '<li class="flex-item nobullet"><span class="orange-text">github</span><span class="white-text">%data%</span></li>';
var HTMLblogIcon = '<li class="flex-item nobullet fa fa-google-plus"><a href="https://plus.google.com/%data%"></a></li>';
var HTMLblog = '<li class="flex-item nobullet"><span class="orange-text">blog</span><span class="white-text">%data%</span></li>';
var HTMLlocation = '<li class="flex-item nobullet"><span class="orange-text">location</span><span class="white-text">%data%</span></li>';

var HTMLbioPic = '<img src="%data%" class="biopic">';
var HTMLwelcomeMsg = '<span class="welcome-message">%data%</span>';

var HTMLskillsStart = '<h3 id="skills-h3">Skills at a Glance:</h3><ul id="skills" class="flex-column"></ul>';
var HTMLskills = '<li class="flex-item nobullet"><span class="white-text added-space">%data%</span></li>';

var HTMLworkStart = '<div class="work-entry"></div>';
var HTMLworkEmployer = '<a href="#">%data%';
var HTMLworkTitle = ' - %data%</a>';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<div class="location-text">%data%</div>';
var HTMLworkDescription = '<p><br>%data%</p><hr>';

var HTMLprojectStart = '<div class="project-entry"></div>';
var HTMLprojectTitle = '<a href="#">%data%</a>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';
var HTMLprojectDescription = '<p><br>%data%</p>';
var HTMLprojectImage = '<img src="%data%"><hr>';

var HTMLschoolStart = '<div class="education-entry"></div>';
var HTMLschoolName = '<a href="#">%data%';
var HTMLschoolDegree = ' -- %data%</a>';
var HTMLschoolDates = '<div class="date-text">%data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div>';
var HTMLschoolMajor = '<em><br>Major: %data%</em><hr>';

var HTMLonlineClasses = '<h3>Online Classes</h3>';
var HTMLonlineTitle = '<a href="#">%data%';
var HTMLonlineSchool = ' - %data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';
var HTMLonlineURL = '<br><a href="#">%data%</a>';
var googleMap = '<div id="map"></div>';

/*
generate the custom Google Map for the website.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map;
/*
initializeMap() is called when page is loaded.
*/
function initializeMap() {

  var locations;

  var mapOptions = {
    disableDefaultUI: true
  };

  map = new google.maps.Map(document.querySelector('#map'), mapOptions);

  function locationFinder() {

    // initializes an empty array
    var locations = [];

    // adds the single location property from bio to the locations array
    locations.push(bio.contacts.location);

    // forEach loop iterates through places in education object
    education.schools.forEach(function(school){
      locations.push(school.location);
    });

    // forEach loop iterates through places in work object
    work.jobs.forEach(function(job){
      locations.push(job.location);
    });

    return locations;
  }

  /*
  createMapMarker(placeData) reads Google Places search results to create map pins.
  placeData is the object returned from search results containing information
  about a single location.
  */
  function createMapMarker(placeData) {


    var lat = placeData.geometry.location.lat();
    var lon = placeData.geometry.location.lng();
    var name = placeData.formatted_address;
    var bounds = window.mapBounds;
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name
    });
    var infoWindow = new google.maps.InfoWindow({
      content: name
    });

    bounds.extend(new google.maps.LatLng(lat, lon));

    map.fitBounds(bounds);

    map.setCenter(bounds.getCenter());
  }


  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }


  function pinPoster(locations) {
    var service = new google.maps.places.PlacesService(map);
    // Iterates through the array of locations, creates a search object for each location
      locations.forEach(function(place){
      // the search request object
      var request = {
        query: place
      };

      // Actually searches the Google Maps API for location data and runs the callback
      // function with the search results after each search.
      service.textSearch(request, callback);
    });
  }

  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // locations is an array of location strings returned from locationFinder()
  locations = locationFinder();

  // pinPoster(locations) creates pins on the map for each location in
  // the locations array
  pinPoster(locations);

}

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
  //Make sure the map bounds get updated on page resize
 map.fitBounds(mapBounds);
});
