import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

let app, db
export function initializeFirebase(){
  const firebaseConfig = {
    apiKey: 'TU_API_KEY',
    authDomain: 'TU_PROJECT_ID.firebaseapp.com',
    projectId: 'TU_PROJECT_ID',
    storageBucket: 'TU_PROJECT_ID.appspot.com',
    messagingSenderId: 'NUMERO',
    appId: 'APP_ID'
  }
  app = initializeApp(firebaseConfig)
  db = getFirestore(app)
}

export { db }
