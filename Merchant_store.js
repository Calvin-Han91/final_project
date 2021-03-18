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
      let querySnapshot = await db.collection('whiskey').orderBy('created').get()
      let whiskeys = querySnapshot.docs
      for (let i=0; i<whiskeys.length; i++) {
        let productId = whiskeys[i].id
        let productData = whiskeys[i].data()
        let productName = productData.name
        let productType = productData.type
        let productImageUrl = productData.imageUrl
        let productPrice = productData.price
        renderPost(productId, productName, productType, productImageUrl, productPrice)

        document.querySelector('.addToCartButton').addEventListener('click', async function(event) {
            event.preventDefault()
            await db.collection('bought').doc(`.whiskey-${productId}-${user.uid}`).set({
                name: productName,
                type: productType,
                imageUrl: productImageUrl, 
                price: productPrice,
                created: firebase.firestore.FieldValue.serverTimestamp(),
                userID: user.uid
            })
            document.location.href = 'My_Purchase.html'
        })

      }
      async function renderPost(productId, productName, productType, productImageUrl, productPrice) {
        document.querySelector('.browse').insertAdjacentHTML('beforeend', `  
          <div class="card-wrapper">
            <div class="card post-${productId}">
              <img src="${productImageUrl}">
              <div class="mb-30 text-center font-bold text-2xl"> ${productName} - ${productType} - $${productPrice}</div>
            </div>
          </div>     
          <div class="card-wrapper">   
            <div class="py-36 text-center">
              <button class="addToCartButton rounded-md mt-16 text-white border-2 mt-4 px-4 py-2 rounded bg-black"> Add To Cart</button>
              <button class="wishlistButton rounded-md my-16 text-black border-2 mt-4 px-4 py-2 rounded bg-white-500"> Add To Wishlist</button>
            </div>
          </div>
        `)
        
      }

     
    //   for (let i=0; i<whiskeys.length; i++) {
    //     let productId = whiskeys[i].id
    //     let productData = whiskeys[i].data()
    //     let productName = productData.name
    //     let productType = productData.type
    //     let productImageUrl = productData.imageUrl
    //     let productPrice = productData.price
    //     let docRef = await db.collection('bought').doc(`${productId}-${user.uid}`).get()
    //     let boughtWhiskey = docRef.data()
    //     if (boughtWhiskey) {

            

    // }

    //}
      
  
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
        signInSuccessUrl: 'Merchant_store.html'
      }
  
      // Starts FirebaseUI Auth
      ui.start('.sign-in-or-sign-out', authUIConfig)
    }
  })
  
  