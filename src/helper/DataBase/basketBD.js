import firebase from 'firebase'

export function addProductToBasket(uid, product) {
    firebase.database()
        .ref('basket')
        .child(uid).child('product').push(product)
}

export async function getBasket(uid) {
    return new Promise((resolve, reject) => {
        try {
            let ref = firebase.database().ref('basket')
                ref.child(uid).child('product').on("value", function (snapshot) {
                    let res = snapshot.val()
                    resolve(res)
                })
        } catch (e) {
            console.log("error data")
            reject('error')
        }
    })
}

export function deleteProductFromBasket(basketID, uid) {
    let ref = firebase.database().ref('basket');
    ref.child(uid).child('product').child(basketID).remove()
}

export function ordering(uid,order){
    firebase.database().ref('order').child(uid).push(order)
}
