// Product Data
const products = [
    {
        id: 1,
        name: "Midnight Black Pro",
        collection: "classic",
        price: 19.99,
        rating: "⭐⭐⭐⭐⭐",
        emoji: "🖤",
        description: "Sleek and elegant protection"
    },
    {
        id: 2,
        name: "Crystal Clear",
        collection: "premium",
        price: 24.99,
        rating: "⭐⭐⭐⭐⭐",
        emoji: "💎",
        description: "Show off your phone's beauty"
    },
    {
        id: 3,
        name: "Thunder Strike",
        collection: "gaming",
        price: 29.99,
        rating: "⭐⭐⭐⭐⭐",
        emoji: "⚡",
        description: "Built for gamers"
    },
    {
        id: 4,
        name: "Neon Glow",
        collection: "neon",
        price: 21.99,
        rating: "⭐⭐⭐⭐⭐",
        emoji: "🌟",
        description: "Vibrant and eye-catching"
    },
    {
        id: 5,
        name: "Royal Purple",
        collection: "premium",
        price: 26.99,
        rating: "⭐⭐⭐⭐⭐",
        emoji: "👑",
        description: "Luxury meets protection"
    },
    {
        id: 6,
        name: "Ocean Blue",
        collection: "classic",
        price: 19.99,
        rating: "⭐⭐⭐⭐⭐",
        emoji: "🌊",
        description: "Cool and refreshing"
    },
    {
        id: 7,
        name: "Sunset Orange",
        collection: "neon",
        price: 22.99,
        rating: "⭐⭐⭐⭐⭐",
        emoji: "🌅",
        description: "Warm and vibrant"
    },
    {
        id: 8,
        name: "Gaming Beast",
        collection: "gaming",
        price: 31.99,
        rating: "⭐⭐⭐⭐⭐",
        emoji: "🎮",
        description: "Ultimate gaming protection"
    }
];

// Cart Management
let cart = [];

function initializeCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartUI();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    showNotification('Added to cart! 🛒');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

    if (cart.length === 0) {
        cartItems.innerHTML = '<div style="padding: 2rem; text-align: center; color: #999;">Your cart is empty</div>';
        cartTotal.textContent = '$0.00';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.emoji}</div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div style="font-size: 0.9rem; color: #666;">Qty: ${item.quantity}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = '$' + total.toFixed(2);
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

// Cart Icon Click
document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cartIcon');
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        toggleCart();
    });
});

// Product Rendering
function renderProducts(filter = 'all') {
    const productsGrid = document.getElementById('productsGrid');
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.collection === filter);

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">${product.rating}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="btn btn-add-cart" onclick="addToCart(${product.id})">
                    Add to Cart 🛒
                </button>
            </div>
        </div>
    `).join('');
}

// Collection Filter
document.addEventListener('DOMContentLoaded', () => {
    const collectionCards = document.querySelectorAll('.collection-card');
    
    collectionCards.forEach(card => {
        card.addEventListener('click', () => {
            const filter = card.dataset.filter;
            renderProducts(filter);
        });
    });
});

// Newsletter Form
document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            localStorage.setItem('newsletter_email', email);
            showNotification('✨ Welcome to AMC newsletter! Check your email for 15% off!');
            newsletterForm.reset();
        });
    }
});

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #FF006E, #8338EC);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        animation: slideInUp 0.3s ease;
        z-index: 3000;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInUp 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.flexDirection = 'column';
            navLinks.style.background = 'white';
            navLinks.style.padding = '2rem';
            navLinks.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            navLinks.style.zIndex = '999';
        });
    }
});

// Smooth Scroll Behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.product-card, .feature-card, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeCart();
    renderProducts('all');
});
