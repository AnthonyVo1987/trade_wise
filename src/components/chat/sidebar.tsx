import React from "react";
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Rocket,
  LayoutDashboard,
  TrendingUp,
  CircleDollarSign,
  Newspaper,
} from "lucide-react";
import type { Persona } from "@/lib/types";

interface ChatSidebarProps {
  activePersona: Persona;
  setActivePersona: (persona: Persona) => void;
}

const personas: { id: Persona; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "stock-analysis", label: "Stock Analysis", icon: TrendingUp },
  { id: "option-strategy", label: "Options Strategy", icon: CircleDollarSign },
  { id: "market-news", label: "Market News", icon: Newspaper },
];

export default function ChatSidebar({
  activePersona,
  setActivePersona,
}: ChatSidebarProps) {
  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg">
            <Rocket className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-semibold text-primary">TradeWise AI</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {personas.map((persona) => (
            <SidebarMenuItem key={persona.id}>
              <SidebarMenuButton
                onClick={() => setActivePersona(persona.id)}
                isActive={activePersona === persona.id}
                tooltip={{ children: persona.label }}
                className="justify-start"
              >
                <persona.icon />
                <span className="group-data-[collapsible=icon]:hidden">
                  {persona.label}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
