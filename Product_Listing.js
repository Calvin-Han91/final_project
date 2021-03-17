let db = firebase.firestore()

// Change main event listener from DOMContentLoaded to 
// firebase.auth().onAuthStateChanged and move code that 
// shows login UI to only show when signed out
firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    // Signed in
    console.log('signed in')

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

    // Listen for the form submit and create/render the new post
    document.querySelector('form').addEventListener('submit', async function(event) {
      event.preventDefault()
      let productName = document.querySelector('#product-name').value
      let productType = document.querySelector('#product-type').value
      let productImageUrl = document.querySelector('#image-url').value
      let productPrice = document.querySelector('#product-price').value
      let docRef = await db.collection('whiskey').add({ 
        name: productName,
        type: productType,
        imageUrl: productImageUrl, 
        price: productPrice,
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
      let productId = docRef.id // the newly created document's ID
      renderPost(productName, productType, productImageUrl, productPrice)
    })

    // Render all posts when the page is loaded
    let querySnapshot = await db.collection('whiskey').orderBy('created').get()
    let whiskeys = querySnapshot.docs
    for (let i=0; i<whiskeys.length; i++) {
      let productData = whiskeys[i].data()
      let productName = productData.name
      let productType = productData.type
      let productImageUrl = productData.imageUrl
      let productPrice = productData.price
      renderPost(productName, productType, productImageUrl, productPrice)
    }

  } else {
    // Signed out
    console.log('signed out')

    // Hide the form when signed-out
    document.querySelector('form').classList.add('hidden')

    // Initializes FirebaseUI Auth
    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    // FirebaseUI configuration
    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: 'kelloggram.html'
    }

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }
})

async function renderPost(productName, productType, productImageUrl, productPrice) {
    document.querySelector('.whiskey').insertAdjacentHTML('beforeend', `
      <div class="post-${productId} md:mt-16 mt-8 space-y-8">
        <div class="md:mx-0 mx-4">
          <span class="font-bold text-xl">${productName}</span>
        </div>
    
        <div class="md:mx-0 mx-4">
          <span class="font-bold text-xl">${productType}</span>
        </div>

        <div>
          <img src="${productImageUrl}" class="w-full">
        </div>
    
        <div class="md:mx-0 mx-4">
          <span class="font-bold text-xl">$${productPrice}</span>
        </div>
      </div>
    `)
    
  }