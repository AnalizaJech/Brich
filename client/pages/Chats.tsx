import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProfilePhoto from "@/components/ProfilePhoto";
import BottomNavigation from "@/components/BottomNavigation";
import PageHeader from "@/components/PageHeader";
import {
  MessageCircle,
  Send,
  ArrowLeft,
  Phone,
  Video,
  MoreHorizontal,
  Image,
  Smile,
  Mic,
  Clock,
  Check,
  CheckCheck,
  Heart,
  CreditCard,
  Search,
  Plus,
} from "lucide-react";

interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: string;
  read: boolean;
  type: "text" | "image";
}

interface Chat {
  id: number;
  name: string;
  age: number;
  mode: "blue" | "amber" | "red";
  gender: "male" | "female";
  online: boolean;
  verified: boolean;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

export default function Chats() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [credits, setCredits] = useState(15);
  const [selectedChat, setSelectedChat] = useState<number | null>(
    searchParams.get("match") ? parseInt(searchParams.get("match")!) : null
  );
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      name: "Isabella",
      age: 24,
      mode: "blue",
      gender: "female",
      online: true,
      verified: true,
      lastMessage: "¡Hola! Me encanta tu perfil 😊",
      lastMessageTime: "14:30",
      unreadCount: 2,
      messages: [
        {
          id: 1,
          senderId: 1,
          text: "¡Hola! Vi tu perfil y me parece que tenemos mucho en común 😊",
          timestamp: "14:25",
          read: true,
          type: "text",
        },
        {
          id: 2,
          senderId: 0,
          text: "¡Hola Isabella! Sí, también lo noté. Me gusta tu enfoque en la psicología",
          timestamp: "14:27",
          read: true,
          type: "text",
        },
        {
          id: 3,
          senderId: 1,
          text: "¡Exacto! Me encanta poder conectar con alguien que entiende la importancia de la salud mental",
          timestamp: "14:30",
          read: false,
          type: "text",
        },
        {
          id: 4,
          senderId: 1,
          text: "¿Te gustaría que nos conozcamos mejor? Tal vez podríamos tomar un café",
          timestamp: "14:31",
          read: false,
          type: "text",
        },
      ],
    },
    {
      id: 2,
      name: "Carlos",
      age: 29,
      mode: "amber",
      gender: "male",
      online: true,
      verified: false,
      lastMessage: "¿Te gusta hacer hiking?",
      lastMessageTime: "12:15",
      unreadCount: 0,
      messages: [
        {
          id: 1,
          senderId: 2,
          text: "¡Hey! Me gusta tu vibe aventurero",
          timestamp: "11:45",
          read: true,
          type: "text",
        },
        {
          id: 2,
          senderId: 0,
          text: "¡Gracias! Me encanta conocer gente que también le gusta la aventura",
          timestamp: "12:10",
          read: true,
          type: "text",
        },
        {
          id: 3,
          senderId: 2,
          text: "¿Te gusta hacer hiking? Conozco unos lugares increíbles cerca de aquí",
          timestamp: "12:15",
          read: true,
          type: "text",
        },
      ],
    },
    {
      id: 3,
      name: "Sofia",
      age: 24,
      mode: "red",
      gender: "female",
      online: false,
      verified: true,
      lastMessage: "Deberíamos conocernos pronto...",
      lastMessageTime: "Ayer",
      unreadCount: 1,
      messages: [
        {
          id: 1,
          senderId: 3,
          text: "Me encanta tu energía intensa 🔥",
          timestamp: "Ayer 22:30",
          read: true,
          type: "text",
        },
        {
          id: 2,
          senderId: 0,
          text: "Tú también irradias una pasión increíble",
          timestamp: "Ayer 22:45",
          read: true,
          type: "text",
        },
        {
          id: 3,
          senderId: 3,
          text: "Deberíamos conocernos pronto... creo que podríamos tener una conexión muy especial",
          timestamp: "Ayer 23:00",
          read: false,
          type: "text",
        },
      ],
    },
    {
      id: 6,
      name: "Diego",
      age: 28,
      mode: "red",
      gender: "male",
      online: true,
      verified: true,
      lastMessage: "¿Cuándo nos vemos?",
      lastMessageTime: "10:20",
      unreadCount: 3,
      messages: [
        {
          id: 1,
          senderId: 6,
          text: "Me gusta tu estilo directo",
          timestamp: "09:30",
          read: true,
          type: "text",
        },
        {
          id: 2,
          senderId: 0,
          text: "Creo en la honestidad desde el principio",
          timestamp: "09:45",
          read: true,
          type: "text",
        },
        {
          id: 3,
          senderId: 6,
          text: "Perfecto, eso me gusta aún más",
          timestamp: "10:00",
          read: false,
          type: "text",
        },
        {
          id: 4,
          senderId: 6,
          text: "¿Cuándo nos vemos? Me muero de ganas de conocerte en persona",
          timestamp: "10:20",
          read: false,
          type: "text",
        },
      ],
    },
  ]);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentChat = chats.find((chat) => chat.id === selectedChat);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  const sendMessage = () => {
    if (newMessage.trim() && selectedChat && credits > 0) {
      const message: Message = {
        id: Date.now(),
        senderId: 0,
        text: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: true,
        type: "text",
      };

      setChats(prev => prev.map(chat => {
        if (chat.id === selectedChat) {
          return {
            ...chat,
            messages: [...chat.messages, message],
            lastMessage: newMessage.trim(),
            lastMessageTime: message.timestamp,
          };
        }
        return chat;
      }));

      setNewMessage("");
      setCredits(prev => Math.max(0, prev - 1));

      // Simular respuesta automática después de 2-3 segundos
      setTimeout(() => {
        const responses = [
          "¡Me gusta cómo piensas! 😊",
          "Totalmente de acuerdo contigo",
          "Eso suena genial, cuéntame más",
          "Me encanta tu perspectiva",
          "¡Qué interesante! 🤔",
          "Me parece una gran idea",
          "Deberíamos hablar más sobre esto",
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const responseMessage: Message = {
          id: Date.now() + 1,
          senderId: selectedChat,
          text: randomResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false,
          type: "text",
        };

        setChats(prev => prev.map(chat => {
          if (chat.id === selectedChat) {
            return {
              ...chat,
              messages: [...chat.messages, responseMessage],
              lastMessage: randomResponse,
              lastMessageTime: responseMessage.timestamp,
              unreadCount: chat.unreadCount + 1,
            };
          }
          return chat;
        }));
      }, Math.random() * 2000 + 1000);
    }
  };

  const markAsRead = (chatId: number) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          unreadCount: 0,
          messages: chat.messages.map(msg => ({ ...msg, read: true }))
        };
      }
      return chat;
    }));
  };

  const totalUnreadMessages = chats.reduce((total, chat) => total + chat.unreadCount, 0);

  if (selectedChat && currentChat) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brich-dark via-slate-900 to-brich-dark flex flex-col">
        {/* Chat Header */}
        <div className="bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-lg">
          <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setSelectedChat(null)}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              
              <div className="relative">
                <ProfilePhoto
                  name={currentChat.name}
                  gender={currentChat.gender}
                  personalityType={currentChat.mode}
                  size="md"
                  className="border-2 border-white/20"
                />
                {currentChat.online && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              
              <div>
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <span>{currentChat.name}</span>
                  {currentChat.verified && (
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
                      ✓
                    </Badge>
                  )}
                </h2>
                <p className="text-xs text-gray-400">
                  {currentChat.online ? "En línea" : "Última vez ayer"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/10">
                <Phone className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/10">
                <Video className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/10">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="max-w-md mx-auto">
            {currentChat.messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-4 ${message.senderId === 0 ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl relative ${
                    message.senderId === 0
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 text-white"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <div className="flex items-center justify-end space-x-1 mt-1">
                    <span className="text-xs opacity-70">{message.timestamp}</span>
                    {message.senderId === 0 && (
                      <div className="text-xs">
                        {message.read ? (
                          <CheckCheck className="h-3 w-3 text-blue-300" />
                        ) : (
                          <Check className="h-3 w-3 text-gray-300" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-slate-900/95 backdrop-blur-xl border-t border-slate-700/50 p-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-2">
              <Button size="icon" variant="ghost" className="text-gray-400 hover:bg-white/10">
                <Plus className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-gray-400 hover:bg-white/10">
                <Image className="h-5 w-5" />
              </Button>
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Escribe un mensaje..."
                  className="w-full bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:bg-white/10"
                >
                  <Smile className="h-5 w-5" />
                </Button>
              </div>
              
              {newMessage.trim() ? (
                <Button
                  size="icon"
                  onClick={sendMessage}
                  disabled={credits === 0}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
                </Button>
              ) : (
                <Button size="icon" variant="ghost" className="text-gray-400 hover:bg-white/10">
                  <Mic className="h-5 w-5" />
                </Button>
              )}
            </div>
            
            {credits === 0 && (
              <div className="mt-2 text-center">
                <span className="text-xs text-red-400">Sin créditos para enviar mensajes</span>
              </div>
            )}
          </div>
        </div>

        <BottomNavigation />
      </div>
    );
  }

  // Chat List View
  return (
    <div className="min-h-screen bg-gradient-to-br from-brich-dark via-slate-900 to-brich-dark">
      <PageHeader
        title="Chats"
        subtitle={`${totalUnreadMessages} mensajes sin leer`}
        icon={<MessageCircle className="h-6 w-6 text-white" />}
        iconGradient="from-blue-500 to-cyan-600"
        credits={credits}
      />

      {/* Search */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Chats List */}
      <div className="max-w-md mx-auto px-4 pb-32 space-y-2">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <Card
              key={chat.id}
              className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer"
              onClick={() => {
                setSelectedChat(chat.id);
                markAsRead(chat.id);
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <ProfilePhoto
                      name={chat.name}
                      gender={chat.gender}
                      personalityType={chat.mode}
                      size="lg"
                      className={`border-2 ${
                        chat.mode === "blue"
                          ? "border-blue-500"
                          : chat.mode === "amber"
                            ? "border-amber-500"
                            : "border-red-500"
                      }`}
                    />
                    {chat.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-white">{chat.name}</h3>
                        {chat.verified && (
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
                            ✓
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-400">{chat.lastMessageTime}</span>
                        {chat.unreadCount > 0 && (
                          <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-white">{chat.unreadCount}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 truncate">{chat.lastMessage}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No hay chats</h3>
            <p className="text-gray-400 mb-4">
              {searchQuery ? "No se encontraron chats" : "Aún no tienes conversaciones"}
            </p>
            <Button
              onClick={() => navigate("/matches")}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
            >
              Ver Matches
            </Button>
          </div>
        )}
      </div>

      <BottomNavigation totalUnreadMessages={totalUnreadMessages} />
    </div>
  );
}
