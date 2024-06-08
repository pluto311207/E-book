

const firebaseConfig = {
  apiKey: "AIzaSyAgueZSejSaXWmBUJqKCy9o7dYINOr-mSk",
  authDomain: "e-book-688b2.firebaseapp.com",
  databaseURL: "https://e-book-688b2-default-rtdb.firebaseio.com",
  projectId: "e-book-688b2",
  storageBucket: "e-book-688b2.appspot.com",
  messagingSenderId: "65983976082",
  appId: "1:65983976082:web:6512993d5dd15c4fe90c4b"
};
firebase.initializeApp(firebaseConfig)

let proInfo = firebase.database().ref("ProInfo");
let container_popular = document.getElementById('popular_products');
let container_programming = document.getElementById('programming_books');
function getProData(data){
    if(data){
        let proData = data.val();
        let proDataArray = Object.keys(proData);
        container_popular.innerHTML = ""
        container_programming.innerHTML = ""
        for(let i = 0; i < proDataArray.length; i++){
            let eachPro = proDataArray[i];
            if(proData[eachPro].isDlt == false)
            {
                let div = document.createElement('div');
                div.classList.add("container__content__categories__bottom__postcard__btn");
                div.innerHTML = `
                <a class="container__content__categories__bottom__postcard__btn__link" href=${proData[eachPro].slug}>
                <div class="container__content__categories__bottom__postcard__btn--box"></div>
                <img class="container__content__categories__bottom__postcard__btn--img" src=${proData[eachPro].image}>
                <h3 class="container__content__categories__bottom__postcard__btn--heading">${proData[eachPro].name}</h3>
                <p class="container__content__categories__bottom__postcard__btn--paragraph"><span>By </span><span class="container__content__categories__bottom__postcard__btn--paragraph--bold">${proData[eachPro].author}<span></p></a>
                <div class = "js-btn" style = "display: none">
                <button style = "color: #5682ff;" onclick = "edtPro('${eachPro}')">Edit</button>
                <button style = "color: #fd5151;" onclick = "sdltPro('${eachPro}')">Delete</button>
                </div>
                `
                
                if(proData[eachPro].category != "Programming" && proData[eachPro].category != "programming")
                {
                    container_popular.appendChild(div);
                }
                else{
                    container_programming.appendChild(div);
                }
            } 
        }
        localStorage.setItem("PLength", JSON.stringify(proDataArray.length));
        
        
    }
    else
    {
        console.log("Data not found!!");
    }
}
function createSlug(name) {
    return name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
}
function close(){
    document.getElementById('edt').style.display = 'none';
}
function edtPro(id) {
    let proRef = firebase.database().ref("ProInfo/" + id);
    
    proRef.once("value", function(snapshot){
        let product = snapshot.val();
        document.getElementById('newpro_name').value = product.name;
        document.getElementById('newpro_auth').value = product.author;
        document.getElementById('newimg_link').value = product.image;
        document.getElementById('newcategories').value = product.category;
        document.getElementById('edt').style.display = 'block';
    document.getElementById('edtForm').addEventListener('submit', function(event){
        event.preventDefault();
        let newName = document.getElementById('newpro_name').value;
        let newAuth = document.getElementById('newpro_auth').value;
        let newImage = document.getElementById('newimg_link').value;
        let newCate = document.getElementById('newcategories').value;
        let newSlug = createSlug(newName);
        let link = `./pages/detail.html?slug=${newSlug}`;
        console.log(newSlug)
        proRef.update({
            name: newName,
            author: newAuth,
            image: newImage,
            category: newCate,
            slug: link
        })
        document.getElementById('edt').style.display = 'none';
    })
    })
}

function dltPro(id){
    firebase.database().ref("ProInfo/" + id).remove()
}
function sdltPro(id)
{
    let proRef = firebase.database().ref("ProInfo/" + id);
    proRef.once("value", function(snapshot){
        proRef.update({
            isDlt: true
        })
    })
}

proInfo.on("value", getProData);
