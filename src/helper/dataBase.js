import firebase from "firebase";

export async function getAllProduct(per_page = 10, page) {
    let ref = firebase.database().ref('product').orderByKey().limitToFirst(per_page * page);
    return new Promise((resolve, reject) => {
        ref.on("value", function (snapshot) {
            if (snapshot.val()) {
                resolve(snapshot.val().map(item => {
                    getImgUrl(item.imgMin).then(res => item.imgMin = res)
                    getImgUrl(item.imgCart).then(res => item.imgCart = res)
                    return item
                }))
            }
            reject('Error loading data')
        });
    })
}

export async function getImgUrl(path) {
    const storageRef = firebase.storage().ref(path);
    let res = await storageRef.getDownloadURL()
    return res
}
