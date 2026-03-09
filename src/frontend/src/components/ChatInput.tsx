import { Button } from "@/components/ui/button";
import { ArrowUp, ImageIcon, Mic } from "lucide-react";
import { type KeyboardEvent, useRef, useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, disabled, placeholder }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  };

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div className="px-4 pb-4 pt-2">
      <div className="max-w-3xl mx-auto">
        <div className="gemini-input-gradient rounded-2xl shadow-sm">
          <div className="flex items-end gap-2 px-4 py-3">
            {/* Textarea */}
            <textarea
              ref={textareaRef}
              data-ocid="chat.input"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                handleInput();
              }}
              onKeyDown={handleKeyDown}
              placeholder={placeholder ?? "Ask Gemini..."}
              rows={1}
              disabled={disabled}
              className="flex-1 resize-none bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm leading-relaxed min-h-[24px] max-h-[160px] overflow-y-auto custom-scrollbar disabled:opacity-50"
              style={{ height: "24px" }}
            />

            {/* Action buttons */}
            <div className="flex items-center gap-1 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-muted-foreground hover:text-foreground"
                type="button"
              >
                <ImageIcon size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-muted-foreground hover:text-foreground"
                type="button"
              >
                <Mic size={16} />
              </Button>

              {/* Send button */}
              <Button
                data-ocid="chat.send_button"
                onClick={handleSend}
                disabled={!canSend}
                size="icon"
                className="w-8 h-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-30 disabled:bg-muted disabled:text-muted-foreground transition-all"
                type="button"
              >
                <ArrowUp size={16} />
              </Button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-2 px-4">
          Gemini may display inaccurate info. This is a demo with pre-written
          responses.
        </p>
      </div>
    </div>
  );
}
