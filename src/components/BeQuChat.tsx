'use client';

import React, { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/lib/supabaseClient';

// Update Message structure to match the database and add sessionId for logical grouping
interface Message {
  id: string;
  sender: 'user' | 'llm';
  text: string;
  sessionId?: string; // Add optional sessionId to group messages
}

// Define the type for the data coming from your API
interface ChatHistoryItem {
  message: {
    type: 'human' | 'ai';
    content: string;
  };
  session_id: string;
}

// Simple SVG Placeholder Icons
const UserAvatar = () => (
  <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-600 font-semibold">
    U {/* Placeholder */}
  </div>
);
const BeQuAvatar = () => (
  <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white font-semibold">
    BQ {/* Placeholder */}
  </div>
);
const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
  </svg>
);
// SVG for delete icon (trash can)
const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M16.5 4.478v.227a48.84 48.84 0 0 1 3.205 1.343a48.964 48.964 0 0 0-3.205-1.343Z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M2.25 4.5a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v.227c-.381.085-.768.172-1.16.264a.784.784 0 0 0-.174.032l-.004.004a48.749 48.749 0 0 0-8.902 2.654l-.004.002-.002.001A.762.762 0 0 0 9 6.845v1.3a1.5 1.5 0 0 1-1.5 1.5H7.5a1.5 1.5 0 0 1-1.5-1.5v-1.3a.762.762 0 0 0-.012-.132h-.002a48.785 48.785 0 0 0-8.902-2.654c-.03-.01-.06-.017-.091-.027-.392-.092-.78-.179-1.161-.265V4.5Zm-1.5 2a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6.75a3 3 0 0 1-3 3H4.5a3 3 0 0 1-3-3V6.5Zm3 3.75a1.5 1.5 0 0 0 0 3H19.5a1.5 1.5 0 0 0 0-3H4.5Z" clipRule="evenodd" />
    <path d="M12 18a1.5 1.5 0 0 1 1.5-1.5h.75a.75.75 0 0 0 0-1.5h-1.5A1.5 1.5 0 0 1 12 15a1.5 1.5 0 0 1-1.5-1.5v-3a1.5 1.5 0 0 1 3 0v3A1.5 1.5 0 0 1 12 18Zm-.75-7.5a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5h-.75ZM15 15a1.5 1.5 0 0 1 1.5-1.5h.75a.75.75 0 0 0 0-1.5h-1.5A1.5 1.5 0 0 1 15 12a1.5 1.5 0 0 1-1.5-1.5v-3a1.5 1.5 0 0 1 3 0v3a1.5 1.5 0 0 1-1.5 1.5Z" />
  </svg>
);


export default function BeQuChat() {
  const [chatSessionId, ] = useState<string>(uuidv4());
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false); // NUEVO: Estado para el borrado
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const fetchChatHistory = async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session?.access_token) {
        console.error('No active session found.');
        return;
      }

      const response = await fetch('/api/chat', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      const data = await response.json();
      
      const formattedHistory: Message[] = data.history
        .filter((item: ChatHistoryItem) => item.message && item.message.type && item.message.content)
        .map((item: ChatHistoryItem) => ({
          id: uuidv4(),
          sender: item.message.type === 'human' ? 'user' : 'llm',
          text: item.message.content,
          sessionId: item.session_id,
        }));
      setMessages(formattedHistory);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    } finally {
      setIsInitialLoad(false);
    }
  };

  useEffect(() => {
    fetchChatHistory();
    if (messages.length === 0) {
      setMessages([{ id: uuidv4(), sender: 'llm', text: 'Hi, I am BeQu! I can help you resolve questions about medical device regulations in Europe.' }]);
    }
  }, [messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [currentInput]);


  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentInput(event.target.value);
  };


  const handleSendMessage = async (event?: FormEvent<HTMLFormElement>) => {
    if (event) { event.preventDefault(); }
    const messageText = currentInput.trim();
    if (!messageText || isLoading || isDeleting) return; // Added isDeleting check

    const userMessage: Message = { id: uuidv4(), sender: 'user', text: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setCurrentInput('');
    setIsLoading(true);

    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session?.access_token) throw new Error(sessionError?.message || 'User session/token not found.');
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.access_token}` },
        body: JSON.stringify({ sessionId: chatSessionId, chatInput: messageText }),
      });

      if (!response.ok) { const errorText = await response.text(); throw new Error(errorText || `API Error: ${response.statusText}`); }
      const data = await response.json();
      if (typeof data.output === 'undefined') throw new Error('Invalid response format from chat API.');

      const llmMessage: Message = { id: uuidv4(), sender: 'llm', text: data.output };
      setMessages((prev) => [...prev, llmMessage]);
    } catch (error) {
      console.error('Error sending chat message:', error);
      const errorMessage: Message = { id: uuidv4(), sender: 'llm', text: `Sorry, an error occurred: ${error instanceof Error ? error.message : 'Unknown error'}` };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  // NUEVO: Función para manejar la eliminación del historial
  const handleDeleteHistory = async () => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar todo tu historial de conversaciones? Esta acción es irreversible.')) {
      return;
    }
  
    setIsDeleting(true);
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session?.access_token) {
        throw new Error('No active session found.');
      }
  
      const response = await fetch('/api/chat', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
      });
  
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
  
      // Reset the chat state to an empty state with a welcome message
      setMessages([{ id: uuidv4(), sender: 'llm', text: 'Hi, I am BeQu! I can help you resolve questions about medical device regulations in Europe.' }]);
    } catch (error) {
      console.error('Error deleting chat history:', error);
      const errorMessage: Message = { id: uuidv4(), sender: 'llm', text: `Sorry, an error occurred: ${error instanceof Error ? error.message : 'Unknown error'}` };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsDeleting(false);
    }
  };


  // Handle Enter key press (Shift+Enter for newline)
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent newline
      handleSendMessage(); // Send message
    }
  };


  return (
    <div className="flex flex-col h-[70vh] max-h-[750px] border rounded-lg bg-white shadow-md overflow-hidden">
      {isInitialLoad ? (
        <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50 flex items-center justify-center text-gray-500 italic">
          <p>Loading chat history...</p>
        </div>
      ) : (
        <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'llm' && <BeQuAvatar />}
              <div
                className={`px-3 py-2 rounded-lg max-w-[75%] shadow-sm ${
                  message.sender === 'user'
                    ? 'bg-blue-100 text-blue-900 rounded-br-none'
                    : 'bg-gray-200 text-gray-900 rounded-bl-none'
                }`}
              >
                {message.text.split('\n').map((line, index) => (
                  <p key={index} className={index > 0 ? 'mt-1' : ''}>{line || '\u00A0'}</p>
                ))}
              </div>
              {message.sender === 'user' && <UserAvatar />}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end gap-2 justify-start">
              <BeQuAvatar />
              <div className="px-3 py-2 rounded-lg max-w-[75%] bg-gray-200 text-gray-500 italic shadow-sm rounded-bl-none">
                BeQu is thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input Area */}
      <div className="border-t p-3 bg-gray-100">
        <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
          <textarea
            ref={inputRef}
            value={currentInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask BeQu about FDA/MDR..."
            disabled={isLoading || isInitialLoad}
            className="flex-grow border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-200 resize-none overflow-hidden max-h-28 text-gray-900"
            rows={1}
            required
          />
          <button
            type="button"
            onClick={handleDeleteHistory}
            disabled={isDeleting || isLoading}
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-red-500 shrink-0"
            aria-label="Eliminar historial de chat"
          >
            <DeleteIcon />
          </button>
          <button
            type="submit"
            disabled={isLoading || isInitialLoad || !currentInput.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-blue-500 shrink-0"
            aria-label="Send message"
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
}