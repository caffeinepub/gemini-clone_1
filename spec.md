# Gemini Clone

## Current State
New project with no existing code.

## Requested Changes (Diff)

### Add
- Full Gemini-inspired chat interface with dark/light mode toggle
- Sidebar with chat history list (static entries) and new chat button
- Home screen with welcome message and suggested prompt cards
- Chat message area with user and AI message bubbles
- Animated typing indicator (dots animation) while "AI" is responding
- Stylish bottom message input box with send button and keyboard shortcut support
- Static/pre-written responses mapped to common question topics
- Smooth animations for message appearance and transitions
- Google-inspired color palette and typography (Inter/Google Sans style)

### Modify
- Nothing (new project)

### Remove
- Nothing (new project)

## Implementation Plan
1. Backend: Store chat sessions and messages with static response logic
2. Frontend: 
   - App layout with collapsible sidebar and main chat area
   - Dark/light mode state with toggle button
   - Home screen with Gemini-style greeting and prompt suggestion cards
   - Chat message thread with user/AI bubble distinction
   - Typing indicator component with animated dots
   - Bottom input bar with textarea (auto-resize), send button, keyboard shortcuts
   - Chat history sidebar with session list
   - Static response map covering: greetings, coding, writing, math, general knowledge, weather, time
