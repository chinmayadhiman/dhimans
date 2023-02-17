import data from "./data.json" assert { type: "json" };
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

// Modal
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
const displayModal = (id) => {
  console.log("Product Card id: " + id);
  const modalCont = document.getElementsByClassName("modal-content")[0];
  // modalCont.innerText = "Product selected has id: " + id;
  const imgShowcase = document.getElementsByClassName("img-showcase")[0];
  imgShowcase.innerHTML = "";
  const imgSelect = document.getElementsByClassName("img-select")[0];
  imgSelect.innerHTML = "";
  //<div class="img-item">
  //  <a href="#" data-id="1">
  //    <img src="images/tree.jpg" alt="shoe image" />
  //  </a>
  //</div>
  for (var i = 1; i < 4; i++) {
    const img = document.createElement("img");
    img.src = "images/" + id + "/" + "DSC" + i + ".jpg";
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
  productImg.src = data.products[i].img + "/DSC" + 1 + ".jpg";
  productThumb.appendChild(productImg);

  const productDetail = document.createElement("div");
  productDetail.classList.add("product-details");
  const category = document.createElement("span");
  category.classList.add("product-category");
  category.innerText = data.products[i].category;
  productDetail.appendChild(category);
  const productTitle = document.createElement("a");
  productTitle.href = "product.html";
  productTitle.innerText = data.products[i].title;
  const titleHeading = document.createElement("h4");
  titleHeading.appendChild(productTitle);
  productDetail.appendChild(titleHeading);
  const productDesc = document.createElement("p");
  productDesc.innerText = data.products[i].description;
  productDetail.appendChild(productDesc);
  const productBottom = document.createElement("div");
  productBottom.classList.add("product-bottom-details");
  const productPrice = document.createElement("div");
  productPrice.classList.add("product-price");
  productPrice.innerText = "₹" + data.products[i].price;
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

  document.querySelector(".img-showcase").style.transform = `translateX(${
    -(imgId - 1) * displayWidth
  }px)`;
}

window.addEventListener("resize", slideImage);
