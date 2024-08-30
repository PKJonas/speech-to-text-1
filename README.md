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
- `npm test`: Run the test suite

## Project Structure

- `/src`: Frontend React components and services
- `/server`: Backend Express server
- `/tests`: Test files and audio samples
- `vite.config.ts`: Vite configuration
- `jest.config.js`: Jest configuration for testing

## Development

The `ToolApp` component and `tool.html` file are used for development and testing of the audio recording functionality. These files should not be included in the production build. The audio recording feature will be integrated into the main application for deployment.
