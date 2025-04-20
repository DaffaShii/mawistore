// Sample product data
const products = [
    {
        id: 1,
        name: "Figure Anime Character A",
        price: 250000,
        image: "images/products/product1.jpg",
        description: "Figure karakter anime populer dengan kualitas tinggi."
    },
    {
        id: 2,
        name: "Poster Anime Limited Edition",
        price: 75000,
        image: "images/products/product2.jpg",
        description: "Poster edisi terbatas dengan desain eksklusif."
    },
    {
        id: 3,
        name: "T-Shirt Anime Design",
        price: 120000,
        image: "images/products/product3.jpg",
        description: "Kaos dengan desain anime keren dan nyaman dipakai."
    },
    {
        id: 4,
        name: "Keychain Anime Collection",
        price: 45000,
        image: "images/products/product4.jpg",
        description: "Koleksi gantungan kunci karakter anime favorit."
    },
    {
        id: 5,
        name: "Mug Anime Art",
        price: 80000,
        image: "images/products/product5.jpg",
        description: "Gelas dengan desain anime eksklusif."
    },
    {
        id: 6,
        name: "Hoodie Anime Style",
        price: 180000,
        image: "images/products/product6.jpg",
        description: "Hoodie dengan desain anime yang stylish."
    }
];

// Cart functionality
let cart = [];

// DOM Elements
const productGrid = document.querySelector('.product-grid');
const cartCount = document.querySelector('.cart-count');
const header = document.querySelector('.animated-header');

// Display products
function displayProducts() {
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">Rp ${product.price.toLocaleString('id-ID')}</div>
                <button class="add-to-cart" data-id="${product.id}">Tambah ke Keranjang</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });

    // Add event listeners to all add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add to cart function
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    
    // Show animation/feedback
    e.target.textContent = 'Ditambahkan!';
    e.target.style.backgroundColor = 'var(--success-color)';
    
    setTimeout(() => {
        e.target.textContent = 'Tambah ke Keranjang';
        e.target.style.backgroundColor = 'var(--primary-color)';
    }, 1000);
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Terima kasih! Pesan Anda telah terkirim.');
        this.reset();
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    
    // Add animation to elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.product-card, .about-content, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.product-card, .about-content, .contact-form').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});