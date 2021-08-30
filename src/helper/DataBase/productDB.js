import firebase from "firebase";

export function getAllProduct(callback) {
    let ref = firebase.database()
        .ref('product')
        ref.on("value", function (snapshot) {
            if (snapshot.val()) {
                let res = []
                for (let item in snapshot.exportVal()) {
                    res.push(snapshot.exportVal()[item])
                }
                callback(res)
            } else{
                console.log('error')
            }
        });
}

export async function getProduct(id) {
    let ref = firebase.database().ref('product');
    return new Promise((resolve, reject) => {
        ref.orderByChild('id').equalTo(id.toString()).on("child_added", async function (snapshot) {
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

export async function getRating(productId, uid,callback) {
    let ref = firebase.database().ref(`rating/${productId}`);
        ref.on("value",  function (snapshot) {
            try {
                if (snapshot.val()) {
                    callback({
                        currRating: snapshot.val()[uid],
                        averageRating: Object.values(snapshot.val()).reduce((a, b) => (a + b)) / Object.values(snapshot.val()).length
                    })
                } else {
                    callback({
                        currRating: 0,
                        averageRating: ''
                    })
                }
            } catch (e) {
                console.log(e)
            }
        })
}

export function updateRating(productId, uid, value) {
    let ref = firebase.database().ref(`rating/${productId}`);
    ref.update({[uid]: value})
}
