# Learn to Read Game Specification

## Overview
"Learn to Read" is an interactive game designed to help children, particularly Lithuanian speakers, improve their reading skills. The game displays words and sounds, uses speech recognition to verify the child's pronunciation, and rewards correct readings with engaging visuals and audio stories.

## Core Features

1. Word Display
   - Show Lithuanian words on the screen
   - Start with simple words and progress to more complex ones
   - Include a mix of nouns, verbs, and adjectives

2. Speech Recognition
   - Utilize Assembly.ai's streaming STT (Speech-to-Text) service
   - Accurately recognize Lithuanian pronunciations
   - Compare spoken words with displayed words
   - Display real-time transcription at the bottom of the screen
   - Provide an option to enable/disable live closed caption display

3. Reward System
   - Display a relevant, fun image when a word is correctly read
   - Play a short, engaging audio story related to the word
   - Implement a progress tracking system (e.g., stars, points)

4. Text-to-Speech (TTS)
   - Narrate short stories or explanations in Lithuanian
   - Provide audio pronunciation of words for learning support

5. User Interface
   - Clean, child-friendly design
   - Large, clear typography for easy reading
   - Intuitive navigation suitable for young children

## Technical Requirements

1. Frontend
   - React for UI components
   - Vite for build tooling and development server
   - CSS for styling (consider using a UI library like MUI or Chakra UI)

2. Speech Recognition
   - Implement using Assembly.ai's streaming STT service
   - Set up real-time audio streaming from the client to Assembly.ai's API
   - Handle API responses and error cases
   - Create a toggleable live closed caption display component
   - Initially implement with API key directly in the frontend (to be refactored later for security)

3. Audio
   - Use Web Audio API for playing sounds and stories
   - Preload audio files for smooth playback

4. State Management
   - Use React's built-in state management (useState, useContext) for simpler state
   - Consider Redux or MobX for more complex state management if needed

5. Data Storage
   - Store word lists, audio file paths, and image URLs in JSON format
   - Consider using IndexedDB for client-side storage of user progress

6. Deployment
   - Host on Replit for easy development and sharing
   - Consider additional hosting options for production (e.g., Vercel, Netlify)

## Future Enhancements

1. Multi-language Support
   - Add support for other languages, starting with English
   - Implement language selection feature

2. Difficulty Levels
   - Create multiple difficulty levels for different age groups or reading abilities

3. Customization
   - Allow parents or teachers to add custom words, images, and stories

4. Progress Tracking
   - Implement user accounts for long-term progress tracking
   - Provide detailed reports on reading performance

5. Multiplayer Mode
   - Add a competitive or cooperative mode for multiple players

## Initial Development Steps

1. Set up the basic React application structure (Completed)
2. Implement the word display component (Completed)
3. Integrate Assembly.ai's streaming STT service
   - Set up API authentication (API key to be added directly in the frontend initially)
   - Implement audio capture and streaming
   - Handle real-time transcription results
   - Create a live closed caption display component at the bottom of the screen (Completed)
   - Implement a toggle feature for enabling/disabling the live closed caption display (Completed)
4. Implement basic speech recognition functionality
   - Display whatever is being spoken on the screen in real-time
   - Ensure the live closed caption can be easily toggled on/off (Completed)
5. Create the reward system (image display and audio playback)
6. Develop the user interface and game flow
7. Integrate all components and test thoroughly
8. Deploy the initial version and gather feedback for improvements
9. Refactor to move API key to a secure backend (Future task)