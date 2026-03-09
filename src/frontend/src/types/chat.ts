export interface LocalMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: number;
}

export interface LocalSession {
  id: string;
  title: string;
  created: number;
  messages: LocalMessage[];
}
