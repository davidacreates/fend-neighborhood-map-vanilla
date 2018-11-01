import { MAP_API_KEY } from '../credentials';
import { mapBase } from './api';

// load google maps script
// reference: https://github.com/ryanwaite28/script-store/blob/master/js/react_resolve_google_maps.js
export function loadGoogleMaps() {
  return new Promise(resolve => {
    // define the global callback that will run when google maps is loaded
    window.resolveGoogleMapsPromise = function() {
      // resolve the google object
      resolve(window.google);
      // delete the global callback to tidy up since it is no longer needed
      delete window.resolveGoogleMapsPromise;
    };
    // Now, Load the Google Maps API
    const script = document.createElement('script');
    script.src = `${mapBase()}key=${MAP_API_KEY}&callback=resolveGoogleMapsPromise`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  });
}
