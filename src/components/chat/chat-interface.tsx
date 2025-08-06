"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAiResponse } from "@/app/actions";
import type { Persona, ChatMessage as ChatMessageType } from "@/lib/types";
import ChatMessageComponent from "./chat-message";
import { OptionsStrategyForm } from "./persona-forms";

interface ChatInterfaceProps {
  activePersona: Persona;
}

const personaDetails: Record<
  Persona,
  { title: string; description: string; placeholder: string }
> = {
  dashboard: {
    title: "Dashboard",
    description: "Your central hub for financial AI assistance.",
    placeholder: "Select a tool to begin...",
  },
  "stock-analysis": {
    title: "Stock Technical Analysis",
    description: "Enter a stock ticker to get an in-depth technical analysis.",
    placeholder: "e.g., AAPL, TSLA, MSFT...",
  },
  "option-strategy": {
    title: "Options Strategy Suggestion",
    description: "Fill in the details and ask for an options strategy.",
    placeholder: "e.g., What's a good bullish strategy for the next month?",
  },
  "market-news": {
    title: "Market News Summary",
    description: "Get the latest market news summary for any stock.",
    placeholder: "e.g., GOOG, NVDA...",
  },
};

export default function ChatInterface({ activePersona }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { title, description, placeholder } = personaDetails[activePersona];

  useEffect(() => {
    setMessages([
      {
        id: `initial-${activePersona}`,
        role: "system",
        content: `You are now interacting with the ${title}. ${description}`,
        timestamp: new Date().toISOString(),
      },
    ]);
  }, [activePersona, title, description]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userInput = formData.get("message") as string;

    if (!userInput.trim()) return;

    const userMessage: ChatMessageType = {
      id: `user-${Date.now()}`,
      role: "user",
      content: userInput,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const aiResponse = await getAiResponse(activePersona, formData);
      const aiMessage: ChatMessageType = {
        id: `ai-${Date.now()}`,
        role: "ai",
        content: aiResponse,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: ChatMessageType = {
        id: `error-${Date.now()}`,
        role: "system",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      const messageInput = formRef.current?.elements.namedItem(
        "message"
      ) as HTMLInputElement;
      if (messageInput) {
        messageInput.value = "";
        messageInput.focus();
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-background rounded-l-lg">
      <header className="p-4 border-b">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </header>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {messages.map((msg) => (
            <ChatMessageComponent key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <ChatMessageComponent
              message={{
                id: "loading",
                role: "ai",
                content: "...",
                timestamp: "",
              }}
              isLoading
            />
          )}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>

      <div className="p-4 border-t bg-background">
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          {activePersona === "option-strategy" && <OptionsStrategyForm />}
          <div className="relative">
            <Input
              name="message"
              placeholder={placeholder}
              className="pr-12 h-12 text-base"
              disabled={isLoading || activePersona === "dashboard"}
              autoComplete="off"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute top-1/2 right-2 -translate-y-1/2"
              disabled={isLoading || activePersona === "dashboard"}
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
