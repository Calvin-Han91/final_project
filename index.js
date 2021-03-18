firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    let db = firebase.firestore()
    
    db.collection('users').doc(user.uid).set({
      name: user.displayName,
      email: user.email
    })

    document.querySelector('.sign-in-or-sign-out').innerHTML = `
            Signed in as: ${user.displayName} <Button class="sign-out bg-black-500 font-bold text-yellow-500 px-4 py-2 rounded-xl">Sign Out</button>
            `
    document.querySelector('.sign-out').addEventListener('click', function(event) {
              event.preventDefault()
              console.log('sign out clicked')
              firebase.auth().signOut()
              document.location.href = 'index.html'
            })

    document.querySelector('.mainframe').insertAdjacentHTML('beforeend', `
        <div class="md:p-16 md:w-1/3 space-y-4">
          <button class="browse font-bold text-xl underline">Browse Products</button>
          <p><img class="rounded-xl w-96" src="https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/iStock-533225488_16x9.jpg?itok=2HUFc6Ct"></p>
        </div>

        <div class="md:p-16 md:w-1/3 space-y-4">
          <button class="list font-bold text-xl underline">List My Products</button>
          <p><img class="rounded-xl w-96" src="https://i.etsystatic.com/20162739/r/il/6dcdfa/1936621475/il_794xN.1936621475_n2e8.jpg"></p>
        </div>

        <div class="md:p-16 md:w-1/3 space-y-4">
          <button class="purchase font-bold text-xl underline">My Purchases</button>
          <p><img class="rounded-xl w-96" src="https://previews.123rf.com/images/infadel/infadel1504/infadel150400024/38661963-black-shopping-trolley-with-shadow-concept-of-daily-purchases-christmas-sale-and-on-line-ecommerce-i.jpg"></p>
        </div>
          `)

    document.querySelector('.browse').addEventListener('click', async function(event) {
      event.preventDefault()
      document.location.href = 'Merchant_store.html'
    })

    document.querySelector('.list').addEventListener('click', async function(event) {
      event.preventDefault()
      document.location.href = 'Product_Listing.html'
    })

    document.querySelector('.purchase').addEventListener('click', async function(event) {
      event.preventDefault()
      document.location.href = 'My_Purchase.html'
    })

  } else {
    // Signed out
    console.log('signed out')

    document.querySelector('form').classList.add('hidden')

    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: 'index.html'
    }

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }
})