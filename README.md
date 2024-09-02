# Learn to Read Game

## Overview

"Learn to Read" is an interactive game designed to help children, particularly Lithuanian speakers, improve their reading skills. The game displays words and sounds, uses speech recognition to verify the child's pronunciation, and rewards correct readings with engaging visuals and audio stories.

## Current Development Status

- Basic project structure set up with React, TypeScript, and Express
- AssemblyAI integration for speech recognition implemented
- Audio recording functionality working
- Basic transcription display implemented
- Development environment configured with concurrent frontend and backend servers

## Upcoming Features

- Word display with progressive difficulty
- Reward system for correct pronunciations
- Text-to-Speech for word pronunciation and stories
- Enhanced user interface design
- User progress tracking

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (create a `.env` file with your AssemblyAI API key)

## Available Commands

- `npm run dev`: Start both frontend and backend development servers concurrently
- `npm run dev:frontend`: Start only the frontend development server
- `npm run dev:backend`: Start only the backend server
- `npm test`: Run the test suite

## Project Structure

- `/src`: Frontend React components and services
- `/server`: Backend Express server
- `/tests`: Test files and audio samples
- `vite.config.ts`: Vite configuration
- `jest.config.js`: Jest configuration for testing

## Development

The project is currently in active development. The `ToolApp` component and `tool.html` file are used for development and testing of the audio recording functionality. These files will not be included in the production build.

## Next Steps

1. Implement the core game logic
2. Enhance the user interface for a child-friendly experience
3. Integrate the reward system
4. Implement Text-to-Speech functionality
5. Expand test coverage
6. Set up deployment pipeline

For more detailed information on the project's specifications and future plans, please refer to the `learn_to_read_spec.md` file in the `md` directory.
