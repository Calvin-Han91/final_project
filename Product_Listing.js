firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    // Signed in
    console.log('signed in')
    let db = firebase.firestore()

    db.collection('users').doc(user.uid).set({
        name: user.displayName,
        email: user.email
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
      renderPost(productId, productName, productType, productImageUrl, productPrice)

      document.querySelector('#product-name').value = ''
      document.querySelector('#product-type').value = ''
      document.querySelector('#image-url').value = ''
      document.querySelector('#product-price').value = ''
    })

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
      signInSuccessUrl: 'Product_Listing.html'
    }

    // Starts FirebaseUI Auth
    ui.start('.sign-in-or-sign-out', authUIConfig)
  }
})
