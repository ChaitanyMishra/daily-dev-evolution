document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.querySelector('.product-grid');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cartCount = document.querySelector('.cart-count')
    let totalPrice = document.querySelector('.total-price')
    const container = document.querySelector('.container')
    const buy = document.querySelector('.buy')
    let currentPage = 1;
    const itemsPerPage = 12;
    let itemPrice  = 0
    let products = [];
    let totalItems = 0;
    
  
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error(`Error! ${response.status}`);
        }
        const data = await response.json();
        products = data.products;
        totalItems = products.length;
        loadItems(currentPage);
      } catch (error) {
        console.log('Fetching failed:', error);
      }
    };

    const loadItems = (page) => {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
  
      const currentItems = products.slice(startIndex, endIndex);
      productGrid.innerHTML = '';
  
      currentItems.forEach((item) => {
        pushItems(item);
      });
  
      updatePaginationButtons();
    };
  
    const pushItems = (item) => {
      const { title, price, thumbnail } = item;
      const newCard = document.createElement('div');
      newCard.className = 'product-card';
      newCard.innerHTML = `
        <img src="${thumbnail}" alt="${title}" class="product-img"  loading="lazy"  />
        <h3 class="product-title">${title}</h3>
        <p class="product-price">₹${price}</p>
        <button class="add-btn">Add to Cart</button>
      `;
      productGrid.appendChild(newCard);
    };
  
    const updatePaginationButtons = () => {
      if (currentPage === 1) {
        prevBtn.disabled = true;
      } else {
        prevBtn.disabled = false;
      }
  
      if (currentPage * itemsPerPage >= totalItems) {
        nextBtn.disabled = true;
      } else {
        nextBtn.disabled = false;
      }
    };
  
    nextBtn.addEventListener('click', () => {
      if ((currentPage * itemsPerPage) < totalItems) {
        currentPage++;
        loadItems(currentPage);
      }
    });

    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        loadItems(currentPage);
      }
    });
    fetchData();
    let cartItems = 0;
    productGrid.addEventListener('click' , (e)=>{
    
      console.log(e)
      if(e.target.classList.contains('add-btn')){
        cartItems+=1;
        cartCount.textContent = cartItems;
        const productCard = e.target.closest('.product-card');
        const priceElement = productCard.querySelector('.product-price')
        const priceText = priceElement.textContent; // e.g., "₹1499"
        const price = parseFloat(priceText.replace('₹', '')); 
        itemPrice += price;
        totalPrice.textContent = `₹${itemPrice}`;
      }
    })
    buy.addEventListener('click', () => {
      if (cartItems === 0) {
        alert('🛒 Your cart is empty. Please add items before buying.');
        return;
      }
    
    })
    

  });
  