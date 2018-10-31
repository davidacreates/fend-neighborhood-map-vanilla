import { MAP_API_KEY } from '../credentials';

// load google maps script
// reference: https://github.com/ryanwaite28/script-store/blob/master/js/react_resolve_google_maps.js
export function loadGoogleMaps() {
  return new Promise((resolve, reject) => {
    // define the global callback that will run when google maps is loaded
    window.resolveGoogleMapsPromise = function() {
      // resolve the google object
      resolve(window.google);
      // delete the global callback to tidy up since it is no longer needed
      delete window.resolveGoogleMapsPromise;
    };
    // Now, Load the Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${MAP_API_KEY}&callback=resolveGoogleMapsPromise`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // TODO: See if this reject message actually works
    window.reject = function() {
      const message = `Could not load google maps`;
      reject(new Error(message));
    };
  });
}

// TODO: Delete this function as the one above replaces it
// load google maps script
// reference: https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
export function loadScript(url) {
  const ref = window.document.getElementsByTagName('script')[1];
  const script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  ref.parentNode.insertBefore(script, ref);
}
