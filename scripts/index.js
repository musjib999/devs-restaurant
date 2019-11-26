const characterList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
  if(user){
    //account info
    db.collection('user').doc(user.uid).get().then(doc => {
        const html = `
        <div>You are logged in as ${user.email}</div>
        <div>${doc.data().bio}    
      `;
    accountDetails.innerHTML = html;
    });
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  }else{
    accountDetails.innerHTML = '';
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}
//setup character
const setupCharacter = (data) => {
  if(data.length){
    let html =  '';
    data.forEach(doc => {
      const hero = doc.data();
      const li = `
      <li>
        <div class="collapsible-header grey lighten-4">${hero.title}</div>
        <div class="collapsible-body white"><span>${hero.content}</span></div>
        <button id="cross" style="color:red">X</button>
      </li>
      `;
      html += li;
    });
    characterList.innerHTML = html;
  }else{
    characterList.innerHTML = '<h3 class="center-align" style="color:white">Login or Signup to add food</h3>';
  }
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});