import data from "../../data.json" assert { type: "json" };
// import addProductModal from "../../modals/addProductModal";
// const data2 = addProductModal.find();

// console.log(data2);
let imgId = 1;
// window.scroll(function () {
//   var sc = $(window).scrollTop();
//   if (sc > 150) {
//     $("#main-navbar").addClass("navbar-scroll");
//   } else {
//     $("#main-navbar").removeClass("navbar-scroll");
//   }
// });

console.log(data);

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", () => {
  //Links
  navLinks.classList.toggle("open");
  links.forEach((link) => {
    link.classList.toggle("fade");
  });

  //Animation
  hamburger.classList.toggle("toggle");
});

// Modal
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
const displayModal = (id) => {
  console.log("Product Card id: " + id);
  let product = data.products.find((p) => p.id === id);

  const imgShowcase = document.getElementsByClassName("img-showcase")[0];
  imgShowcase.innerHTML = "";
  const imgSelect = document.getElementsByClassName("img-select")[0];
  imgSelect.innerHTML = "";

  const prodTitle = document.getElementsByClassName("product-title")[0];
  prodTitle.innerText = "";
  const productDesc = document.getElementsByClassName("product-desc")[0];
  productDesc.innerText = "";
  const prodCategory = document.getElementsByClassName("product-rating")[0];
  prodCategory.innerText = "";
  const exWorkPrice = document.getElementsByClassName("exwork-price")[0];
  exWorkPrice.innerHTML = "";
  const fobPrice = document.getElementsByClassName("fob-price")[0];
  fobPrice.innerHTML = "";
  const specNode = document.getElementsByClassName("specs")[0];
  console.log(specNode);
  const specs = document.createElement("ul");
  specs.classList.add("specs");
  for (var i = 0; i < product.img.length; i++) {
    const img = document.createElement("img");
    img.src = "images/" + id + "/" + product.img[i];
    imgShowcase.appendChild(img);
    const imgItem = document.createElement("div");
    imgItem.classList.add("img-item");
    const imgLink = document.createElement("a");
    imgLink.dataset.id = i;
    imgLink.href = "#";
    imgLink.appendChild(img.cloneNode(true));
    imgItem.appendChild(imgLink);
    imgSelect.appendChild(imgItem);
  }

  const imgs = document.querySelectorAll(".img-select a");
  const imgBtns = [...imgs];

  imgBtns.forEach((imgItem) => {
    imgItem.addEventListener("click", (event) => {
      event.preventDefault();
      imgId = imgItem.dataset.id;
      slideImage();
    });
  });

  console.log(product);
  prodTitle.innerText = product.title;
  productDesc.innerText = product.description;
  prodCategory.innerText = product.category;
  exWorkPrice.innerHTML =
    "ExWork Price: <span>₹" + product.price.exwork + " / piece </span>";
  fobPrice.innerHTML =
    "FoB Price: <span>₹" +
    product.price.fob +
    " / piece </span> (at MOQ of " +
    product.moq +
    ")";

  const specifications = product.specifications;
  Object.keys(specifications).forEach((key) => {
    switch (key) {
      case "color":
        const colorItem = document.createElement("li");
        colorItem.innerHTML =
          key.toUpperCase() + ": <span>" + specifications[key] + "</span>";
        specs.appendChild(colorItem);
        break;

      case "dimensions":
        const dimItem = document.createElement("li");
        const finalDim = specifications[key].height
          ? specifications[key].length +
          "x" +
          specifications[key].bredth +
          "x" +
          specifications[key].height
          : specifications[key].length + "x" + specifications[key].bredth;

        dimItem.innerHTML =
          key.toUpperCase() + ": <span>" + finalDim + "</span>";
        specs.appendChild(dimItem);
        break;

      case "features":
        const featureItem = document.createElement("li");
        featureItem.innerHTML =
          key.toUpperCase() +
          ": <span>" +
          specifications[key].toString() +
          "</span>";
        specs.appendChild(featureItem);
        break;

      default:
        break;
    }
  });

  specNode.replaceWith(specs);

  modal.style.display = "block";
};
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  document.querySelector(".img-showcase").style.transform = "none";
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    document.querySelector(".img-showcase").style.transform = "none";
    modal.style.display = "none";
  }
};

const productList = document.getElementById("products");

for (let i = 0; i < data.products.length; i++) {
  const product = data.products[i];
  const productLI = document.createElement("li");
  productLI.classList.add("product-item");
  const productCard = document.createElement("div");
  productCard.classList.add("product-card");
  productCard.id = i + 1;
  productCard.addEventListener("click", (e) => {
    displayModal(e.currentTarget.id);
  });

  const productThumb = document.createElement("div");
  productThumb.classList.add("product-thumb");

  const productImg = document.createElement("img");
  productImg.src = "images/" + parseInt(i + 1) + "/" + product.img[0];
  productThumb.appendChild(productImg);

  const productDetail = document.createElement("div");
  productDetail.classList.add("product-details");
  const category = document.createElement("span");
  category.classList.add("product-category");
  category.innerText = data.products[i].category;
  productDetail.appendChild(category);
  // const productTitle = document.createElement("a");
  // productTitle.href = "product.html";
  // productTitle.innerText = data.products[i].title;
  const titleHeading = document.createElement("h4");
  titleHeading.innerText = data.products[i].title;
  productDetail.appendChild(titleHeading);
  const productDim = document.createElement("p");
  const dimensions = data.products[i].specifications.dimensions;
  productDim.innerText = dimensions.height
    ? "Dimensions: " +
    dimensions.length +
    "x" +
    dimensions.bredth +
    "x" +
    dimensions.height
    : "Dimensions: " + dimensions.length + "x" + dimensions.bredth;
  productDetail.appendChild(productDim);
  const productBottom = document.createElement("div");
  productBottom.classList.add("product-bottom-details");
  const productPrice = document.createElement("div");
  productPrice.classList.add("product-price");
  productPrice.innerText = "₹" + data.products[i].price.exwork + " / piece";
  productBottom.appendChild(productPrice);
  productDetail.appendChild(productBottom);

  productCard.appendChild(productThumb);
  productCard.appendChild(productDetail);

  productLI.appendChild(productCard);

  productList.appendChild(productLI);
}

function slideImage() {
  const displayWidth = document.querySelector(
    ".img-showcase img:first-child"
  ).clientWidth;

  document.querySelector(".img-showcase").style.transform = `translateX(${-imgId * displayWidth
    }px)`;
}

window.addEventListener("resize", slideImage);

function removeIfExists(selector) {
  var x = document.querySelector(selector);
  console.log(x);
  if (x) x.remove();
}
// var submit = document.querySelector('.submit');
// submit.addEventListener('click', () => {
//   window.alert("Enquiry Submitted");
// })

function submitForm() {
  setTimeout(alertfunc, 5000);
  return;
}
function alertfunc() {
  window.alert("Enquiry Sent");
}
// submitForm();