
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
