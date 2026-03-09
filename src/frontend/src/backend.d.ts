import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Message {
    content: string;
    role: Variant_user_assistant;
    timestamp: Time;
}
export type SessionId = Principal;
export type Time = bigint;
export interface ChatSession {
    id: SessionId;
    title: string;
    created: Time;
}
export enum Variant_user_assistant {
    user = "user",
    assistant = "assistant"
}
export interface backendInterface {
    createSession(title: string): Promise<void>;
    getAllSessions(): Promise<Array<ChatSession>>;
    getAllSessionsByTitle(): Promise<Array<ChatSession>>;
    getMessages(sessionId: SessionId): Promise<Array<Message>>;
}
