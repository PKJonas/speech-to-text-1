# Learn to Read Game Specification

## Overview
"Learn to Read" is an interactive game designed to help children, particularly Lithuanian speakers, improve their reading skills. The game displays words and sounds, uses speech recognition to verify the child's pronunciation, and rewards correct readings with engaging visuals and audio stories.

## Core Features

1. Word Display
   - Show English words on the screen (initially)
   - Start with simple words and progress to more complex ones
   - Include a mix of nouns, verbs, and adjectives

2. Speech Recognition
   - Utilize AssemblyAI's non-streaming API for Lithuanian language support
   - Allow users to record audio for transcription
   - Accurately recognize Lithuanian pronunciations
   - Compare transcribed words with displayed words
   - Display transcription results on the screen
   - Provide an option to enable/disable transcription display

3. Reward System (To be implemented)
   - Display a relevant, fun image when a word is correctly read
   - Play a short, engaging audio story related to the word
   - Implement a progress tracking system (e.g., stars, points)

4. Text-to-Speech (TTS) (To be implemented)
   - Narrate short stories or explanations in Lithuanian
   - Provide audio pronunciation of words for learning support

5. User Interface
   - Clean, child-friendly design (in progress)
   - Large, clear typography for easy reading
   - Intuitive navigation suitable for young children

## Technical Implementation

1. Frontend
   - React for UI components
   - Vite for build tooling and development server
   - TypeScript for type-safe code
   - CSS for styling (consider using a UI library like MUI or Chakra UI in the future)

2. Backend
   - Express.js server for handling API requests
   - Multer for file upload handling
   - CORS enabled for cross-origin requests

3. Speech Recognition
   - AssemblyAI SDK integrated for transcription
   - File upload functionality implemented
   - Transcription results handled and displayed
   - Service selection interface implemented (currently only AssemblyAI)

4. Audio Recording
   - Web Audio API used for recording audio
   - AudioRecorder component created for managing recording state and blob creation

5. State Management
   - React's useState for component-level state management
   - Consider using useContext or Redux for more complex state management in the future

6. Testing
   - Jest configured for running tests
   - Integration tests set up for transcription service

7. Development Workflow
   - Concurrent running of frontend and backend servers
   - Environment variables used for API key management

## Current Project Structure

- `/src`
  - `/components`
    - `AudioRecorder.tsx`
    - `MicrophoneTranscription.tsx`
    - `TestCaseRecorder.tsx`
  - `/services`
    - `TranscriptionService.ts`
- `/server`
  - `server.js`
- `/tests`
  - `transcription.test.js`
  - `/test-audio` (to be added)
- `vite.config.ts`
- `jest.config.js`
- `package.json`

## Next Steps

1. Implement the reward system
   - Create components for displaying images and playing audio
   - Implement logic for tracking correct readings

2. Develop the game flow
   - Create a word list and progression system
   - Implement UI for word display and user interaction

3. Enhance the user interface
   - Improve the overall design for a child-friendly experience
   - Implement responsive design for various device sizes

4. Implement Text-to-Speech functionality
   - Integrate a TTS service for Lithuanian language
   - Create audio playback components

5. Expand test coverage
   - Add unit tests for React components
   - Increase integration test scenarios

6. Implement user progress tracking
   - Set up local storage or database for storing user progress
   - Create UI for displaying user achievements and progress

7. Optimize performance
   - Implement lazy loading for components and assets
   - Optimize API calls and state management

8. Security enhancements
   - Move API key handling to a secure backend service
   - Implement proper error handling and input validation

9. Localization
   - Implement a system for managing translations
   - Create Lithuanian language version of the UI

10. Deployment
    - Set up CI/CD pipeline
    - Deploy to a production environment (e.g., Vercel, Netlify)

## Future Enhancements

1. Multi-language support
2. Customizable word lists and difficulty levels
3. Multiplayer mode
4. Parent/teacher dashboard for progress monitoring
5. Integration with educational standards and curricula

This specification will be regularly updated as the project progresses and new features are implemented or requirements change.