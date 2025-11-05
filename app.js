// App State Management (using in-memory variables instead of localStorage)
let appState = {
  isLoggedIn: false,
  currentUser: null,
  currentScreen: 'homeScreen',
  isLoginMode: true,
  chatMessages: [],
  cartItems: [],
  currentView: 'catalog'
};

// Medicine Data
const medicines = [
  { id: 1, name: 'Crocin 500mg', description: 'Pain relief and fever reducer', price: 45, category: 'Pain Relief' },
  { id: 2, name: 'Aspirin 100mg', description: 'Cardiac care tablet', price: 35, category: 'Heart Care' },
  { id: 3, name: 'Vitamin C 1000mg', description: 'Immune system booster', price: 120, category: 'Vitamins' },
  { id: 4, name: 'Paracetamol 650mg', description: 'Fever and headache relief', price: 40, category: 'Pain Relief' },
  { id: 5, name: 'Ibuprofen 200mg', description: 'Anti-inflammatory tablet', price: 55, category: 'Pain Relief' },
  { id: 6, name: 'Amoxicillin 250mg', description: 'Antibiotic for infections', price: 180, category: 'Antibiotics' },
  { id: 7, name: 'Cough Syrup 100ml', description: 'Dry cough relief', price: 95, category: 'Cough Relief' },
  { id: 8, name: 'Multivitamin', description: 'Daily nutrition supplement', price: 250, category: 'Vitamins' }
];

// Video Data
const videos = [
  { id: 1, title: 'Neck Stretches', description: 'Easy neck stretching exercises for flexibility', duration: '2 minutes' },
  { id: 2, title: 'Shoulder Rolls', description: 'Improve shoulder mobility and reduce tension', duration: '3 minutes' },
  { id: 3, title: 'Back Extension', description: 'Strengthen your back muscles safely', duration: '2.5 minutes' }
];

// Constants
const DELIVERY_CHARGE = 50;

// AI Assistant Response Data
const aiResponses = {
  symptom: {
    keywords: ['symptom', 'pain', 'hurt', 'ache', 'sick', 'feel', 'unwell'],
    response: 'Based on your symptom, I recommend consulting a doctor or taking rest. Drink plenty of water and get adequate sleep. If symptoms persist or worsen, please seek medical attention immediately.'
  },
  cold: {
    keywords: ['cold', 'cough', 'fever', 'flu', 'sneeze', 'runny nose'],
    response: 'Stay hydrated, wash hands regularly, maintain hygiene, and get proper sleep. If symptoms persist, see a doctor. You can also try warm fluids and rest in a comfortable environment.'
  },
  diabetes: {
    keywords: ['diabetes', 'blood sugar', 'glucose', 'insulin'],
    response: 'Diabetes is a metabolic disorder affecting blood sugar levels. Please consult a healthcare professional for diagnosis and treatment. Regular monitoring and a healthy lifestyle are important.'
  },
  nutrition: {
    keywords: ['nutrition', 'diet', 'food', 'eat', 'healthy', 'vitamin', 'meal'],
    response: 'Proper nutrition includes a balanced diet with fruits, vegetables, proteins, and whole grains. Consult a nutritionist for personalized advice. Stay hydrated and maintain regular meal times.'
  },
  exercise: {
    keywords: ['exercise', 'workout', 'fitness', 'gym', 'physical', 'activity'],
    response: 'Regular physical activity is essential for good health. Aim for at least 30 minutes of moderate exercise daily. Consult a fitness expert for a personalized workout plan.'
  },
  mental: {
    keywords: ['stress', 'anxiety', 'depression', 'mental', 'mood', 'sleep', 'insomnia'],
    response: 'Mental health is as important as physical health. Practice stress management techniques, get adequate sleep, and don\'t hesitate to seek professional help if needed. Regular exercise and meditation can help.'
  },
  default: 'I\'m an AI health assistant. Please ask health-related questions for better assistance. I can help with symptoms, nutrition, prevention, exercise, and general health queries.'
};

// Initialize App
function initApp() {
  // Start with auth screen
  showScreen('authScreen');
}

// Screen Navigation
function showScreen(screenId) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => {
    screen.classList.remove('active');
  });
  
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.add('active');
  }
}

// Auth Form Toggle with Sliding Animation
function toggleAuthForm(event) {
  event.preventDefault();
  
  const formsContainer = document.getElementById('formsContainer');
  const welcomeTitle = document.getElementById('welcomeTitle');
  const welcomeSubtitle = document.getElementById('welcomeSubtitle');
  
  appState.isLoginMode = !appState.isLoginMode;
  
  if (appState.isLoginMode) {
    // Switch to Login - Remove show-register class to slide login form back
    formsContainer.classList.remove('show-register');
    
    welcomeTitle.textContent = 'Welcome Back!';
    welcomeSubtitle.textContent = 'Sign in to access your digital health services';
  } else {
    // Switch to Register - Add show-register class to slide register form in
    formsContainer.classList.add('show-register');
    
    welcomeTitle.textContent = 'Join Us Today!';
    welcomeSubtitle.textContent = 'Create an account to access all health services';
  }
}

// Handle Login
function handleLogin() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  
  // Validation
  if (!username || !password) {
    alert('⚠️ Please fill in all fields');
    return;
  }
  
  if (username.length < 3) {
    alert('⚠️ Username must be at least 3 characters');
    return;
  }
  
  if (password.length < 4) {
    alert('⚠️ Password must be at least 4 characters');
    return;
  }
  
  // Simulate API call with mock authentication
  // In a real app, this would make a fetch call to http://localhost:8081/api/login
  setTimeout(() => {
    // Mock successful login
    appState.isLoggedIn = true;
    appState.currentUser = {
      username: username,
      email: username + '@healthplatform.com'
    };
    
    // Update profile display
    document.getElementById('profileUsername').textContent = username;
    document.getElementById('profileEmail').textContent = appState.currentUser.email;
    
    // Show success message
    alert('✅ Login successful! Welcome back, ' + username + '!');
    
    // Navigate to app
    showScreen('appScreen');
    navigateToScreen('homeScreen');
    
    // Clear form
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
  }, 500);
}

// Handle Register
function handleRegister() {
  const username = document.getElementById('registerUsername').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  
  // Validation
  if (!username || !email || !password) {
    alert('⚠️ Please fill in all fields');
    return;
  }
  
  if (username.length < 3) {
    alert('⚠️ Username must be at least 3 characters');
    return;
  }
  
  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('⚠️ Please enter a valid email address');
    return;
  }
  
  if (password.length < 6) {
    alert('⚠️ Password must be at least 6 characters');
    return;
  }
  
  // Simulate API call with mock registration
  // In a real app, this would make a fetch call to http://localhost:8081/api/register
  setTimeout(() => {
    // Mock successful registration
    appState.isLoggedIn = true;
    appState.currentUser = {
      username: username,
      email: email
    };
    
    // Update profile display
    document.getElementById('profileUsername').textContent = username;
    document.getElementById('profileEmail').textContent = email;
    
    // Show success message
    alert('🎉 Registration successful! Welcome, ' + username + '!');
    
    // Navigate to app
    showScreen('appScreen');
    navigateToScreen('homeScreen');
    
    // Clear form
    document.getElementById('registerUsername').value = '';
    document.getElementById('registerEmail').value = '';
    document.getElementById('registerPassword').value = '';
  }, 500);
}

// Handle Logout - IMMEDIATE AND SYNCHRONOUS
function handleLogout() {
  // Show logging out alert
  alert('🔄 Logging out...');
  
  // Clear all app state IMMEDIATELY
  appState.isLoggedIn = false;
  appState.currentUser = null;
  appState.currentScreen = 'homeScreen';
  appState.chatMessages = [];
  appState.cartItems = [];
  
  // Clear cart count
  updateCartCount();
  
  // Clear chat messages from UI
  const chatMessages = document.getElementById('chatMessages');
  if (chatMessages) {
    chatMessages.innerHTML = '<div class="chat-message ai-message"><div class="message-content">Hello! I\'m your AI health assistant. How can I help you today? I can answer questions about symptoms, nutrition, prevention, and general health.</div></div>';
  }
  
  // Clear chat input
  const chatInput = document.getElementById('chatInput');
  if (chatInput) {
    chatInput.value = '';
  }
  
  // Reset profile display
  document.getElementById('profileUsername').textContent = 'User';
  document.getElementById('profileEmail').textContent = 'user@example.com';
  
  // Navigate back to auth screen IMMEDIATELY
  showScreen('authScreen');
  
  // Reset to login form with proper animation state
  const formsContainer = document.getElementById('formsContainer');
  formsContainer.classList.remove('show-register');
  appState.isLoginMode = true;
  
  // Reset welcome text
  document.getElementById('welcomeTitle').textContent = 'Welcome Back!';
  document.getElementById('welcomeSubtitle').textContent = 'Sign in to access your digital health services';
  
  // Clear any form inputs
  document.getElementById('loginUsername').value = '';
  document.getElementById('loginPassword').value = '';
  document.getElementById('registerUsername').value = '';
  document.getElementById('registerEmail').value = '';
  document.getElementById('registerPassword').value = '';
  
  // Show success message after navigation
  setTimeout(() => {
    alert('✅ Logged out successfully!');
  }, 100);
}

// Navigate to Content Screen
function navigateToScreen(screenId) {
  // Hide all content screens
  const contentScreens = document.querySelectorAll('.content-screen');
  contentScreens.forEach(screen => {
    screen.classList.remove('active');
  });
  
  // Show target screen
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.add('active');
    appState.currentScreen = screenId;
  }
  
  // Special handling for E-Pharmacy screen
  if (screenId === 'epharmacyScreen') {
    showCatalog();
    loadMedicines();
    updateCartCount();
  }
  
  // Update bottom navigation
  updateBottomNav(screenId);
}

// Update Bottom Navigation Active State
function updateBottomNav(screenId) {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('data-screen') === screenId) {
      item.classList.add('active');
    }
  });
}

// Handle Enter key press in forms
function setupKeyboardListeners() {
  // Login form
  document.getElementById('loginUsername').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('loginPassword').focus();
    }
  });
  
  document.getElementById('loginPassword').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  });
  
  // Register form
  document.getElementById('registerUsername').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('registerEmail').focus();
    }
  });
  
  document.getElementById('registerEmail').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('registerPassword').focus();
    }
  });
  
  document.getElementById('registerPassword').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  });
}

// AI Chat Functions
function sendMessage() {
  const chatInput = document.getElementById('chatInput');
  const message = chatInput.value.trim();
  
  if (!message) {
    return;
  }
  
  // Add user message to chat
  addMessageToChat(message, 'user');
  
  // Clear input
  chatInput.value = '';
  
  // Generate AI response
  setTimeout(() => {
    const aiResponse = generateAIResponse(message);
    addMessageToChat(aiResponse, 'ai');
  }, 500);
}

function addMessageToChat(message, sender) {
  const chatMessages = document.getElementById('chatMessages');
  
  // Create message element
  const messageDiv = document.createElement('div');
  messageDiv.className = sender === 'user' ? 'chat-message user-message' : 'chat-message ai-message';
  
  const messageContent = document.createElement('div');
  messageContent.className = 'message-content';
  messageContent.textContent = message;
  
  messageDiv.appendChild(messageContent);
  chatMessages.appendChild(messageDiv);
  
  // Store in app state
  appState.chatMessages.push({ message, sender, timestamp: new Date() });
  
  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAIResponse(userMessage) {
  const messageLower = userMessage.toLowerCase();
  
  // Check each category for keyword matches
  for (const [category, data] of Object.entries(aiResponses)) {
    if (category === 'default') continue;
    
    for (const keyword of data.keywords) {
      if (messageLower.includes(keyword)) {
        return data.response;
      }
    }
  }
  
  // Return default response if no match found
  return aiResponses.default;
}

function clearChat() {
  const confirmClear = confirm('Are you sure you want to clear the chat history?');
  
  if (confirmClear) {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';
    
    // Reset chat with welcome message
    addMessageToChat('Hello! I\'m your AI health assistant. How can I help you today? I can answer questions about symptoms, nutrition, prevention, and general health.', 'ai');
    
    // Clear app state
    appState.chatMessages = [];
  }
}

// Setup chat keyboard listener
function setupChatKeyboardListener() {
  const chatInput = document.getElementById('chatInput');
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
}

// E-Pharmacy Functions
function loadMedicines() {
  const medicinesGrid = document.getElementById('medicinesGrid');
  if (!medicinesGrid) return;
  
  medicinesGrid.innerHTML = '';
  
  medicines.forEach(medicine => {
    const medicineCard = document.createElement('div');
    medicineCard.className = 'medicine-item';
    medicineCard.innerHTML = `
      <span class="medicine-category">${medicine.category}</span>
      <h3>${medicine.name}</h3>
      <p class="medicine-description">${medicine.description}</p>
      <div class="medicine-price">₹${medicine.price}</div>
      <button class="btn btn-primary" onclick="addToCart(${medicine.id})">Add to Cart</button>
    `;
    medicinesGrid.appendChild(medicineCard);
  });
}

function addToCart(medicineId) {
  const medicine = medicines.find(m => m.id === medicineId);
  if (!medicine) return;
  
  const existingItem = appState.cartItems.find(item => item.id === medicineId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    appState.cartItems.push({
      ...medicine,
      quantity: 1
    });
  }
  
  updateCartCount();
  alert('✅ ' + medicine.name + ' added to cart!');
}

function updateCartCount() {
  const cartCount = document.getElementById('cartCount');
  if (cartCount) {
    const totalItems = appState.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
}

function showCart() {
  document.getElementById('catalogView').style.display = 'none';
  document.getElementById('cartView').style.display = 'block';
  document.getElementById('checkoutView').style.display = 'none';
  document.getElementById('orderSuccessView').style.display = 'none';
  
  renderCart();
}

function showCatalog() {
  document.getElementById('catalogView').style.display = 'block';
  document.getElementById('cartView').style.display = 'none';
  document.getElementById('checkoutView').style.display = 'none';
  document.getElementById('orderSuccessView').style.display = 'none';
}

function renderCart() {
  const cartItemsContainer = document.getElementById('cartItems');
  const cartEmpty = document.getElementById('cartEmpty');
  const cartSummary = document.getElementById('cartSummary');
  
  if (appState.cartItems.length === 0) {
    cartItemsContainer.innerHTML = '';
    cartEmpty.style.display = 'block';
    cartSummary.style.display = 'none';
    return;
  }
  
  cartEmpty.style.display = 'none';
  cartSummary.style.display = 'block';
  
  cartItemsContainer.innerHTML = '';
  
  appState.cartItems.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p class="cart-item-price">₹${item.price} each</p>
      </div>
      <div class="cart-item-controls">
        <div class="quantity-controls">
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
          <span class="quantity-display">${item.quantity}</span>
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
        </div>
        <div class="cart-item-total">₹${item.price * item.quantity}</div>
        <button class="remove-item-btn" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });
  
  const subtotal = calculateSubtotal();
  document.getElementById('cartSubtotal').textContent = '₹' + subtotal;
}

function updateQuantity(medicineId, change) {
  const item = appState.cartItems.find(item => item.id === medicineId);
  if (!item) return;
  
  item.quantity += change;
  
  if (item.quantity <= 0) {
    removeFromCart(medicineId);
  } else {
    updateCartCount();
    renderCart();
  }
}

function removeFromCart(medicineId) {
  appState.cartItems = appState.cartItems.filter(item => item.id !== medicineId);
  updateCartCount();
  renderCart();
}

function calculateSubtotal() {
  return appState.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function showCheckout() {
  if (appState.cartItems.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  document.getElementById('catalogView').style.display = 'none';
  document.getElementById('cartView').style.display = 'none';
  document.getElementById('checkoutView').style.display = 'block';
  document.getElementById('orderSuccessView').style.display = 'none';
  
  renderCheckout();
}

function renderCheckout() {
  const checkoutItems = document.getElementById('checkoutItems');
  checkoutItems.innerHTML = '';
  
  appState.cartItems.forEach(item => {
    const checkoutItem = document.createElement('div');
    checkoutItem.className = 'checkout-item';
    checkoutItem.innerHTML = `
      <div>
        <div class="checkout-item-name">${item.name}</div>
        <div class="checkout-item-qty">Quantity: ${item.quantity}</div>
      </div>
      <div class="checkout-item-price">₹${item.price * item.quantity}</div>
    `;
    checkoutItems.appendChild(checkoutItem);
  });
  
  const subtotal = calculateSubtotal();
  const total = subtotal + DELIVERY_CHARGE;
  
  document.getElementById('checkoutSubtotal').textContent = '₹' + subtotal;
  document.getElementById('checkoutDelivery').textContent = '₹' + DELIVERY_CHARGE;
  document.getElementById('checkoutTotal').textContent = '₹' + total;
}

function placeOrder() {
  const name = document.getElementById('deliveryName').value.trim();
  const phone = document.getElementById('deliveryPhone').value.trim();
  const address = document.getElementById('deliveryAddress').value.trim();
  const city = document.getElementById('deliveryCity').value.trim();
  const pincode = document.getElementById('deliveryPincode').value.trim();
  
  if (!name || !phone || !address || !city || !pincode) {
    alert('⚠️ Please fill in all delivery details');
    return;
  }
  
  if (phone.length !== 10 || !/^\d+$/.test(phone)) {
    alert('⚠️ Please enter a valid 10-digit phone number');
    return;
  }
  
  if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
    alert('⚠️ Please enter a valid 6-digit pincode');
    return;
  }
  
  const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
  
  // Generate order ID
  const orderId = 'ORD' + Date.now();
  
  // Show success screen
  document.getElementById('catalogView').style.display = 'none';
  document.getElementById('cartView').style.display = 'none';
  document.getElementById('checkoutView').style.display = 'none';
  document.getElementById('orderSuccessView').style.display = 'block';
  
  document.getElementById('orderIdDisplay').textContent = orderId;
  
  // Clear cart
  appState.cartItems = [];
  updateCartCount();
  
  // Clear form
  document.getElementById('deliveryName').value = '';
  document.getElementById('deliveryPhone').value = '';
  document.getElementById('deliveryAddress').value = '';
  document.getElementById('deliveryCity').value = '';
  document.getElementById('deliveryPincode').value = '';
}

function returnToCatalog() {
  showCatalog();
}

// Video Functions
function playVideo(videoId) {
  const video = videos.find(v => v.id === videoId);
  if (!video) return;
  
  const modal = document.getElementById('videoModal');
  const title = document.getElementById('videoModalTitle');
  const playingText = document.getElementById('videoPlayingText');
  
  title.textContent = video.title;
  playingText.textContent = 'Playing: ' + video.title + ' (' + video.duration + ')';
  
  modal.classList.add('active');
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  modal.classList.remove('active');
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initApp();
  setupKeyboardListeners();
  setupChatKeyboardListener();
  loadMedicines();
});