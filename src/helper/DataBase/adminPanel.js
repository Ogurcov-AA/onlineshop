import firebase from "firebase";
import {getImgUrl} from "./dataBase";

export async function removeProduct(id) {
    let ref = firebase.database().ref('product')
    return new Promise((resolve, reject) => {
        try {
            ref.orderByChild('id').equalTo(id).once("value", async function (snapshot) {
                for (let item in snapshot.exportVal()) {
                    deleteImage(snapshot.val()[item].imgMin)
                    deleteImage(snapshot.val()[item].imgCart)
                    await snapshot.ref.child(item).remove()
                    resolve()
                }
            })
        } catch (e) {
            reject()
            console.log(e)
        }
    })
}

function deleteImage(path) {
    firebase.storage().ref(path).delete()
}

export async function uploadImg(path, file) {
    return new Promise((resolve, reject) => {
        try {
            firebase.storage().ref(path).put(file).then(res => {
                resolve(getImgUrl(res.ref.fullPath))
            })
        } catch (e) {
            reject("error loading img")
        }
    })
}

export async function updateProduct(product) {
    try {
        console.log(product)
        let ref = firebase.database().ref('product')
        ref.orderByChild('id').equalTo(product.id).once("value", async function (snapshot) {
            for (let item in snapshot.exportVal()) {
                console.log(item)
                snapshot.ref.child(item).update(product)
            }
            })
    } catch (e) {
        console.log(e)
    }
}

export async function getOrder() {
    return new Promise((resolve, reject) => {
        try {
            let ref = firebase.database().ref('order')
            ref.once("value", function (snapshot) {
                resolve(snapshot.val())
            })
        } catch (e) {
            console.log(e)
            reject()
        }
    })
}

export function deleteOrder(orderId, uid) {
    firebase.database().ref(`order/${uid}/${orderId}`).remove()
}

