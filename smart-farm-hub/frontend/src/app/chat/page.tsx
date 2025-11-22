'use client';

import { useEffect, useRef, useState } from 'react';
import { chatAPI } from '@/lib/api';
import { useAppStore } from '@/lib/store';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language, farmer } = useAppStore();

  const labels = {
    en: {
      title: '24/7 Farming Assistant',
      subtitle: 'Get instant answers to your farming questions',
      placeholder: 'Ask me anything about farming...',
      send: 'Send',
      welcome: 'Welcome to your 24/7 Farming Assistant!',
      welcomeMsg: "I'm here to help you with crop management, pest control, market prices, weather guidance, and more. What would you like to know?",
      suggestions: 'Suggested questions:',
      suggest1: 'What crops should I grow this season?',
      suggest2: 'How do I manage pest attacks?',
      suggest3: 'What are current mandi prices?',
      suggest4: 'How much water does rice need?',
      typing: 'Assistant is typing...',
      error: 'Error sending message',
    },
    ka: {
      title: '24/7 ಕೃಷಿ ಸಹಾಯಕ',
      subtitle: 'ನಿಮ್ಮ ಕೃಷಿ ಪ್ರಶ್ನೆಗಳಿಗೆ ತಾತ್ಕ್ಷಣಿಕ ಉತ್ತರ ಪಡೆಯಿರಿ',
      placeholder: 'ನನ್ನನ್ನು ಕೃಷಿ ಬಗ್ಗೆ ಏನನ್ನಾದರೂ ಕೇಳಿ...',
      send: 'ಕಳುಹಿಸಿ',
      welcome: '24/7 ಕೃಷಿ ಸಹಾಯಕಕ್ಕೆ ಸ್ವಾಗತ!',
      welcomeMsg: 'ನಾನು ಬೆಳೆ ನಿರ್ವಹಣೆ, ಕೀಟ ನಿಯಂತ್ರಣ, ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು, ಹವಾಮಾನ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಇನ್ನಷ್ಟು ಬಗ್ಗೆ ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ಇಲ್ಲಿದ್ದೇನೆ. ನೀವು ಏನು ತಿಳಿಯಲು ಬಯಸುತ್ತೀರಿ?',
      suggestions: 'ಸೂಚಿತ ಪ್ರಶ್ನೆಗಳು:',
      suggest1: 'ಈ ಋತುವಿನಲ್ಲಿ ನಾನು ಯಾವ ಬೆಳೆ ಬೆಳೆಯಬೇಕು?',
      suggest2: 'ನಾನು ಕೀಟ ದಾಳಿಗಳನ್ನು ಹೇಗೆ ನಿರ್ವಹಿಸುವುದು?',
      suggest3: 'ಪ್ರಸ್ತುತ ಮಂಡಿ ಬೆಲೆ ಯಾವುದು?',
      suggest4: 'ಅಕ್ಕಿಗೆ ಎಷ್ಟು ನೀರು ಬೇಕು?',
      typing: 'ಸಹಾಯಕ ಟೈಪ್ ಮಾಡುತ್ತಿದ್ದಾರೆ...',
      error: 'ಸಂದೇಶ ಕಳುಹಿಸುವಲ್ಲಿ ದೋಷ',
    },
    hi: {
      title: '24/7 खेती सहायक',
      subtitle: 'अपने खेती के सवालों के तुरंत जवाब पाएं',
      placeholder: 'मुझसे खेती के बारे में कुछ भी पूछें...',
      send: 'भेजें',
      welcome: 'आपके 24/7 खेती सहायक में स्वागत है!',
      welcomeMsg: 'मैं आपको फसल प्रबंधन, कीट नियंत्रण, बाजार मूल्य, मौसम संबंधी मार्गदर्शन और बहुत कुछ के साथ मदद करने के लिए यहां हूं। आप क्या जानना चाहते हैं?',
      suggestions: 'सुझाए गए सवाल:',
      suggest1: 'मुझे इस मौसम में कौन सी फसलें उगानी चाहिए?',
      suggest2: 'मैं कीट के हमलों को कैसे प्रबंधित करूं?',
      suggest3: 'वर्तमान मंडी मूल्य क्या हैं?',
      suggest4: 'चावल को कितना पानी चाहिए?',
      typing: 'सहायक टाइप कर रहे हैं...',
      error: 'संदेश भेजने में त्रुटि',
    },
  };

  const t = labels[language as keyof typeof labels] || labels.en;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await chatAPI.sendMessage(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        content: response.data.item.reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      setError(err.message);
      // Fallback response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        content: 'I apologize for the error. Please try again in a moment.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto px-4 py-8">
        {/* Header */}
        {messages.length === 0 && (
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{t.title}</h1>
            <p className="text-lg text-gray-600 mb-8">{t.subtitle}</p>
          </div>
        )}

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 bg-white rounded-lg shadow p-6">
          {messages.length === 0 ? (
            // Welcome Screen
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <h2 className="text-2xl font-bold text-green-900 mb-2">👋 {t.welcome}</h2>
                <p className="text-green-800">{t.welcomeMsg}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">{t.suggestions}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={() => handleSuggestedQuestion(t.suggest1)}
                    className="p-4 border border-gray-300 rounded-lg text-left hover:bg-green-50 hover:border-green-500 transition"
                  >
                    <p className="text-sm text-gray-700 font-medium">{t.suggest1}</p>
                  </button>
                  <button
                    onClick={() => handleSuggestedQuestion(t.suggest2)}
                    className="p-4 border border-gray-300 rounded-lg text-left hover:bg-green-50 hover:border-green-500 transition"
                  >
                    <p className="text-sm text-gray-700 font-medium">{t.suggest2}</p>
                  </button>
                  <button
                    onClick={() => handleSuggestedQuestion(t.suggest3)}
                    className="p-4 border border-gray-300 rounded-lg text-left hover:bg-green-50 hover:border-green-500 transition"
                  >
                    <p className="text-sm text-gray-700 font-medium">{t.suggest3}</p>
                  </button>
                  <button
                    onClick={() => handleSuggestedQuestion(t.suggest4)}
                    className="p-4 border border-gray-300 rounded-lg text-left hover:bg-green-50 hover:border-green-500 transition"
                  >
                    <p className="text-sm text-gray-700 font-medium">{t.suggest4}</p>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Messages
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-green-600 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-900 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-green-100' : 'text-gray-600'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-900 px-4 py-3 rounded-lg rounded-bl-none">
                <p className="text-sm">{t.typing}</p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{t.error}: {error}</p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={t.placeholder}
              disabled={loading}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || loading}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 transition"
            >
              {t.send}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            💡 Tip: You can ask questions anytime. This assistant is available 24/7.
          </p>
        </div>
      </div>
    </div>
  );
}
