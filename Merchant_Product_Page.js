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
      }
  
      async function renderPost(productId, productName, productType, productImageUrl, productPrice) {
        document.querySelector('.products').insertAdjacentHTML('beforeend', `
        <div class="post-${productId} md:mt-16 mt-8 space-y-8">    
        <h2 class="my-8"> 
            <div class="flex ">
            <img class="md:w-1/3 mx-8 " src="${productImageUrl}">
            <div class= "Text-centered justify-around">    
                <div class="mb-30 text-center font-bold text-3xl"> ${productName} - ${productType} - $${productPrice}</div>
                <div class="product-info block "> "Uncle Nearest 1856 is an award-winning blend of 8-14 year old barrels, bottled at 100 proof. Uncle Nearest is astonishingly smooth, and can be enjoyed neat, on the rocks, or in your favorite whiskey or bourbon cocktail.
                    In 2017, Uncle Nearest 1856 Premium Aged Whiskey launched in the United States. Honoring the first African American master distiller, this premium whiskey swiftly rolled out throughout the U.S. and abroad, and can now be found in 50 States, 12 Countries, and shipped to over 148 countries in the world. Uncle Nearest is now the Fastest-Growing Independent American Whiskey Brand in U.S. History.
                    Uncle Nearest Premium Whiskey has garnered more than 125 awards and accolades throughout the world, including “Top 5 Whiskies in the World” by Cigar & Spirits Magazine and “World’s Best” by Whisky Magazine. Uncle Nearest was the most awarded premium American whiskey or bourbon of 2019.." </div>
                <div class="seller-info block mt-16" > "Insert Seller information here - Name, city, state, etc" </div>
                <button class="addToCartButton rounded-md mt-16 text-white border-2 mt-4 px-4 py-2 rounded bg-black"> Add To Cart</button>
                <button class="wishlistButton rounded-md my-16 text-black border-2 mt-4 px-4 py-2 rounded bg-white-500"> Add To Wishlist</button>
            </div>
          </div>
          </h2>  
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
        signInSuccessUrl: 'Product_Browsing.html'
      }
  
      // Starts FirebaseUI Auth
      ui.start('.sign-in-or-sign-out', authUIConfig)
    }
  })
  
  