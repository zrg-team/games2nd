import firebaseApp from 'firebase/app'
import firebase from '../../common/utils/firebase'

export const getMessages = (listener = undefined) => {
  const ref = firebase.realtime
    .ref('publics/hcm')
    .orderByChild('time')
    .limitToLast(256)
  return new Promise((resolve, reject) => {
    try {
      ref.on('child_added', function (data) {
        listener(data)
      })
      ref
      .on('value', function (snap) {
        resolve({data: snap, instance: ref})
      })
    } catch (err) {
      console.log('err', err)
      reject(err)
    }
  })
}

export const pushMessage = (message) => {
  const time = firebaseApp.firestore.Timestamp.now()
  const ref = firebase.realtime
    .ref('publics/hcm')
  return ref.push({
    ...message,
    time: time.toMillis()
  })
}

export const postBlog = (data) => {
  const time = firebaseApp.firestore.Timestamp.now()
  const ref = firebase.db
    .collection('blogs')
    .doc()
  return ref.set({
    ...data,
    time: time.toMillis()
  }).then(() => {
    return true
  })
}

export async function getBlog (uid) {
  try {
    const result = await firebase.db
      .collection(`blogs`)
      .doc(`${uid}`)
      .get()
    if (result && result.exists) {
      return {
        uid: result.id,
        ...result.data()
      }
    }
    throw new Error('NOT_EXIST')
  } catch (err) {
    return undefined
  }
}

export const getBlogs = async (offset, limit) => {
  let data = []
  let nextOffset = offset
  let blogRef = firebase.db
    .collection(`blogs`)
    .limit(limit)
  blogRef = blogRef
    .orderBy('time', 'desc')
  if (offset) {
    blogRef = blogRef.startAfter(offset)
  }
  blogRef = blogRef.limit(limit)
  blogRef = await blogRef.get()
  if (blogRef && !blogRef.empty) {
    nextOffset = blogRef.docs[blogRef.docs.length - 1]
    nextOffset = nextOffset.data().time
    blogRef.forEach((doc) => {
      const item = doc.data()
      data.push({
        ...item,
        uid: doc.id
      })
    })
  }
  return {
    data,
    offset: nextOffset
  }
}
