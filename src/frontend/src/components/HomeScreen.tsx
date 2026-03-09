import { BookOpen, Code2, FileText, Lightbulb } from "lucide-react";
import { motion } from "motion/react";

const SUGGESTED_PROMPTS = [
  {
    id: "capabilities",
    icon: <Lightbulb size={18} />,
    title: "What can you help me with?",
    subtitle: "Discover Gemini's capabilities",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "quantum",
    icon: <BookOpen size={18} />,
    title: "Explain quantum computing simply",
    subtitle: "Science made accessible",
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: "poem",
    icon: <FileText size={18} />,
    title: "Write a poem about the ocean",
    subtitle: "Creative writing assistance",
    color: "from-teal-500 to-cyan-500",
  },
  {
    id: "programming",
    icon: <Code2 size={18} />,
    title: "How do I learn programming?",
    subtitle: "Step-by-step guidance",
    color: "from-purple-500 to-violet-500",
  },
];

interface HomeScreenProps {
  onPromptSelect: (prompt: string) => void;
}

export function HomeScreen({ onPromptSelect }: HomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 overflow-y-auto custom-scrollbar">
      <div className="max-w-2xl w-full space-y-10">
        {/* Greeting */}
        <motion.div
          className="text-center space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-teal-400 p-0.5 shadow-lg">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <img
                  src="/assets/generated/gemini-logo-transparent.dim_200x200.png"
                  alt="Gemini"
                  className="w-10 h-10 object-contain"
                />
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-display font-semibold tracking-tight">
            <span className="text-foreground">Hello, </span>
            <span className="gemini-gradient-text">there</span>
          </h1>
          <p className="text-lg text-muted-foreground font-light">
            How can I help you today?
          </p>
        </motion.div>

        {/* Suggested prompts */}
        <motion.div
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        >
          {SUGGESTED_PROMPTS.map((prompt, i) => (
            <motion.button
              type="button"
              key={prompt.id}
              data-ocid={`home.prompt.item.${i + 1}`}
              onClick={() => onPromptSelect(prompt.title)}
              className="prompt-card text-left rounded-2xl p-4 bg-card cursor-pointer group"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: 0.2 + i * 0.07,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex flex-col gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br ${prompt.color} text-white shadow-sm`}
                >
                  {prompt.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground leading-snug group-hover:text-foreground transition-colors">
                    {prompt.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {prompt.subtitle}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Caffeine attribution */}
        <motion.p
          className="text-center text-xs text-muted-foreground/50 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          © {new Date().getFullYear()}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-muted-foreground transition-colors"
          >
            caffeine.ai
          </a>
        </motion.p>
      </div>
    </div>
  );
}
