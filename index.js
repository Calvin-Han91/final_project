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
          <h2> <a class="font-bold text-xl underline" href="Product_Page.html">Buy Products</a></h2>
          <p><img class="rounded-xl w-96" src="https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/iStock-533225488_16x9.jpg?itok=2HUFc6Ct"></p>
        </div>

        <div class="md:p-16 md:w-1/3 space-y-4">
          <h2 class="listing font-bold text-xl underline">List My Products</h2>
          <p><img class="rounded-xl w-96" src="https://i.etsystatic.com/20162739/r/il/6dcdfa/1936621475/il_794xN.1936621475_n2e8.jpg"></p>
        </div>

        <div class="md:p-16 md:w-1/3 space-y-4">
          <h2 class="font-bold text-xl underline">My Purchases</h2>
          <p><img class="rounded-xl w-96" src="https://previews.123rf.com/images/infadel/infadel1504/infadel150400024/38661963-black-shopping-trolley-with-shadow-concept-of-daily-purchases-christmas-sale-and-on-line-ecommerce-i.jpg"></p>
        </div>
          `)

    document.querySelector('.listing').addEventListener('click', async function(event) {
      event.preventDefault()

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
      })
  
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