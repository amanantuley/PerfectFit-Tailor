
"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, Mic, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { ChatInput } from "@/ai/flows/chatbot-flow";
import { chat } from "@/ai/flows/chatbot-flow";
import { useLanguage } from "@/contexts/language-context";

interface Message {
  role: 'user' | 'model';
  content: string;
}

// Check for SpeechRecognition API
const SpeechRecognition =
  (typeof window !== 'undefined' && ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition));

export function ChatbotWidget() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hi! I'm FitBot. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ role: 'model', content: t("Hi! I'm FitBot. How can I help you today?") }])
  }, [t]);

  useEffect(() => {
    if (scrollAreaRef.current) {
        const scrollableNode = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollableNode) {
            scrollableNode.scrollTo({
                top: scrollableNode.scrollHeight,
                behavior: 'smooth',
            });
        }
    }
  }, [messages]);

  useEffect(() => {
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      toast({
        variant: "destructive",
        title: "Voice Error",
        description: `Could not understand audio. Please try again. Error: ${event.error}`,
      });
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [toast]);

  const toggleListening = () => {
    if (!SpeechRecognition) {
       toast({
        variant: "destructive",
        title: "Unsupported",
        description: "Your browser does not support voice recognition.",
      });
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const chatHistory = messages.map(m => ({ role: m.role, content: m.content }));
      const chatInput: ChatInput = { query: input, history: chatHistory };
      const response = await chat(chatInput);
      const assistantMessage: Message = { role: 'model', content: response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: Message = { role: 'model', content: t("Sorry, I encountered an error. Please try again.") };
      setMessages(prev => [...prev, errorMessage]);
       toast({
        variant: "destructive",
        title: "AI Error",
        description: "Failed to get a response from the assistant.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
       <AnimatePresence>
        {isOpen && (
           <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="w-[350px] h-[500px] bg-card rounded-lg border shadow-xl flex flex-col origin-bottom-right"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">{t('FitBot Assistant')}</h3>
            </div>
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn("flex", message.role === 'user' ? 'justify-end' : 'justify-start')}
                  >
                    <div className={cn(
                      "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                      message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    )}>
                      {message.content}
                    </div>
                  </motion.div>
                ))}
                 {loading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                        <div className="bg-muted rounded-lg px-3 py-2 flex items-center gap-2">
                           <Loader2 className="h-4 w-4 animate-spin" />
                           <span className="text-sm">{t('Thinking...')}</span>
                        </div>
                    </motion.div>
                 )}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('Ask about orders...')}
                  disabled={loading || isListening}
                  className="flex-1"
                />
                 <Button type="button" size="icon" variant={isListening ? "destructive" : "outline"} onClick={toggleListening} disabled={loading}>
                    <Mic className="h-4 w-4" />
                </Button>
                <Button type="submit" size="icon" disabled={loading || !input.trim()}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </form>
            </div>
           </motion.div>
        )}
      </AnimatePresence>
       <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
        >
        <Button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full h-16 w-16 shadow-lg flex items-center justify-center"
        >
            {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        </Button>
      </motion.div>
    </div>
  );
}
