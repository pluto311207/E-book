// document.addEventListener("DOMContentLoaded", function() {
//     var urlParams = new URLSearchParams(window.location.search);
//     var slug = urlParams.get("slug");
//     console.log(slug);
//     // fetch("http://localhost:3000/products?slug=" + slug)
//     //     .then(response => {
//     //         if (!response.ok) {
//     //             throw new Error('Network response was not ok');
//     //         }
//     //         return response.json();
//     //     })
//     //     .then(data => {
//     //         if (data.length > 0) {
//     //             var product = data[0];

//     //             document.getElementById("title").innerHTML = product.name;
//     //             document.getElementById("description").innerHTML = product.description;
//     //             document.getElementById("author").innerHTML = product.author;
//     //             // var div = document.createElement("div");
//     //             // div.classList.add("right_top");
//     //             // div.innerHTML = `
//     //             // <div class="box"></div>
//     //             // <img src=${product.image}/>
//     //             // `;
//     //             // right.appendChild(div);
//     //             var conatainer = document.getElementById("right_top");
//     //             var img = document.createElement("img");
//     //             img.src = product.image;
//     //             img.classList.add("right_top_img");
//     //             conatainer.appendChild(img);
//     //             // document.getElementById("image").value = product.image;
//     //         } else {
//     //             console.error("Article not found");
//     //         }
//     //     })
//     //     .catch(error => console.error("Error fetching data:", error));
// });

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

function getProData(data){
    var urlParams = new URLSearchParams(window.location.search);
    var slug = urlParams.get("slug");
    if(data){
        let proData = data.val();
        let proDataArray = Object.keys(proData);
        for(let i = 0; i < proDataArray.length; i++){
            let eachPro = proDataArray[i];
            if(proData[eachPro].slug === `./pages/detail.html?slug=${slug}`)
            {
                // let div = document.createElement('div');
                // div.classList.add("container__content__categories__bottom__postcard__btn");
                // div.innerHTML = `
                // <a class="container__content__categories__bottom__postcard__btn__link" href=${proData[eachPro].slug}>
                // <div class="container__content__categories__bottom__postcard__btn--box"></div>
                // <img class="container__content__categories__bottom__postcard__btn--img" src=${proData[eachPro].image}>
                // <h3 class="container__content__categories__bottom__postcard__btn--heading">${proData[eachPro].name}</h3>
                // <p class="container__content__categories__bottom__postcard__btn--paragraph"><span>By </span><span class="container__content__categories__bottom__postcard__btn--paragraph--bold">${proData[eachPro].author}<span></p></a>
                // <div class="bottom-btn">
                // <button style = "color: #5682ff;" onclick = "edtPro('${eachPro}')">Edit</button>
                // <button style = "color: #fd5151;" onclick = "sdltPro('${eachPro}')">Delete</button>
                // </div>
                // `
                // if(proData[eachPro].category != "Programming" && proData[eachPro].category != "programming")
                // {
                //     container_popular.appendChild(div);
                // }
                // else{
                //     container_programming.appendChild(div);
                // }
                document.getElementById("title").innerHTML = proData[eachPro].name;
                document.getElementById("description").innerHTML = proData[eachPro].description;
                document.getElementById("author").innerHTML = proData[eachPro].author;
                var conatainer = document.getElementById("right_top");
                var img = document.createElement("img");
                img.src = proData[eachPro].image;
                img.classList.add("right_top_img");
                conatainer.appendChild(img);
            }
        }

        
        
    }
    else
    {
        console.log("Data not found!!");
    }
}

proInfo.on("value", getProData);