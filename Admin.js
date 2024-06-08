

    tinymce.init({
    selector: "#editor",
    height: 300,
    menubar: true,
    plugins: [
      "advlist autolink lists link image charmap print preview anchor",
      "searchreplace visualblocks code fullscreen",
      "insertdatetime media table paste code help wordcount",
    ],
    toolbar:
      "undo redo | formatselect | " +
      "bold italic backcolor | alignleft aligncenter " +
      "alignright alignjustify | bullist numlist outdent indent | " +
      "removeformat | help",
    content_style: "body { font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif; font-size: 16px }",
    setup: function (editor) {
      editor.on("change", function () {
      });
    },
  });

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

function createSlug(name) {
    return name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }
function getInputValue(id){
  return document.getElementById(id).value;
}
function addPro(event){
  event.preventDefault();
  let name = getInputValue('pro_name');
  let auth = getInputValue('pro_auth');
  let img = getInputValue('img_link');
  let cate = getInputValue('categories');
  let description = tinymce.get("editor").getContent();
  let slug = createSlug(name);

  let link = `./pages/detail.html?slug=${slug}`;

  console.log(name, auth, img, cate, link, description);
  saveProduct(name, auth, img, cate, link, description);
  document.getElementById('admin_form').reset();
  document.getElementById('pro_name').focus();
}
function saveProduct(name, auth, img, cate, slug, description){
  let newProInfo = proInfo.push();
  newProInfo.set({
    name: name,
    author: auth,
    image: img,
    category: cate,
    slug: slug,
    description: description,
    isDlt: false
  });
  alert("Adding product successfully!!!");
}

document.getElementById('admin_form').addEventListener("submit", addPro)

