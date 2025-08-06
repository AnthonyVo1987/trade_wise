# TradeWise AI

TradeWise AI is an intelligent application designed to provide users with real-time stock and options market analysis and insights through a conversational AI interface. Leveraging the power of AI and real-time web search, TradeWise AI aims to help users make informed decisions by providing up-to-date information and expert-like analysis from specialized AI personas.

## Technologies Used

*   **Next.js:** The React framework for building the web application.
*   **React:** The JavaScript library for building the user interface.
*   **TypeScript:** A strongly typed superset of JavaScript for improved code quality and maintainability.
*   **Tailwind CSS:** A utility-first CSS framework for rapid styling.
*   **Google Genkit:** A framework for building AI applications.

## Setup and Installation

## Core Features:
- AI Chat Interface: AI-powered chat interface for users to discuss and analyze stocks and options.
- Real-Time Web Search Mandate: Implement a tool that mandates web searches for every user request to ensure up-to-date market data and sentiment analysis. Ground all AI responses based on the latest current real-world date and time.
- AI Persona Specialization: AI roles including a Market News Reporter for the latest news, an AI Market Reporter for AI trends, Options Trading Expert, and Stock Trading Expert. Enforce prompt constraints so these specialized AI personas decide when and if to incorporate searched content in its analysis and repsonse.
- Data Visualization: Display stock and options data and AI analysis in clear, readable formats within the chat interface.
- Chat Input: Simple input method to take the User requests, may use voice input as a secondary function

## Detailed Design and Architecture Overview

To set up and run the TradeWise AI project locally, follow these steps:

1.  **Clone the repository:**


Based on the codebase analysis, TradeWise AI follows a modern web application architecture, likely a server-rendered React application using the Next.js framework. The core functionality revolves around an AI-powered chat interface for stock and options analysis, emphasizing real-time data through mandatory web searches.

**Overall Architecture:**

- **Next.js Framework:** Provides the foundation for routing, server-side rendering, API routes, etc.
- **React Components:** The UI is built with reusable React components.
- **AI Logic (Genkit):** Google's Genkit framework orchestrates AI flows and model interactions.

**Key Components and their Roles:**

- **`src/components/chat`:** Houses components specifically for the chat interface (layout, messages, persona forms).
- **`src/components/ui`:** A collection of reusable, potentially styled UI components forming the building blocks of the UI.
- **`src/ai`:** Contains core AI functionality, including Genkit setup (`genkit.ts`) and different AI flows (`src/ai/flows`).
- **`src/app/actions.ts`:** Likely contains server-side actions or API routes for front-end/back-end communication.
- **`src/lib`:** Houses utility functions and type definitions.
- **`src/hooks`:** Contains custom React hooks for managing component logic.
- **Styling Files (`src/app/globals.css`, `tailwind.config.ts`, `postcss.config.mjs`):** Configures and applies styling using Tailwind CSS.
- **Configuration Files (Root Directory):** Configures the project (dependencies, TypeScript, Next.js, deployment).
- **`docs/blueprint.md`:** Contains project documentation and guidelines.

**Critical Code and Data Path Flows:**

**1. User Request to AI Response Flow (Main Flow):**

- **Code Flow:** User input (chat) -> Front-end event -> API call (`src/app/actions.ts`) -> Back-end receives request -> Genkit orchestrates AI flow (`src/ai/genkit.ts`, `src/ai/flows`) -> Web search tool call -> AI model processes data -> AI generates response -> Back-end sends response -> Front-end receives response -> UI updates (`src/components/chat`).
- **Data Path Flow:** User input (text) -> HTTP request (user input, persona) -> Server-side processing -> Genkit input -> AI flow execution -> Tool call parameters (search query) -> External web search API -> Search results (text/data) -> AI flow receives results -> Data to AI model (input, tool results, prompt) -> AI model output (text response) -> AI flow returns response -> HTTP response (AI response) -> Client-side UI update.

**2. AI Flow Execution (Sub-flow):**

- **Code Flow:** Genkit invokes AI flow (`src/ai/flows`) -> Flow receives input -> Executes steps (tool calls, model calls, processing) -> Returns output.
- **Data Path Flow:** Input data to flow -> Flow processing -> Data to tool calls -> Data from tool calls -> Data to AI model -> AI model output -> Flow processing -> Final output data.

**3. Web Search Tool Call Flow (Sub-flow):**

- **Code Flow:** AI flow executes web search tool call -> Web search function invoked (with query) -> Interacts with external web search API -> API returns results -> Function processes results -> Returns to AI flow.
- **Data Path Flow:** Search query from AI flow -> Data to web search tool -> Query to external API -> Results from external API -> Data to web search tool -> Processed results back to AI flow.

**Architectural Patterns and Considerations:**

- Component-Based UI, API-Driven Communication, AI Orchestration (Genkit), Real-Time Data Integration, Persona-Based AI.

**Potential Areas for Further Development:**

- Database integration, Authentication/Authorization, Detailed Error Handling/Logging, Scalability/Performance Optimization, Enhanced Security, Code Quality/Testing, AI Model Management.

## Style Guidelines:

- Primary color: Deep Blue (#1A237E) to evoke trust, stability, and intelligence in financial analysis.
- Background color: Light gray (#F5F5F5), providing a clean and modern backdrop for content display.
- Accent color: Yellow-Gold (#FFB300) to highlight key data points and actionable insights, creating emphasis.
- Body font: 'Inter', a grotesque-style sans-serif with a modern, machined, objective, neutral look; use 'Inter' for body text and headlines.



###

# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.
