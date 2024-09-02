# Learn to Read Game Specification

## Overview
"Learn to Read" is an interactive game designed to help children, particularly Lithuanian speakers, improve their reading skills. The game displays words and sounds, uses speech recognition to verify the child's pronunciation, and rewards correct readings with engaging visuals and audio stories.

## Current Development Status

1. Word Display
   - Basic implementation in progress

2. Speech Recognition
   - AssemblyAI's non-streaming API integrated for Lithuanian language support
   - Audio recording and file upload functionality implemented
   - Transcription results displayed on the screen
   - Service selection interface implemented (currently only AssemblyAI)

3. Reward System
   - Not yet implemented

4. Text-to-Speech (TTS)
   - Not yet implemented

5. User Interface
   - Basic structure implemented
   - Needs further styling and child-friendly design

## Technical Implementation

1. Frontend
   - React and TypeScript set up with Vite
   - Basic components created for audio recording and transcription

2. Backend
   - Express.js server implemented for handling API requests
   - CORS enabled for cross-origin requests

3. Speech Recognition
   - AssemblyAI SDK integrated and functional

4. Audio Recording
   - Web Audio API implemented for recording audio
   - AudioRecorder component created

5. State Management
   - Using React's useState for component-level state management

6. Testing
   - Jest configured
   - Basic integration tests for transcription service implemented

7. Development Workflow
   - Concurrent running of frontend and backend servers set up
   - Environment variables used for API key management

## Next Steps

1. Implement the reward system
2. Develop the game flow
3. Enhance the user interface
4. Implement Text-to-Speech functionality
5. Expand test coverage
6. Implement user progress tracking
7. Optimize performance
8. Enhance security
9. Implement localization
10. Set up deployment pipeline

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

## Future Enhancements

1. Multi-language support
2. Customizable word lists and difficulty levels
3. Multiplayer mode
4. Parent/teacher dashboard for progress monitoring
5. Integration with educational standards and curricula

This specification will be regularly updated as the project progresses and new features are implemented or requirements change.