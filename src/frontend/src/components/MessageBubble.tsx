import type { LocalMessage } from "../types/chat";

interface MessageBubbleProps {
  message: LocalMessage;
  index: number;
}

function formatContent(content: string): React.ReactNode {
  // Split into paragraphs by double newline, and lines by single newline
  // Render bold markers (**text**)
  const renderLine = (line: string, lineKey: string): React.ReactNode => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <span key={lineKey}>
        {parts.map((part, pi) => {
          const partKey = `${lineKey}-${pi}`;
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={partKey} className="font-semibold">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return <span key={partKey}>{part}</span>;
        })}
      </span>
    );
  };

  const lines = content.split("\n");
  return (
    <>
      {lines.map((line, lineIdx) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: text lines from static content — index is stable
        <span key={lineIdx}>
          {renderLine(line, `line-${lineIdx}`)}
          {lineIdx < lines.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

export function MessageBubble({ message, index }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const ocid = `chat.message.item.${index + 1}`;

  if (isUser) {
    return (
      <div data-ocid={ocid} className="flex justify-end message-in">
        <div className="max-w-[75%] rounded-2xl rounded-tr-sm px-4 py-3 bg-primary text-primary-foreground shadow-xs text-sm leading-relaxed">
          {formatContent(message.content)}
        </div>
      </div>
    );
  }

  return (
    <div data-ocid={ocid} className="flex items-start gap-3 message-in">
      {/* Gemini logo */}
      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-teal-400">
        <img
          src="/assets/generated/gemini-logo-transparent.dim_200x200.png"
          alt="Gemini"
          className="w-5 h-5 object-contain"
        />
      </div>

      {/* Assistant bubble */}
      <div className="max-w-[80%] rounded-2xl rounded-tl-sm px-4 py-3 bg-card border border-border shadow-xs text-sm leading-relaxed text-card-foreground">
        {formatContent(message.content)}
      </div>
    </div>
  );
}
