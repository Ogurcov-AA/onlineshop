import firebase from 'firebase'

export function addProductToBasket(uid, product) {
    firebase.database()
        .ref('basket')
        .child(uid).child('product').push(product)
}

export function getBasket(uid, callback) {
        try {
            let ref = firebase.database().ref('basket')
                ref.child(uid).child('product').on("value", function (snapshot) {
                    let res = snapshot.val()
                    callback(res)
                })
        } catch (e) {
            console.log("error data")
        }

}

export function deleteProductFromBasket(basketID, uid) {
    let ref = firebase.database().ref('basket');
    ref.child(uid).child('product').child(basketID).remove()
}

export function ordering(uid,order){
    firebase.database().ref('order').child(uid).push(order)
}
