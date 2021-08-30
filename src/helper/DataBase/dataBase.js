import firebase from "firebase";
export {addProductToBasket,getBasket,deleteProductFromBasket,ordering} from './basketBD';
export {getProduct,getAllProduct,getRating,updateRating} from './productDB'
export {removeProduct, updateProduct, uploadImg,getOrder,deleteOrder} from './adminPanel'

export async function getImgUrl(path) {
    const storageRef = firebase.storage().ref(path);
    let res = await storageRef.getDownloadURL()
    return res
}

export function getCategory(){
    let ref = firebase.database().ref('category');
    return new Promise((resolve, reject) => {
        ref.on("value", function (snapshot) {
            try {
                let res = snapshot.val()
                resolve(res)
            } catch (e) {
                console.log(e)
                reject('error')
            }
        })
    })
}


