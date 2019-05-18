/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

importScripts(
  "/precache-manifest.c3566b0436a43da66975a06b3e424f00.js"
);

workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/index.html", {
  
  blacklist: [/^\/_/,/\/[^\/]+\.[^\/]+$/],
});

importScripts('https://www.gstatic.com/firebasejs/4.2.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.2.0/firebase-messaging.js')

/*
 * Now initialize firebase app in the servie worker.
 */
firebase.initializeApp({
  apiKey: 'AIzaSyC-TdnrW92tPP3_n7oo8netffqH5aJF_0o',
  authDomain: 'game-store-zrg-team.firebaseapp.com',
  databaseURL: 'https://game-store-zrg-team.firebaseio.com',
  projectId: 'game-store-zrg-team',
  storageBucket: 'game-store-zrg-team.appspot.com',
  messagingSenderId: '790266601902'
})

var messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function (payload) {
  var notificationTitle = payload.data.title
  var notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon
  }
  return self.registration.showNotification(notificationTitle,
    notificationOptions)
})
