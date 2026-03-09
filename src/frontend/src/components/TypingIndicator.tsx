export function TypingIndicator() {
  return (
    <div
      data-ocid="chat.loading_state"
      className="flex items-start gap-3 message-in"
    >
      {/* Gemini logo small */}
      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-teal-400">
        <img
          src="/assets/generated/gemini-logo-transparent.dim_200x200.png"
          alt="Gemini"
          className="w-5 h-5 object-contain"
        />
      </div>

      {/* Typing bubble */}
      <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-card border border-border shadow-xs">
        <div className="flex items-center gap-1.5 h-5">
          <span className="typing-dot w-2 h-2 rounded-full bg-muted-foreground inline-block" />
          <span className="typing-dot w-2 h-2 rounded-full bg-muted-foreground inline-block" />
          <span className="typing-dot w-2 h-2 rounded-full bg-muted-foreground inline-block" />
        </div>
      </div>
    </div>
  );
}
