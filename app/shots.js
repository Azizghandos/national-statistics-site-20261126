// NusantaraStats — deterministic screenshot scenes. Each ?shot= value drives
// the real site code to one exact view, so a screenshot is a real render of
// the site and reproducible: the same query always shows the same view.
import { ROUTES } from './views.js';

// Read the scene from the URL before the main boot runs: this module is
// loaded first (see index.html) and only sets location.hash when a shot
// scene asks for a route other than the overview.
const params = new URLSearchParams(window.location.search);
const shot = params.get('shot');
const scenes = {
  overview: '#/',
  economy: '#/economy',
  provinces: '#/provinces',
  phone: '#/',
};
if (shot && scenes[shot]) {
  window.location.hash = scenes[shot];
  document.body.dataset.shot = shot;
}
// Unknown ?shot= values are ignored: the site just loads its overview.
