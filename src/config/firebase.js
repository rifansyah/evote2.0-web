import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCLajxmBgq5kpvjSS6gVLHfDyINFNkQfUs',
  authDomain: 'https://evote-bem.firebaseio.com',
  databaseURL: 'https://evote-bem.firebaseio.com',
  projectId: 'evote-bem',
  storageBucket: 'evote-bem.appspot.com',
  databaseUrl: "https://evote-bem.firebaseio.com/",
}

firebase.initializeApp(config);
export default firebase;
