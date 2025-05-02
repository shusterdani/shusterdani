"use strict";

let productsList = [];

const nameBox = document.getElementById("nameBox");
const priceBox = document.getElementById("priceBox");
const categorySelect = document.getElementById("categorySelect");
const urlBox = document.getElementById("urlBox");
const tbodyContainer = document.getElementById("tbodyContainer");


//Load data from local storage:
function loadProducts() {
    loadProduct();
    displayProduct();
    totalProductsFunction();
    totalPriceFunction();
    priceAvgFunction();

}

// Main Function to save Data and display date:
function addProduct() {
    pushProduct();
    saveProduct();
    displayProduct();
    totalProductsFunction();
    totalPriceFunction();
    priceAvgFunction();
}



function pushProduct() {
    const productName = nameBox.value;
    const productPrice = priceBox.value;
    const productCategory = categorySelect.value;
    const productUrl = urlBox.value;
    
    let product = { productName, productPrice, productCategory, productUrl};
    const isValid = isValidProduct();
    if(!isValid)
        return;
    productsList.push(product);
    clearForm();
}



function clearForm() {
    nameBox.value = "";
    priceBox.value = "";
    categorySelect.value = "";
    urlBox.value = "";

    nameBox.focus();
}

function displayProduct() {
    let content = "";
    for(let i = 0; i < productsList.length; i++) {
        let price = +productsList[i].productPrice;
        let decimalPrice = price.toFixed(2)
        const tr = `
        <tr>
            <td>${productsList[i].productName}</td>
            <td>$${decimalPrice}</td>
            <td>${productsList[i].productCategory}</td>
            <td><img src="${productsList[i].productUrl}"></td>
            <td><button onclick="deleteMe(${i})" class="delete-btn">X</button></td>
        </tr>
        `
        content += tr;
    }
    tbodyContainer.innerHTML = content;
}

function deleteMe(index) {
    productsList.splice(index, 1);
    displayProduct();
    saveProduct();
    totalProductsFunction();
    totalPriceFunction();
    priceAvgFunction();
}



// Save and Load to Local Storage:
function saveProduct() {
    const saveProducts = JSON.stringify(productsList);
    localStorage.setItem("products", saveProducts);
}
function loadProduct() {
    const getProducts = localStorage.getItem("products");
    if(getProducts)
       productsList = JSON.parse(getProducts);
}



// Product Input Validation:
function isValidProduct() {
    const productName = nameBox.value;
    const productPrice = priceBox.value;
    const productCategory = categorySelect.value;
    const productUrl = urlBox.value;
    if(!productName){
        alert("Missing Product Name");
        return false;
    }
    if(!productPrice){
        alert("Missing Product Price");
        return false;
    }
    if(productPrice > 1000){
        alert("Product Price is too High!");
        return false;
    }
    if(productPrice < 0){
        alert("Product Price can't be less than 0!");
        return false;
    }
    if(!productCategory){
        alert("Missing Product Category");
        return false;
    }
    if(!productUrl){
        alert("Missing Product Url");
        return false;
    }
    return true;
}



// More meta data about the products:
function totalProductsFunction() {
    const totalProducts = document.getElementById("totalProducts");
    totalProducts.innerHTML = productsList.length;
}

function totalPriceFunction() {
    const totalPrice = document.getElementById("totalPrice");
    let price = 0;
    for(const product in productsList) {
            price += +productsList[product].productPrice;
    }
    totalPrice.innerHTML = price;
}

function priceAvgFunction() {
    const totalAverage = document.getElementById("totalAverage");
    let priceAvg = 0;
    let price = 0;
    for(const product in productsList){
        price += +productsList[product].productPrice;
    }
    priceAvg = price / productsList.length;
    totalAverage.innerHTML = productsList.length === 0 ? "0" : priceAvg.toFixed(2);
}












