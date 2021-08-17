import firebase from 'firebase'
import * as firebaseui from 'firebaseui';

const config = {
    apiKey: "AIzaSyDQ512Xjo0IQhRXOiIW5KomBdClaKk0WtU",
    authDomain: "onlineshop-9e085.firebaseapp.com",
    databaseURL: "https://onlineshop-9e085-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "onlineshop-9e085",
    storageBucket: "onlineshop-9e085.appspot.com",
    messagingSenderId: "955013544277",
    appId: "1:955013544277:web:1de5749d37a24d3125d7dc",
    measurementId: "G-DRN7NZQN7J"
};

const auth = {
    context: null,
    uiConfig: null,
    ui: null,

    init(context) {
        this.context = context;
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        this.uiConfig = {
            signInSuccessUrl: '/',
            signInOptions: [
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ]
        }
        this.ui = new firebaseui.auth.AuthUI(firebase.auth());

        firebase.auth().onAuthStateChanged((user) => {
            this.context.$store.dispatch('setCurrentUser')

            let requireAuth = this.context.$route.matched.some(record => record.meta.requireAuth)
            let guestOnly = this.context.$route.matched.some(record => record.meta.guestOnly)

            if(requireAuth && !user) this.context.$router.push('auth')
            else if (guestOnly && user) this.context.$router.push('/product/1')
        });
    },
    authForm(container) {
        this.ui.start(container, this.uiConfig);
    },
    user() {
        return this.context ? firebase.auth().currentUser : null;
    },
    logout() {
        firebase.auth().signOut();
    }
}

export default auth;
