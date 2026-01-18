const phone = '27634337174';

// Restaurant data
const restaurants = {
  'she-ate': {
    name: 'She Ate',
    color: '#FF69B4', // pink
    logo: 'images/She ate logo 2 high res.png',
    menu: [
      { name: 'Margherita Pizza', price: 'R120', image: 'images/akhni.png' },
      { name: 'Pasta Carbonara', price: 'R110', image: 'images/Salomi.png' },
      { name: 'Caesar Salad', price: 'R80', image: 'images/akhni & Salomi.png' }
    ]
  },
  'oumas': {
    name: 'Ouma\'s',
    color: '#8B4513', // brown
    menu: [
      { name: 'Bobotie', price: 'R95', image: 'images/akhni.png' },
      { name: 'Koeksisters', price: 'R50', image: 'images/Salomi.png' },
      { name: 'Malva Pudding', price: 'R65', image: 'images/akhni & Salomi.png' }
    ]
  },
  'nibbly-bits': {
    name: 'Nibbly Bits',
    color: '#32CD32', // lime green
    menu: [
      { name: 'Loaded Fries', price: 'R75', image: 'images/akhni.png' },
      { name: 'Chicken Wings', price: 'R90', image: 'images/Salomi.png' },
      { name: 'Cheeseburger', price: 'R85', image: 'images/akhni & Salomi.png' }
    ]
  }
};

let currentRestaurant = 'she-ate';

/**
 * Selects a restaurant and updates the UI
 */
function selectRestaurant(restaurantKey) {
  currentRestaurant = restaurantKey;
  const restaurant = restaurants[restaurantKey];
  
  // Update selector
  document.querySelectorAll('.restaurant-card').forEach(card => {
    card.classList.remove('selected');
  });
  document.querySelector(`[data-restaurant="${restaurantKey}"]`).classList.add('selected');
  
  // Move selector to side
  document.querySelector('.restaurant-selector').classList.add('moved');
  
  // Show menu
  document.getElementById('menuGrid').style.display = 'grid';
  
  // Change background to restaurant color
  document.getElementById('explore').style.backgroundColor = restaurant.color + '20'; // Add transparency
  
  // Update hidden field
  document.getElementById('restaurant').value = restaurant.name;
  
  // Populate menu
  populateMenu(restaurant);
}

/**
 * Populates the menu grid with items from the selected restaurant
 */
function populateMenu(restaurant) {
  const menuGrid = document.getElementById('menuGrid');
  menuGrid.innerHTML = '';
  
  restaurant.menu.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="card-body">
        <h3>${item.name}</h3>
        <p class="price" style="color: ${restaurant.color}">${item.price}</p>
        <button onclick="openOrderModal('${item.name}')" style="background: ${restaurant.color}">Order Now</button>
      </div>
    `;
    menuGrid.appendChild(card);
  });
}

/**
 * AUDIO CONTROL
 * Explicitly unmutes and triggers play to bypass browser restrictions
 */
function toggleHeroAudio() {
  const video = document.getElementById('heroVideo');
  const btn = document.getElementById('muteBtn');
  
  if (video.muted) {
    video.muted = false;
    video.play(); // Crucial: forces the video to play with audio
    btn.innerHTML = '🔊'; 
    btn.style.backgroundColor = '#3CB371'; // Turns Green when active
  } else {
    video.muted = true;
    btn.innerHTML = '🔇'; 
    btn.style.backgroundColor = 'rgba(0,0,0,0.5)'; // Resets to dark
  }
}

/**
 * Opens the order modal and populates the item name
 */
function openOrderModal(item = '') {
  const itemInput = document.getElementById('item');
  const modal = document.getElementById('orderModal');
  
  if (itemInput) itemInput.value = item;
  if (modal) modal.style.display = 'block';
  
  setTimeout(() => document.getElementById('name')?.focus(), 100);
}

/**
 * Closes the order modal
 */
function closeModal() {
  const modal = document.getElementById('orderModal');
  if (modal) modal.style.display = 'none';
}

/**
 * Handle Order Submission
 */
document.getElementById('orderForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const contact = document.getElementById('contact').value.trim();
  const portion = document.getElementById('portion').value;
  const quantity = document.getElementById('quantity').value;
  const address = document.getElementById('address').value.trim();
  const item = document.getElementById('item').value;
  const restaurant = document.getElementById('restaurant').value;

  if (!name || !contact || !address) {
    alert("Please fill in all required fields!");
    return;
  }

  // 1. Message to QuickBite
  let businessMsg = `🍔 *New QuickBite Order!* 🍔\n\n`;
  businessMsg += `*Customer:* ${name}\n`;
  businessMsg += `*Restaurant:* ${restaurant}\n`;
  businessMsg += `*Item:* ${item || 'Custom Choice'}\n`;
  businessMsg += `*Portion:* ${portion}\n`;
  businessMsg += `*Quantity:* ${quantity}\n`;
  businessMsg += `*Address:* ${address}\n`;
  businessMsg += `*Contact:* ${contact}`;

  // 2. Confirmation to Customer
  const customerMsg = `Hi ${name}! QuickBite has received your order for ${quantity} x ${item || 'meal'} from ${restaurant}. Delivery to ${address} is being processed. 🚀`;

  // Open WhatsApp windows
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(businessMsg)}`, '_blank');

  setTimeout(() => {
    window.open(`https://wa.me/${contact}?text=${encodeURIComponent(customerMsg)}`, '_blank');
  }, 600);

  e.target.reset();
  closeModal();
});

/**
 * Quick Errand Feature
 */
function openErrand() {
  const msg = encodeURIComponent('Hi QuickBite! I need help with a quick errand:');
  window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  const modal = document.getElementById('orderModal');
  const chatModal = document.getElementById('chatModal');
  if (event.target == modal) {
    closeModal();
  }
  if (event.target == chatModal) {
    closeChatbot();
  }
}

/**
 * CHATBOT FUNCTIONALITY
 */
let chatMessages = [];

/**
 * Opens the chatbot modal
 */
function openChatbot() {
  const modal = document.getElementById('chatModal');
  if (modal) modal.style.display = 'block';
}

/**
 * Closes the chatbot modal
 */
function closeChatbot() {
  const modal = document.getElementById('chatModal');
  if (modal) modal.style.display = 'none';
}

/**
 * Handles Enter key press in chat input
 */
function handleChatKeyPress(event) {
  if (event.key === 'Enter') {
    sendChatMessage();
  }
}

/**
 * Sends a chat message to the AI
 */
async function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Add user message to chat
  addMessageToChat('user', message);
  input.value = '';
  
  // Add to message history
  chatMessages.push({ role: 'user', content: message });
  
  // Show typing indicator
  showTypingIndicator();
  
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: chatMessages }),
    });
    
    const data = await response.json();
    hideTypingIndicator();
    
    if (data.message) {
      // Add AI response to chat
      addMessageToChat('bot', data.message);
      chatMessages.push({ role: 'assistant', content: data.message });
      
      // Check if order is ready
      if (data.message.includes('ORDER_READY:')) {
        handleOrderReady(data.message);
      }
    } else {
      addMessageToChat('bot', 'Sorry, I encountered an error. Please try again.');
    }
  } catch (error) {
    hideTypingIndicator();
    addMessageToChat('bot', 'Sorry, I\'m having trouble connecting. Please try again later.');
    console.error('Chat error:', error);
  }
}

/**
 * Adds a message to the chat UI
 */
function addMessageToChat(sender, message) {
  const messagesContainer = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;
  
  const avatar = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
  
  messageDiv.innerHTML = `
    <div class="message-avatar">${avatar}</div>
    <div class="message-content">${message.replace(/\n/g, '<br>')}</div>
  `;
  
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Shows typing indicator
 */
function showTypingIndicator() {
  const messagesContainer = document.getElementById('chatMessages');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'message bot-message';
  typingDiv.id = 'typingIndicator';
  
  typingDiv.innerHTML = `
    <div class="message-avatar"><i class="fas fa-robot"></i></div>
    <div class="message-content">
      <div class="typing-dots">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;
  
  messagesContainer.appendChild(typingDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Hides typing indicator
 */
function hideTypingIndicator() {
  const typingDiv = document.getElementById('typingIndicator');
  if (typingDiv) {
    typingDiv.remove();
  }
}

/**
 * Handles when an order is ready from the AI
 */
function handleOrderReady(message) {
  // Extract order details from the message
  const orderMatch = message.match(/ORDER_READY:(.*)/s);
  if (orderMatch) {
    const orderDetails = orderMatch[1].trim();
    
    // Add WhatsApp button
    const messagesContainer = document.getElementById('chatMessages');
    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'message bot-message';
    
    buttonDiv.innerHTML = `
      <div class="message-avatar"><i class="fas fa-robot"></i></div>
      <div class="message-content">
        <button class="whatsapp-btn" onclick="sendOrderToWhatsApp('${encodeURIComponent(orderDetails)}')">
          <i class="fab fa-whatsapp"></i> Send Order via WhatsApp
        </button>
      </div>
    `;
    
    messagesContainer.appendChild(buttonDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}

/**
 * Sends the order to WhatsApp
 */
function sendOrderToWhatsApp(orderDetails) {
  const whatsappUrl = `https://wa.me/${phone}?text=${orderDetails}`;
  window.open(whatsappUrl, '_blank');
  closeChatbot();
}

// Initialize restaurant selector
document.addEventListener('DOMContentLoaded', () => {
  currentRestaurant = 'she-ate';
  document.querySelector(`[data-restaurant="she-ate"]`).classList.add('selected');
  
  document.querySelectorAll('.restaurant-card').forEach(card => {
    card.addEventListener('click', () => {
      const restaurantKey = card.dataset.restaurant;
      selectRestaurant(restaurantKey);
    });
  });
});