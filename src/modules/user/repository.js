import firebaseApp from 'firebase/app'
import firebase from '../../common/utils/firebase'

export async function getProductsByUser (uid) {
  try {
    const data = []
    const result = await firebase.db
      .collection(`products`)
      .orderBy('time', 'desc')
      .where('user', '==', `${uid}`)
      .get()
    if (result && !result.empty) {
      result.forEach((doc) => {
        const item = doc.data()
        data.push({
          ...item,
          uid: doc.id
        })
      })
      return data
    }
    throw new Error('NOT_EXIST')
  } catch (err) {
    console.log('err', err)
    return undefined
  }
}

export async function deleteProduct (uid) {
  try {
    await firebase.db
      .collection(`products`)
      .doc(`${uid}`)
      .delete()
    return true
  } catch (err) {
    console.log('err', err)
    return false
  }
}

export async function getUser (user) {
  try {
    const result = await firebase.db.collection('users').doc(user.uid).get()
    if (result.exists) {
      const data = result.data()
      return { ...data, uid: user.uid }
    }
    return undefined
  } catch (err) {
    console.log('getAuthentication err', err)
    return undefined
  }
}

export const getUserRooms = async (user, listener = undefined) => {
  if (!user) {
    return undefined
  }
  let instance = null
  const ref = firebase.db
    .collection(`users/${user.uid}/rooms`)
    .where('enable', '==', true)
  if (listener) {
    instance = ref.onSnapshot((data) => {
      listener({
        data,
        user
      })
    })
  }
  const result = await ref
    .orderBy('time', 'desc')
    .get()
  return {
    data: result || [],
    instance
  }
}

export const updateUserRooms = async (user, room, message) => {
  if (!user) {
    return undefined
  }
  return firebase.db
    .collection(`users/${user.uid}/rooms`)
    .doc(`${room.udid}`)
    .update({
      message
    })
}

export const addUserRooms = async (user, data) => {
  if (!user || !data.id) {
    return undefined
  }
  const time = firebaseApp.firestore.Timestamp.now()
  return firebase.db
    .collection('users')
    .doc(`${user.uid}`)
    .collection('rooms')
    .doc(`${data.id}`)
    .set({
      ...data,
      time: time.toMillis()
    }).then((ref) => {
      return data
    })
}

export const clearNotification = async (user, notifications) => {
  const batch = firebase.db.batch()
  notifications.forEarch(item => {
    const ref = firebase.db
      .collection('notifications')
      .doc(`${user.uid}`)
      .collection('messages')
      .doc(`${notifications.uid}`)
    batch.update(ref, { enable: false })
  })
  return batch.commit()
}

export const setUserPublicKey = async (user, publicKey) => {
  return firebase.db
    .collection('users')
    .doc(`${user.uid}`)
    .update({
      publicKey
    }).then(response => {
      return { publicKey, response }
    })
}

export const updateUserInformation = async (userId, userInfo) => {
  const newRef = firebase.db.collection('users').doc(`${userId}`)
  return newRef.set({
    ...userInfo
  }).then(response => {
    return true
  })
}

export const getDownloadUrl = async (filename, userID) => {
  return firebase
      .storage
      .ref(`${userID}/avatar`)
      .child(filename)
      .getDownloadURL()
      .then(url => {
        return url
      })
}

export const userInformationListener = async (userUID, callback) => {
  return firebase.db
    .collection('users')
    .doc(`${userUID}`)
    .onSnapshot(callback)
}

export const notificationListener = async (userUID, callback) => {
  return firebase.db
    .collection('notifications')
    .doc(`${userUID}`)
    .collection('messages')
    .where('enable', '==', true)
    .orderBy('time', 'desc')
    .limit(100)
    .onSnapshot(callback)
}
