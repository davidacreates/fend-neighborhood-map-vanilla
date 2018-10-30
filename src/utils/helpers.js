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
