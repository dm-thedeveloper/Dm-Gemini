import { useState } from "react";
import { Header } from "./components/Header";
import { ChatSidebar } from "./components/ChatSidebar";
import { ChatArea } from "./components/ChatArea";
import { InputBar } from "./components/InputBar";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface Chat {
  id: string;
  title: string;
  timestamp: string;
}

function App() {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      title: "What is artificial intelligence?",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      title: "Help me write a story",
      timestamp: "Yesterday",
    },
    {
      id: "3",
      title: "Explain quantum computing",
      timestamp: "3 days ago",
    },
    {
      id: "4",
      title: "Creative writing tips",
      timestamp: "1 week ago",
    },
  ]);

  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleNewChat = () => {
    setActiveChat(null);
    setMessages([]);
  };

  const handleSelectChat = (chatId: string) => {
    setActiveChat(chatId);
    // Load mock messages for the selected chat
    const mockMessages: Message[] = [
      {
        id: "1",
        role: "user",
        content: chats.find((c) => c.id === chatId)?.title || "Hello!",
      },
      {
        id: "2",
        role: "assistant",
        content:
          "Hello! I'm DM-Gemini, your AI assistant. I'd be happy to help you with that question. Let me provide you with a comprehensive answer that covers the key aspects of your query.",
      },
    ];
    setMessages(mockMessages);
  };

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I understand your question. As an AI assistant, I'm here to provide helpful, accurate, and thoughtful responses. While this is a demo interface, in a production environment, I would analyze your input and provide detailed, contextual answers based on advanced language understanding capabilities.",
      };
      setMessages((prev) => [...prev, aiMessage]);

      // If it's a new chat, add it to the history
      if (!activeChat) {
        const newChat: Chat = {
          id: Date.now().toString(),
          title: content.slice(0, 40) + (content.length > 40 ? "..." : ""),
          timestamp: "Just now",
        };
        setChats((prev) => [newChat, ...prev]);
        setActiveChat(newChat.id);
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-cyan-900 overflow-hidden">
      {/* Animated glow effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>

      {/* Main layout */}
      <Header />
      <ChatSidebar
        chats={chats}
        activeChat={activeChat}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
      />
      
      <main className="fixed top-16 left-72 right-0 bottom-0 flex flex-col">
        <ChatArea messages={messages} />
        <InputBar onSendMessage={handleSendMessage} />
      </main>
    </div>
  );
}

export default App;
