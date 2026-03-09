export function getStaticResponse(message: string): string {
  const lower = message.toLowerCase().trim();

  // Greetings
  if (/\b(hello|hi|hey|howdy|greetings|sup)\b/.test(lower)) {
    return "Hello! I'm Gemini, Google's AI assistant. How can I help you today?";
  }

  // Quantum / physics
  if (/\b(quantum|qubit|superposition|entanglement|physics)\b/.test(lower)) {
    return "Quantum computing uses quantum mechanics principles like superposition and entanglement to process information in ways classical computers cannot. Qubits can exist in multiple states simultaneously, enabling exponentially faster computation for certain problems.";
  }

  // Poem / poetry
  if (/\b(poem|poetry|write a poem|verse|rhyme|stanza)\b/.test(lower)) {
    return "Here's a poem for you:\n\nWaves crash upon the shore,\nWhispers of the deep,\nThe ocean tells its stories,\nIn languages asleep.\n\nSalt and spray and silence,\nHorizon stretching wide,\nIn every wave a secret,\nIn every tide, a guide.";
  }

  // Programming / coding
  if (
    /\b(programming|coding|code|learn to code|developer|software|javascript|python)\b/.test(
      lower,
    )
  ) {
    return "Great choice! Here's how to start learning programming:\n\n1. **Choose a language** - Python is great for beginners\n2. **Use free resources** - freeCodeCamp, Codecademy, Khan Academy\n3. **Build projects** - Apply what you learn immediately\n4. **Join communities** - Stack Overflow, GitHub, Reddit\n5. **Be consistent** - Even 30 minutes daily makes a big difference\n\nStart with the basics and don't rush. Every expert was once a beginner!";
  }

  // Math
  if (
    /\b(math|calculate|equation|algebra|calculus|geometry|arithmetic)\b/.test(
      lower,
    )
  ) {
    return "I can help with math! While I can't compute in real-time, here are some tips:\n\n• For basic calculations, try Google's built-in calculator\n• For algebra, Wolfram Alpha is excellent\n• For learning math concepts, Khan Academy is free and comprehensive\n• Practice regularly — math is a skill that improves with repetition!";
  }

  // Weather
  if (
    /\b(weather|rain|sunny|forecast|temperature|climate|storm)\b/.test(lower)
  ) {
    return "I don't have access to real-time weather data, but you can check:\n\n• **Google Weather** - Just search your city name\n• **Weather.com** for detailed forecasts\n• **AccuWeather** for hourly predictions\n\nStay prepared for any weather! ☀️";
  }

  // Time / date
  if (/\b(time|date|today|now|current time|what day)\b/.test(lower)) {
    return "I don't have access to real-time data, but your device shows the current time and date. You can also ask Google Assistant for the exact time in any timezone!";
  }

  // Jokes
  if (/\b(joke|funny|laugh|humor|pun|hilarious)\b/.test(lower)) {
    return "Why do programmers prefer dark mode? Because light attracts bugs! 😄\n\nHope that made you smile! Ask me anything else.";
  }

  // Help / what can you do
  if (
    /\b(help|what can you do|capabilities|features|assist|support)\b/.test(
      lower,
    )
  ) {
    return "I can help you with lots of things:\n\n• **Answer questions** on a wide range of topics\n• **Write content** - emails, essays, poems, stories\n• **Explain concepts** in simple terms\n• **Coding help** - debug, explain, or write code\n• **Brainstorm ideas** for projects or problems\n• **Summarize information** quickly\n\nJust type what's on your mind!";
  }

  // Default fallback
  return "That's an interesting question! While I'm running on pre-written responses in this demo, a real Gemini integration could provide a detailed, personalized answer. Try asking about coding, writing, math, weather, or general knowledge topics!";
}
