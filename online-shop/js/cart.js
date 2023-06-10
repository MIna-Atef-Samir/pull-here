class Cart {
  constructor() {
    this.products = [];
    this.cartNum = document.getElementById('cartNum');
    this.Show_Storage = JSON.parse(localStorage.getItem('products'));
  }

  initialize() {
    console.log(this.Show_Storage);
    if (this.Show_Storage) {
      this.products = this.Show_Storage;
      this.cartNum.textContent = this.products.length;
    }
    this.renderTable();
  }

  addto_cart(product) {
  const existingProduct = this.products.find(p => p.name === product.name);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    product.quantity = 1;
    this.products.push(product);
  }

  localStorage.setItem('products', JSON.stringify(this.products));
  console.log(this.products);
  this.renderTable();
}

  

decreaseQuantity(productId) {
  const product = this.products.find(p => p.name === productId);
  if (product) {
    if (product.quantity > 1) {
      product.quantity -= 1;
    } else {
      // Remove the product from the cart if the quantity becomes zero
      const productIndex = this.products.findIndex(p => p.name === productId);
      if (productIndex !== -1) {
        this.products.splice(productIndex, 1);
      }
    }
    localStorage.setItem('products', JSON.stringify(this.products));
    this.renderTable();
  }
}

increaseQuantity(productId) {
  const product = this.products.find(p => p.name === productId);
  console.log(productId);
  if (product) {
    product.quantity += 1;
    localStorage.setItem('products', JSON.stringify(this.products));
    this.renderTable();
  }
}


  deleteItem(id) {
    const productIndex = this.products.findIndex(p => p._id === id);
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      localStorage.setItem('products', JSON.stringify(this.products));
      console.log(this.products);
      this.renderTable();
    }
  }

  renderTable() {
    const Tproducts = document.getElementById('Tproducts');
    if (!Tproducts) {
      return;
    }

    Tproducts.innerHTML = '';
    let subTotal = 0;

    for (let i = 0; i < this.products.length; i++) {
      const product = this.products[i];
      const totalPrice = product.price * product.quantity; // Calculate the total price
      subTotal += totalPrice; // Add the total price to the subtotal

      Tproducts.innerHTML +=
        `<tr>
          <td class="align-middle">
            <img src="${product.image || 'https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-260nw-2086941550.jpg'}" alt="" style="width: 50px" />
            ${product.name == "LG TVs"? "LG TV's" : product.name}
          </td>
          <td class="align-middle">$${product.price}</td>
          <td class="align-middle">
            <div class="input-group quantity mx-auto" style="width: 100px">
              <div class="input-group-btn">
                <button type="button" class="decBtn btn btn-sm btn-primary btn-minus" onclick="cart.decreaseQuantity('${product.name}')"${product.quantity === 1 ? 'disabled' : ''}>
                  <i class="fa fa-minus"></i>
                </button>
              </div>
              <span class="quantityVal form-control form-control-sm bg-secondary border-0 text-center" id="quantity${product._id}">${product.quantity}</span>
              <div class="input-group-btn">
                <button type="button" class="incBtn btn btn-sm btn-primary btn-plus" onclick="cart.increaseQuantity('${product.name}')">
                  <i class="fa fa-plus"></i>
                </button>
              </div>
            </div>
          </td>
          <td class="align-middle">$${totalPrice}</td> 
          <td class="align-middle">
            <button onclick="deleteItem(${product._id})" class="btn btn-sm btn-danger" type="button">
              <i class="fa fa-times"></i>
            </button>
          </td>
        </tr>`;
    }

    const subTotalElement = document.getElementById('subTotal'); // Get the subTotal element by its id
    if (subTotalElement) {
      subTotalElement.textContent = `$${subTotal.toFixed(2)}`; // Display the subtotal with 2 decimal places
    }
    this.cartNum.textContent = this.getCartQuantity();
  }

  getCartQuantity() {
    return this.products.length;
  }
}

class Checkout extends Cart {
  constructor() {
    super();
    this.CheckoutProducts = document.getElementById('CheckoutProducts');
    this.products = this.Show_Storage; // Assign the Show_Storage array directly
  }

  renderCheck() {
    this.C_subTotal = document.getElementById('C_subTotal');
    this.taxValue = document.getElementById('taxValue');
    this.paypal = document.getElementById('paypal');
    this.directcheck = document.getElementById('directcheck');
    this.banktransfer = document.getElementById('banktransfer');
    this.Total_Price = document.getElementById('Total_Price');

    if (!this.C_subTotal || !this.taxValue || !this.paypal || !this.directcheck || !this.banktransfer) {
      return;
    }

    this.C_subTotal.textContent = 0;
    this.CheckoutProducts.innerHTML = '';
    let totalSubs = 0;

    for (let i = 0; i < this.products.length; i++) {
      const product = this.products[i];
      const totalPrice = product.price * product.quantity; // Calculate the total price
      totalSubs += totalPrice;
      this.C_subTotal.textContent = totalSubs.toFixed(2);
      this.CheckoutProducts.innerHTML += `
        <div class="d-flex justify-content-between">
          <p>${product.name} x (${product.quantity})</p>
          <p>$${totalPrice.toFixed(2)}</p>
        </div>
      `;
    }
    
    const Payment_Method = () => {
      if (this.paypal.checked) {
        this.taxValue.textContent = ((parseInt(this.paypal.value) * totalSubs) / 100).toFixed(2);
        this.Total_Price.textContent = totalSubs + +this.taxValue.textContent
        this.renderCheck();
      } else if (this.directcheck.checked) {
        this.taxValue.textContent = ((parseInt(this.directcheck.value) * totalSubs) / 100).toFixed(2);
        this.Total_Price.textContent = totalSubs + +this.taxValue.textContent
        this.renderCheck();
      } else if (this.banktransfer.checked) {
        this.taxValue.textContent = ((parseInt(this.banktransfer.value) * totalSubs) / 100).toFixed(2);
        this.Total_Price.textContent = totalSubs + +this.taxValue.textContent
        this.renderCheck();
      }
    };

    this.paypal.addEventListener('change', () => {
      Payment_Method();
    });

    this.directcheck.addEventListener('change', () => {
      Payment_Method();
    });

    this.banktransfer.addEventListener('change', () => {
      Payment_Method();
    });
  }
}


// Initialize the cart
const cart = new Cart();
document.addEventListener('DOMContentLoaded', () => {
  cart.initialize();
});

// Function to handle the add to cart action
function addSingleProductToCart(product) {
  cart.addto_cart(product);
  cart.cartNum.textContent = cart.getCartQuantity();
}

// Function to delete an item from the cart
function deleteItem(id) {
  cart.deleteItem(id);
}

// Initialize the checkout
const chekit = new Checkout();
chekit.renderCheck();


