import firebaseApp from 'firebase/app'
import firebase from '../../common/utils/firebase'
// import $ from 'jquery'

export async function getProduct (uid) {
  try {
    const result = await firebase.db
      .collection(`products`)
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
export async function getPresents () {
  try {
    const data = {}
    const result = await firebase.db
      .collection('presents')
      .get()
    if (result && !result.empty) {
      result.forEach((doc) => {
        const item = doc.data()
        data[doc.id] = {
          ...item,
          uid: doc.id,
          id: doc.id
        }
      })
    }
    return data
  } catch (err) {
    return undefined
  }
}
export async function getProducts (limit, offset = undefined, search = undefined) {
  let total = 0
  let totalPage = 0
  let data = []
  let nextOffset = offset
  let productRef = firebase.db
    .collection(`products`)
    .limit(limit)
  try {
    if (search && search.name) {
      productRef = productRef
        .orderBy('searchName')
        .orderBy('time', 'desc')
        .where('searchName', '>=', `${search.name}`.trim().toLowerCase().split(' ').join('-'))
        .where('searchName', '<=', `${search.name}`.trim().toLowerCase().split(' ').join('-'))
      if (offset) {
        productRef = productRef.startAfter(offset)
      }
      productRef = productRef.limit(limit)
    } else if (search && search.platform) {
      productRef = productRef
        .orderBy('time', 'desc')
        .where('platform', '==', search.platform)
      if (offset) {
        productRef = productRef.startAfter(offset)
      }
      productRef = productRef.limit(limit)
    } else if (search && search.price) {
      productRef = productRef
        .orderBy('price')
        .orderBy('time', 'desc')
        .where('price', '>=', search.price.from)
        .where('price', '<=', search.price.to)
      if (offset) {
        productRef = productRef.startAfter(offset)
      }
      productRef = productRef.limit(limit)
    } else {
      productRef = productRef
        .orderBy('time', 'desc')
      const tableProduct = await firebase.db.collection('statistics').doc('products').get()
      if (tableProduct && tableProduct.exists) {
        total = tableProduct.data().count
        totalPage = Math.ceil(total / limit)
        if (offset) {
          productRef = productRef.startAfter(offset)
        }
        productRef = productRef.limit(limit)
      }
    }
    productRef = await productRef.get()
    if (productRef && !productRef.empty) {
      nextOffset = productRef.docs[productRef.docs.length - 1]
      nextOffset = nextOffset.data().time
      productRef.forEach((doc) => {
        const item = doc.data()
        data.push({
          ...item,
          uid: doc.id
        })
      })
    }
    return {
      data,
      total,
      totalPage,
      nextOffset,
      offset: nextOffset
    }
  } catch (err) {
    console.log('getProducts error', err)
    return undefined
  }
}

export const addProduct = async (data) => {
  const time = firebaseApp.firestore.Timestamp.now()
  const newRef = firebase.db.collection(`products/`).doc()
  return newRef.set({
    ...data,
    searchName: `${data}`.trim().toLowerCase().split(' ').join('-'),
    time: time.toMillis()
  }).then(response => {
    return true
  })
}
