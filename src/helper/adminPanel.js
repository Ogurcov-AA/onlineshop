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
    return new Promise( (resolve,reject)=>{
     try {
         firebase.storage().ref(path).put(file).then(res=>{
         resolve(getImgUrl(res.ref.fullPath))
         })
     }catch (e) {
         reject("error loading img")
     }
    })
}

export async function updateProduct(product) {
    try {
        let ref = firebase.database().ref('product')
        ref.orderByChild('id').equalTo(product.id).once("value", async function (snapshot) {
            for (let item in snapshot.exportVal())
                snapshot.ref.child(item).update(product)
        })
    } catch (e) {
        console.log(e)
    }
}
