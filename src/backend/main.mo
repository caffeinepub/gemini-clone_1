import Time "mo:core/Time";
import Int "mo:core/Int";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  type SessionId = Principal;

  type ChatSession = {
    id : SessionId;
    title : Text;
    created : Time.Time;
  };

  module ChatSession {
    public func compare(session1 : ChatSession, session2 : ChatSession) : Order.Order {
      switch (Int.compare(session1.created, session2.created)) {
        case (#equal) {Text.compare(session1.id.toText(), session2.id.toText()) };
        case (order) { order };
      };
    };

    public func compareByTitle(session1 : ChatSession, session2 : ChatSession) : Order.Order {
      Text.compare(session1.title, session2.title);
    };
  };

  type Message = {
    role : { #user; #assistant };
    content : Text;
    timestamp : Time.Time;
  };

  let sessionsMap = Map.empty<SessionId, ChatSession>();
  let messagesMap = Map.empty<SessionId, [Message]>();

  public shared ({ caller }) func createSession(title : Text) : async () {
    if (sessionsMap.containsKey(caller)) { Runtime.trap("Session already exists") };
    let newSession : ChatSession = {
      id = caller;
      title;
      created = Time.now();
    };
    sessionsMap.add(caller, newSession);
    messagesMap.add(caller, []);
  };

  public query ({ caller }) func getAllSessions() : async [ChatSession] {
    sessionsMap.values().toArray().sort();
  };

  public query ({ caller }) func getAllSessionsByTitle() : async [ChatSession] {
    sessionsMap.values().toArray().sort(ChatSession.compareByTitle);
  };

  public query ({ caller }) func getMessages(sessionId : SessionId) : async [Message] {
    if (not sessionsMap.containsKey(sessionId)) { Runtime.trap("Session does not exist") };
    switch (messagesMap.get(sessionId)) {
      case (null) { Runtime.trap("No messages found") };
      case (?messages) { messages };
    };
  };
};
