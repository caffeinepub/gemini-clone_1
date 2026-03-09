import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ChatSession } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllSessions() {
  const { actor, isFetching } = useActor();
  return useQuery<ChatSession[]>({
    queryKey: ["sessions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSessions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetMessages(sessionId: Principal | null) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["messages", sessionId?.toString()],
    queryFn: async () => {
      if (!actor || !sessionId) return [];
      return actor.getMessages(sessionId);
    },
    enabled: !!actor && !isFetching && !!sessionId,
  });
}

export function useCreateSession() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (title: string) => {
      if (!actor) throw new Error("No actor available");
      await actor.createSession(title);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
}
