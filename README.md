# Learn to Read Game

## Overview

"Learn to Read" is an interactive game designed to help children, particularly Lithuanian speakers, improve their reading skills. The game displays words and sounds, uses speech recognition to verify the child's pronunciation, and rewards correct readings with engaging visuals and audio stories.

This project uses React for the frontend, Express for the backend, and integrates with AssemblyAI for speech recognition.

## Features

- Word display with progressive difficulty
- Speech recognition for Lithuanian language
- Audio recording and playback
- Reward system for correct pronunciations
- Text-to-Speech for word pronunciation and stories

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (create a `.env` file with your AssemblyAI API key)

## Available Commands

- `npm run dev`: Start both frontend and backend development servers concurrently
- `npm run dev:frontend`: Start only the frontend development server
- `npm run dev:backend`: Start only the backend server
- `npm run dev:tool`: Start the development server for the audio recording tool
- `npm test`: Run the test suite

## Development Tools

- `npm run dev:tool`: This command starts a development server for an audio recording tool. Use this to create test audio files for the game. Access the tool at `http://localhost:5173/tool.html` when running this command.

## Project Structure

- `/src`: Frontend React components and services
- `/server`: Backend Express server
- `/tests`: Test files and audio samples
- `vite.config.ts`: Vite configuration
- `jest.config.js`: Jest configuration for testing
