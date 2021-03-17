let firebase = require('./firebase')

exports.handler = async function(event) {
    let queryStringUserID = event.queryStringParameters.userID

    let whiskeyData = []
    let db = firebase.firestore()
    let querySnapshot = await db.collection('whiskey').where('userID', '==', queryStringUserID).get()
    console.log(`Number of todos: ${querySnapshot.size}`)
  
    let whiskeys = querySnapshot.docs
    for (let i = 0; i < whiskeys.length; i++) {
      let whiskeyID = whiskeys[i].id 
      let whiskey = todos[i].data()
      console.log(whiskey)
  
      todosData.push({
        id: whiskeyID,
        text: whiskey.text
      })
    }

  return {
    statusCode: 200,
    body: JSON.stringify(whiskeyData)
  }
}