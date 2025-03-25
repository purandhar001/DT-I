import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Chatbot.css';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { text: input, isUser: true, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(import.meta.env.VITE_AI_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: input }]
          }]
        }),
      });

      if (!response.ok) throw new Error('Failed to get AI response');
      
      const data = await response.json();
      console.log(data); // Log the entire response for debugging
      if (data.candidates && data.candidates.length > 0) {
        setMessages(prev => [...prev, { 
          text: data.candidates[0].content.parts[0].text,
          isUser: false,
          timestamp: Date.now()
        }]);
      } else {
        setMessages(prev => [...prev, { 
          text: "No response from AI.",
          isUser: false,
          timestamp: Date.now()
        }]);
      }

    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSuggestions = async (userInput) => {
    try {
      const response = await fetch('YOUR_SUGGESTION_API', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: userInput })
      });
      const data = await response.json();
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error('Error generating suggestions:', error);
    }
  };

  return (
    <motion.div 
      className="chatbot-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="chat-messages">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              className={`message ${message.isUser ? 'user' : 'bot'}`}
              initial={{ opacity: 0, x: message.isUser ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {message.text}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((suggestion, index) => (
            <motion.button
              key={index}
              className="suggestion-chip"
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setInput(suggestion);
                setSuggestions([]);
              }}
            >
              {suggestion}
            </motion.button>
          ))}
        </div>
      )}

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask me anything..."
          disabled={isLoading}
        />
        <motion.button
          className="btn"  // Added class to match dashboard buttons
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </motion.button>
      </div>
      {error && <div className="error">{error}</div>}
    </motion.div>
  );
}
