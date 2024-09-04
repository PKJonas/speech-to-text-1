# OpenAI Speech-to-Text Integration Spec

## Objective
Add OpenAI's Whisper speech-to-text functionality as an alternative to AssemblyAI in our transcription service.

## Steps

1. Update TranscriptionServiceFactory
   - Add 'OpenAI' as a new ServiceType
   - Implement creation of OpenAIService in the factory

2. Create OpenAIService
   - Implement TranscriptionService interface
   - Use OpenAI's API for speech-to-text conversion
   - Handle audio file conversion if necessary (OpenAI accepts various formats)

3. Update environment variables
   - Add OPENAI_API_KEY to .env file

4. Update tests
   - Add OpenAI service to the list of services in transcription.test.js
   - Ensure all test cases work with the new service

5. Update MicrophoneTranscription component
   - Allow selection of transcription service (AssemblyAI or OpenAI)

6. Update App component
   - Add UI for selecting transcription service

## Implementation Details

### OpenAIService

- Use the OpenAI API client library
- Implement the `transcribe` method:
  - Convert audio buffer to a suitable format if necessary
  - Call OpenAI's transcription API
  - Return the transcribed text

### Error Handling

- Implement proper error handling for API calls
- Provide meaningful error messages for debugging

### Performance Considerations

- Consider implementing caching or rate limiting if necessary

## Testing

- Unit tests for OpenAIService
- Integration tests with actual API calls (using test audio files)
- Update existing tests to ensure compatibility with both services