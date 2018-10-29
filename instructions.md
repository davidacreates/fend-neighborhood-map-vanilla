### Instructions

**Task**
Develop a single page application featuring a map of your neighborhood or a neighborhood you would like to visit. You will then add functionality to this map including highlighted locations, third-party data about those locations and various ways to browse the content.

### Application Functionality

#### Maps & Markers

- [x] Add a full-screen map to your page using the Google Maps API. For the sake of efficiency, the map API should be called only once.
- [x] Write code required to display map markers identifying at least 5 locations that you are interested in within this neighborhood.
- [] Map displays all location markers by default, and displays the filtered subset of location markers when a filter is applied.
- [x] Clicking a marker displays unique information about a location somewhere on the page (modal,separate div, inside an infoWindow).
[] Any additional custom functionality provided in the app functions error-free.

### List View
- [] A list-view of location names is provided which displays all locations by default
- [] Clicking a location on the list displays unique information about the location from a 3rd party API, and animates its associated map marker (e.g. bouncing, color change.)
- [] Provide attribution to the data sources and/or APIs you use (e.g., if you are using Foursquare, indicate somewhere in your interface and in your README that you used the Foursquare API)
- [] List functionality is responsive and runs error free.

### Location Filter
- [] Includes a text input field or dropdown menu that filters the map markers and list items to locations matching the text input or selection. Filter function runs error-free.

### Asynchronous Data Usage
- [x] Application utilizes the Google Maps API or another mapping system and at least one non-Google third-party API
- [x] All data requests are retrieved in an asynchronous manner using either the Fetch API or XMLHttpRequest.
- [] Data requests that fail are handled gracefully using common fallback techniques (i.e. AJAX error or fail methods). 'Gracefully' means the user isn’t left wondering why a component isn’t working. If an API doesn’t load there should be some visible indication on the page that it didn’t load.
- [] You should handle errors if the browser has trouble initially reaching the third-party site as well. For example, consider a user using your Neighborhood Map, but the user's firewall prevents him/her from accessing the Instagram servers.

### Interface Design
- [] All application components render on-screen in a responsive manner.
- [] All application components are usable across modern desktop, tablet, and phone browsers.

### Accessibility
- [] Focus is appropriately managed allowing users to noticeably tab through each of the important elements of the page. Modal or interstitial windows appropriately lock focus.
- [] Elements on the page use the appropriate semantic elements. For those elements in which a semantic element is not available, appropriate ARIA roles are defined.
- [] All content-related images include appropriate alternate text that clearly describes the content of the image.

### Offline Use
- [] When available in the browser, the site uses a service worker to cache responses to requests for site assets. Visited pages are rendered when there is no network access.

### Documentation
- [] A README file is included detailing all steps required to successfully run the application.
- [] Comments are present and effectively explain longer code procedures.

#### Step 1. Break down the app into a hierarchy of components. Draw a box around each React component.
- App
  - ListView
    - FilterList
    - ListItem
  - Map
    - Marker
    - InfoWindow

#### Step 2. Determine the data in our app.
- restaurant name
- restaurant lat
- restaurant lng
- restaurant address
- restaurant photo
- filtered markers

#### Step 3. Figure out the data that should be a part of our state:
1.  Is it passed in from a parent via props? If so, it probably isn’t state.

2.  Does it remain unchanged over time? If so, it probably isn’t state.

3.  Can you compute it based on any other state or props in your component?
    If so, it isn’t state.

#### Step 4. Identify where each piece of state lives.
1.  Identify every component that renders something based on that state.

2.  If multiple components need the same piece of state, put that piece of state into those components' parent-most component.

If you can’t find a component where it makes sense to own the state, create a new component simply for holding the state and add it somewhere in the hierarchy above the common owner component.

state:
- venues
- markers
- query
- iconAnimation
- openInfoWindow
- closeInfoWindow
- getVenueDetails
- selectVenueListItem
- filterVenues
