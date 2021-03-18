firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      // Signed in
      console.log('signed in')
      let db = firebase.firestore()
  
      db.collection('users').doc(user.uid).set({
          name: user.displayName,
          email: user.email
        })
  
      // Render all posts when the page is loaded
      let querySnapshot = await db.collection('bought').orderBy('created').get()
      let whiskeys = querySnapshot.docs
      for (let i=0; i<whiskeys.length; i++) {
        let productId = whiskeys[i].id
        let productData = whiskeys[i].data()
        let productName = productData.name
        let productType = productData.type
        let productImageUrl = productData.imageUrl
        let productPrice = productData.price
        renderPost(productId, productName, productType, productImageUrl, productPrice)

      }
  
      async function renderPost(productId, productName, productType, productImageUrl, productPrice) {
        document.querySelector('.purchase').insertAdjacentHTML('beforeend', `
        <div class="card-wrapper">
            <div class="card post-${productId}">
              <img src="${productImageUrl}">
              <div class="mb-30 text-center font-bold text-2xl"> ${productName} - ${productType} - $${productPrice}</div>
            </div>
        </div>     
        `)
        
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
        signInSuccessUrl: 'My_Purchase.html'
      }
  
      // Starts FirebaseUI Auth
      ui.start('.sign-in-or-sign-out', authUIConfig)
    }
  })
  