import { createApp } from '../src/app.js';
import { AssemblyAI } from 'assemblyai';

const assemblyAI = new AssemblyAI({ apiKey: process.env.ASSEMBLYAI_API_KEY });
const app = createApp(assemblyAI);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});