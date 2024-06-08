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

let container = document.getElementById("container");

function getProData(data){
    if(data){
        let proData = data.val();
        let proDataArray = Object.keys(proData);
        container.innerHTML = ""
        console.log(proData);
        for(let i = 0; i < proDataArray.length; i++){
            let eachPro = proDataArray[i];
            if(proData[eachPro].isDlt == true)
            {
                let div = document.createElement('div');
                div.classList.add("container__content__categories__bottom__postcard__btn");
                div.innerHTML = `
                <a class="container__content__categories__bottom__postcard__btn__link" href=${proData[eachPro].slug}>
                <div class="container__content__categories__bottom__postcard__btn--box"></div>
                <img class="container__content__categories__bottom__postcard__btn--img" src=${proData[eachPro].image}>
                <h3 class="container__content__categories__bottom__postcard__btn--heading">${proData[eachPro].name}</h3>
                <p class="container__content__categories__bottom__postcard__btn--paragraph"><span>By </span><span class="container__content__categories__bottom__postcard__btn--paragraph--bold">${proData[eachPro].author}<span></p></a>
                <div class="bottom-btn">
                <button style = "color: #f3b5d3;" onclick="restore('${eachPro}')">Restore</button>
                <button style = "color: #ff6262;" onclick = "dltPro('${eachPro}')">Delete</button>
                </div>
                `
                container.appendChild(div);
            }
        } 
    }
    else
    {
        console.log("Data not found!!");
    }
}
function dltPro(id){
    firebase.database().ref("ProInfo/" + id).remove()
}

function restore(id){
    let proRef = firebase.database().ref("ProInfo/" + id);
    proRef.once("value", function(snapshot){
        proRef.update({
            isDlt: false
        })
    })
}

proInfo.on("value", getProData);