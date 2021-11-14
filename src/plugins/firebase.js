import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAB03gokswwJmhsRxEBG0cr5PKqZRR00yQ",
  authDomain: "lista-tarefas-fb-68d04.firebaseapp.com",
  projectId: "lista-tarefas-fb-68d04",
  storageBucket: "lista-tarefas-fb-68d04.appspot.com",
  messagingSenderId: "382978641835",
  appId: "1:382978641835:web:7cd06d85531a2ed3524cee"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()

const profileCollection = db.collection('profile')
const tasksCollection = db.collection('tasks')

export {
    db, auth, profileCollection, tasksCollection
}