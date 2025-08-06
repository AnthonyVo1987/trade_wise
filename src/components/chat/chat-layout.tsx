"use client";

import React, { useState } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from "@/components/ui/sidebar";
import ChatSidebar from "@/components/chat/sidebar";
import ChatInterface from "@/components/chat/chat-interface";
import type { Persona } from "@/lib/types";

export default function ChatLayout() {
  const [activePersona, setActivePersona] = useState<Persona>("dashboard");

  return (
    <SidebarProvider>
      <div className="h-full bg-sidebar">
        <Sidebar>
          <ChatSidebar
            activePersona={activePersona}
            setActivePersona={setActivePersona}
          />
        </Sidebar>
        <SidebarInset>
          <ChatInterface activePersona={activePersona} />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
