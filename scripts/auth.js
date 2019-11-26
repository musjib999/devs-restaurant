//listen to user state
auth.onAuthStateChanged( user => {
  console.log(user);
  if (user){
    //get data
    db.collection('character').onSnapshot(snapshot => {
      setupCharacter(snapshot.docs);
      setupUI(user);
    }, err => {
      console.log(err.message)
    });
  }else{
    setupUI();
    setupCharacter([]);
  }
});
//Adding character
const characterForm = document.querySelector('#create-form');
characterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('character').add({
    content:characterForm['content'].value,
    title:characterForm['title'].value
  }).then(() => {
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    characterForm.reset();

  }).catch(err =>{
    console.log(err.message);
  })
 
});
// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('user').doc(cred.user.uid).set({
      bio:signupForm['signup-bio'].value
    });
  }).then(() => {
      // close the signup modal & reset form
      const modal = document.querySelector('#modal-signup');
      M.Modal.getInstance(modal).close();
      signupForm.reset();
  });
  
});

//signout users

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    console.log(cred.user);
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });

});


function googleLogin(){
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(result => {
    const user = result.user;
    document.write(`Hello ${user.displayName}`);
    console.log(user);
  })
  .catch(console.log);
}














