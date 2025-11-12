import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface Message {
  from: string;
  text: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: Message[] = [];
  userInput = '';
  isLoading = false;
  selectedPersonality = 'friendly';
  private apiUrl = 'https://chatbot-api-server.onrender.com/api/chat';

  personalities = [
    { value: 'polite', label: '🎩 Polite', description: 'Professional & Respectful' },
    { value: 'friendly', label: '😊 Friendly', description: 'Warm & Casual' },
    { value: 'energetic', label: '⚡ Energetic', description: 'Enthusiastic & Excited' },
    { value: 'mirror', label: '🪞 Mirror', description: 'Matches Your Energy' },
    { value: 'sarcastic', label: '😏 Sarcastic', description: 'Witty & Playful' },
    { value: 'professional', label: '💼 Professional', description: 'Business Focused' }
  ];

  constructor(private http: HttpClient) {}

  async sendMessage() {
    if (!this.userInput.trim() || this.isLoading) return;

    const userMessage = this.userInput.trim();
    this.messages.push({ from: 'user', text: userMessage });
    this.userInput = '';
    this.isLoading = true;

    try {
      const response: any = await firstValueFrom(
        this.http.post(this.apiUrl, { 
          message: userMessage,
          personality: this.selectedPersonality 
        })
      );
      
      this.messages.push({ from: 'bot', text: response.reply });
    } catch (error: any) {
      console.error('Error:', error);
      this.messages.push({ 
        from: 'bot', 
        text: 'Sorry, I encountered an error. Please make sure the backend server is running.' 
      });
    } finally {
      this.isLoading = false;
    }
  }

  onPersonalityChange() {
    // Add a notification when personality changes
    const personality = this.personalities.find(p => p.value === this.selectedPersonality);
    if (this.messages.length > 0 && personality) {
      this.messages.push({ 
        from: 'system', 
        text: `✨ Switched to ${personality.label} mode` 
      });
    }
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
