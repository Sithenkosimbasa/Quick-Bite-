const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    // Add system prompt for QuickBite ordering
    const systemPrompt = {
      role: 'system',
      content: `You are QuickBite AI Assistant, a helpful chatbot for QuickBite, a ready-to-eat office meal delivery service from multiple restaurants.

Restaurants and Menus:
- She Ate: Margherita Pizza (R120), Pasta Carbonara (R110), Caesar Salad (R80)
- Ouma's: Bobotie (R95), Koeksisters (R50), Malva Pudding (R65)
- Nibbly Bits: Loaded Fries (R75), Chicken Wings (R90), Cheeseburger (R85)

Your role:
1. Help customers place orders by asking for their name, contact (WhatsApp number), restaurant, item, portion, quantity, and office address.
2. Provide menu information and prices for each restaurant.
3. Calculate totals including any size upgrades.
4. Confirm orders before finalizing.
5. Once order is confirmed, provide a formatted WhatsApp message that the customer can copy or that will be sent automatically.
6. Handle general inquiries about delivery, deals, errands, etc.
7. Be friendly, professional, and efficient.

When ready to send order, format the response with ORDER_READY: followed by the WhatsApp message details.`
    };

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [systemPrompt, ...messages],
      max_tokens: 500,
      temperature: 0.7,
    });

    const aiMessage = response.choices[0].message.content;
    res.json({ message: aiMessage });

  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

app.listen(port, () => {
  console.log(`QuickBite AI server running on port ${port}`);
});