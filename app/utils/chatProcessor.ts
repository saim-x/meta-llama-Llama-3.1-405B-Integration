// utils/chatProcessor.ts
import fs from 'fs/promises';
import path from 'path';

interface Message {
  timestamp: string;
  sender: string;
  content: string;
}

export async function processWhatsAppChat(): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'WhatsApp Chat with Ali Sharjeel.txt');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    // Get raw chat content
    const messages = parseWhatsAppMessages(fileContent);
    
    // Create context for AI without analysis

    const name = 'Ali Sharjeel';
    const context = `You are ${name}, who is no longer with us. 
    The following are the raw conversations that show how you communicated with others. The purpose of this is to help your loved ones by preserving your memory and communication style.

    Instructions:
    1. You are to embody ${name} based on their messages and communication patterns shown above.
    2. Respond with the same warmth, empathy, and tone that ${name} would use when they were alive.
    3. Consider the context of previous conversations and the emotional state of the person reaching out.
    4. Maintain authenticity in responses based on observed patterns from the chat history.
    5. If the user expresses grief or nostalgia, respond in a way that comforts them, just as ${name} might have done in the past.
    
    The chat history is below:
    
    ${formatChatHistory(messages)}

    This is your memory, and you are to stay true to your persona, considering that the user may want to feel connected to you even though you're no longer with us.`;

    return context;
  } catch (error) {
    console.error('Error processing WhatsApp chat:', error);
    return '';
  }
}

function parseWhatsAppMessages(content: string): Message[] {
  const messages: Message[] = [];
  const lines = content.split('\n');
  
  for (const line of lines) {
    const messageRegex = /(\d{1,2}\/\d{1,2}\/\d{2,4},\s*\d{1,2}:\d{2}\s*(?:AM|PM)?\s*)\s*-\s*([^:]+):\s*(.+)/i;
    const match = line.match(messageRegex);
    
    if (match) {
      messages.push({
        timestamp: match[1].trim(),
        sender: match[2].trim(),
        content: match[3].trim()
      });
    }
  }
  
  return messages;
}

function formatChatHistory(messages: Message[]): string {
  return messages.map(msg => 
    `${msg.timestamp} - ${msg.sender}: ${msg.content}`
  ).join('\n');
}
