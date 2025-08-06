import { Bot, User, AlertTriangle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/lib/types";

interface ChatMessageProps {
  message: ChatMessage;
  isLoading?: boolean;
}

export default function ChatMessageComponent({
  message,
  isLoading = false,
}: ChatMessageProps) {
  const isAi = message.role === "ai";
  const isSystem = message.role === "system";

  if (isSystem) {
    return (
      <div className="flex items-center justify-center text-xs text-muted-foreground gap-2 my-4">
        <AlertTriangle className="w-4 h-4" />
        <span>{message.content}</span>
      </div>
    );
  }

  return (
    <div className={cn("flex items-start gap-4", !isAi && "justify-end")}>
      {isAi && (
        <Avatar className="w-10 h-10 border shadow-sm">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="w-6 h-6" />
          </AvatarFallback>
        </Avatar>
      )}
      <div className={cn("max-w-[75%] space-y-1", !isAi && "text-right")}>
        <p className="font-semibold px-1 text-sm">
          {isAi ? "TradeWise AI" : "You"}
        </p>
        <Card
          className={cn(
            "rounded-2xl",
            isAi
              ? "bg-card text-card-foreground rounded-tl-none"
              : "bg-primary text-primary-foreground rounded-tr-none"
          )}
        >
          <CardContent className="p-3">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-current animate-pulse [animation-delay:0s]" />
                <div className="w-2 h-2 rounded-full bg-current animate-pulse [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-current animate-pulse [animation-delay:0.4s]" />
              </div>
            ) : (
              <div className="whitespace-pre-wrap text-current break-words prose prose-sm max-w-none text-inherit">
                {message.content}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      {!isAi && (
        <Avatar className="w-10 h-10 border shadow-sm">
          <AvatarFallback>
            <User className="w-6 h-6" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
