# QuickBite AI-Enhanced Website

This is the QuickBite ready-to-eat office meals website with integrated AI chatbot for order processing and customer support.

## Features

- Static website with modern design
- AI-powered chatbot for order assistance
- WhatsApp integration for order delivery
- Menu display with pricing
- Office deals and loyalty information
- Quick errands service

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone or download the project files to your local machine.

2. Navigate to the project directory:
   ```bash
   cd path/to/QuickBite
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_actual_openai_api_key_here
   ```
   You can get an API key from [OpenAI's website](https://platform.openai.com/api-keys).

### Running the Application

1. Start the server:
   ```bash
   npm start
   ```

2. For development (with auto-restart):
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## How It Works

### AI Chatbot

The AI assistant is powered by OpenAI's GPT-3.5-turbo model and is specifically trained to:

- Help customers place orders by collecting necessary information
- Provide menu details and pricing
- Calculate order totals
- Confirm orders before processing
- Generate properly formatted WhatsApp messages for order submission

### Order Flow

1. Customer clicks "AI Assistant" button
2. Chatbot greets and offers assistance
3. Customer can ask questions or place orders through natural conversation
4. AI collects order details (name, contact, item, portion, quantity, address)
5. AI confirms the order and provides total cost
6. Upon confirmation, AI generates a WhatsApp message
7. Customer clicks "Send Order via WhatsApp" to complete the order

### WhatsApp Integration

Orders are sent via WhatsApp to the business number (27634337174). The system sends:
- Order details to the business
- Confirmation message to the customer

## File Structure

```
QuickBite/
├── Home.html          # Main website HTML
├── javascript.js      # Frontend JavaScript
├── Style.css          # Website styling
├── server.js          # Node.js backend server
├── package.json       # Node.js dependencies
├── .env              # Environment variables (API keys)
├── images/           # Image assets
└── README.md         # This file
```

## Customization

### Menu Items

Update the menu items in `server.js` in the system prompt section.

### Business Information

Update the WhatsApp number in `javascript.js` and `server.js`.

### Styling

Modify `Style.css` to change the website appearance.

### AI Behavior

Adjust the system prompt in `server.js` to change how the AI assistant behaves.

## Troubleshooting

### Common Issues

1. **"Failed to process chat message"**
   - Check your OpenAI API key in `.env`
   - Ensure you have credits in your OpenAI account
   - Verify internet connection

2. **Server not starting**
   - Ensure Node.js is installed
   - Check that port 3000 is not in use
   - Run `npm install` to install dependencies

3. **WhatsApp links not working**
   - Ensure WhatsApp is installed on the device
   - Check the phone number format

## Deployment

For production deployment:

1. Set up a hosting service (Heroku, Vercel, AWS, etc.)
2. Set environment variables for the OpenAI API key
3. Ensure the server can serve static files
4. Update any hardcoded URLs if necessary

## Support

For issues or questions about this implementation, please check the code comments or refer to the OpenAI and Express.js documentation.</content>
<parameter name="filePath">c:\Users\Mandl\Desktop\Websites\QB\README.md