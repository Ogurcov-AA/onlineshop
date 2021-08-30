export function checkProductElement(element){
    checkId(element)
    checkAddedDate(element)
    checkAndAddField('price',element)
    checkAndAddField('count',element)
    checkAndAddField('description',element)
    checkAndAddField('title',element)
    checkImg('imgCart',element)
    checkImg('imgMin',element)
    checkAvailable(element)
    checkCategory(element)

    console.log(element)
    return element

}
function checkAddedDate(element){
    if(Object.keys(element).indexOf('added_date')===-1){
        element.added_date = new Date().toISOString()
    }
}

function checkAndAddField(field, element){
    if(Object.keys(element).indexOf(field)===-1){
        element[field] = 1
    }
}

function checkAvailable(element) {
    if (Object.keys(element).indexOf('available') === -1) {
        element.available = !!element.count
    }
}

function checkCategory(element){
    if (Object.keys(element).indexOf('category') === -1) {
        element.category = {all:true}
    }
}
function checkId(element){
    if (Object.keys(element).indexOf('id') === -1) {
        element.id = (hash((getRandomIntInclusive(99999,1000000)).toString())).toString()
        console.log(element.id)
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function hash(s){
        return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}

function checkImg(field,element){
    if (Object.keys(element).indexOf(field) === -1) {
        element[field] = "https://firebasestorage.googleapis.com/v0/b/onlineshop-9e085.appspot.com/o/no-img.png.056bf2e130881dec0f753ea5d0228c26.png?alt=media&token=87b23096-7fb9-4bf5-9377-cbe0d104021d"
    }
}
