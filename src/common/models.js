export const DEFAULT_LANGUAGE = 'en'
export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyC-TdnrW92tPP3_n7oo8netffqH5aJF_0o',
  authDomain: 'game-store-zrg-team.firebaseapp.com',
  databaseURL: 'https://game-store-zrg-team.firebaseio.com',
  projectId: 'game-store-zrg-team',
  storageBucket: 'game-store-zrg-team.appspot.com',
  messagingSenderId: '790266601902'
}
export const ACTION_CODE_SETTING = {
  url: 'https://zrg-team.github.io/quick-chat/',
  // This must be true.
  handleCodeInApp: true
}

export const MAP_OPTIONS = {
  scrollwheel: false,
  zoomControl: true,
  styles: [
    {
      featureType: 'water',
      stylers: [
        { saturation: 43 },
        { lightness: -11 },
        { hue: '#0088ff' }
      ]
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [
        { hue: '#ff0000' },
        { saturation: -100 },
        { lightness: 99 }
      ]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#808080' }, { lightness: 54 }]
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'geometry.fill',
      stylers: [{ color: '#ece2d9' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry.fill',
      stylers: [{ color: '#ccdca1' }]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#767676' }]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#ffffff' }]
    },
    { featureType: 'poi', stylers: [{ visibility: 'off' }] },
    {
      featureType: 'landscape.natural',
      elementType: 'geometry.fill',
      stylers: [{ visibility: 'on' }, { color: '#b8cb93' }]
    },
    { featureType: 'poi.park', stylers: [{ visibility: 'on' }] },
    {
      featureType: 'poi.sports_complex',
      stylers: [{ visibility: 'on' }]
    },
    { featureType: 'poi.medical', stylers: [{ visibility: 'on' }] },
    {
      featureType: 'poi.business',
      stylers: [{ visibility: 'simplified' }]
    }
  ]
}

export const TIMEOUT = 12000

export const GOOGLE_API_KEY = 'AIzaSyCAQuBBJQNTGF3mMDGC1IX7Kkf-5Szop18'

export const MAP_API_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=drawing,places`
