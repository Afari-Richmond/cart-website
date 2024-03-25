//declaring all variables to be used

const cartBtn = document.querySelector('.cart-btn');
const CloseCartBtn = document.querySelector('.close-cart');
const ClearCartBtn = document.querySelector('clear-cart');
const cartDOM = document.querySelector('cart');
const cartOverlay = document.querySelector('cart-overlay');
const cartItems = document.querySelector('cart-items');
const cartTotal = document.querySelector('cart-total');
const cartContent = document.querySelector('cart-content');
const productsDOM = document.querySelector('.products-center');



//cart

let cart = [];

//products
class Products {
    async getProducts(){

        try {

            //fetch info from local/online source and store in results
            let results = await fetch("products.json")
            //store the json format in the data variable
            let data = await results.json()
            
            //store the item array found in the json format in products
            let products = data.items;

            //for each of the elements in the array, use the map method to get the title, price,id and image
            products = products.map(item =>{
                const {title,price} = item.fields;
                const {id} = item.sys;
                const { url: image } = item.fields.image.fields.file;




                //return the extracted data into an object
                return {title,price,id,image}
            })
            return products
        } catch (error) {
            console.log(error);
        }
           
        }
}

//display products

class UI {
    displayProducts(products){
        console.log(products);
        let result = ""
        products.forEach(products => {
            result += `
            <article class="product">
                <div class="img-container">
                    <img src=${products.image} alt="" class="product-img">
                    <button class="bag-btn" data-id=${products.id}><i class="fas fas-shopping-cart"></i>
                    add to bag</button>
                </div>
                <h3>${products.title}</h3>
                <h4>$${products.price}</h4>
            </article>
            
            `;
        });
        productsDOM.innerHTML = result;
            }
   

}

//local storage 

class storage {
 

}


//when the page loads
document.addEventListener("DOMContentLoaded", ()=>{
//create an instance of products and Display products calss
const products = new Products();
const display = new UI();

products.getProducts().then(products => display.displayProducts(products) );

});