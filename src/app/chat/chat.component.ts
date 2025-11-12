import { Component, ViewChild, ElementRef, AfterViewChecked, OnDestroy } from '@angular/core';
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
export class ChatComponent implements AfterViewChecked, OnDestroy {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  @ViewChild('chatInput') private chatInput!: ElementRef;
  
  messages: Message[] = [];
  userInput = '';
  isLoading = false;
  selectedPersonality = 'friendly';
  private apiUrl = 'https://chatbot-api-server.onrender.com/api/chat';
  private shouldScrollToBottom = false;
  private initialViewportHeight = window.innerHeight;

  personalities = [
    { value: 'polite', label: '🎩 Polite', description: 'Professional & Respectful' },
    { value: 'friendly', label: '😊 Friendly', description: 'Warm & Casual' },
    { value: 'energetic', label: '⚡ Energetic', description: 'Enthusiastic & Excited' },
    { value: 'mirror', label: '🪞 Mirror', description: 'Matches Your Energy' },
    { value: 'sarcastic', label: '😏 Sarcastic', description: 'Witty & Playful' },
    { value: 'professional', label: '💼 Professional', description: 'Business Focused' }
  ];

  constructor(private http: HttpClient) {
    // Listen for viewport resize to handle keyboard show/hide
    if (typeof window !== 'undefined') {
      window.visualViewport?.addEventListener('resize', this.handleViewportResize.bind(this));
      window.addEventListener('resize', this.handleWindowResize.bind(this));
    }
  }

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  ngOnDestroy() {
    // Clean up event listeners
    if (typeof window !== 'undefined') {
      window.visualViewport?.removeEventListener('resize', this.handleViewportResize.bind(this));
      window.removeEventListener('resize', this.handleWindowResize.bind(this));
    }
  }

  private handleViewportResize(): void {
    // Force a repaint when keyboard opens/closes
    if (window.visualViewport) {
      const currentHeight = window.visualViewport.height;
      // Keyboard is closing if viewport height increases significantly
      if (currentHeight > this.initialViewportHeight * 0.9) {
        // Scroll to top briefly to force layout recalculation
        window.scrollTo(0, 0);
        // Small timeout to ensure the layout settles
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);
      }
    }
  }

  private handleWindowResize(): void {
    // Update initial height when window resizes (orientation change, etc.)
    setTimeout(() => {
      this.initialViewportHeight = window.innerHeight;
      window.scrollTo(0, 0);
    }, 300);
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        const element = this.messagesContainer.nativeElement;
        element.scrollTo({
          top: element.scrollHeight,
          behavior: 'smooth'
        });
      }
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }

  async sendMessage() {
    if (!this.userInput.trim() || this.isLoading) return;

    const userMessage = this.userInput.trim();
    this.messages.push({ from: 'user', text: userMessage });
    this.userInput = '';
    this.isLoading = true;
    this.shouldScrollToBottom = true;

    try {
      const response: any = await firstValueFrom(
        this.http.post(this.apiUrl, { 
          message: userMessage,
          personality: this.selectedPersonality 
        })
      );
      
      this.messages.push({ from: 'bot', text: response.reply });
      this.shouldScrollToBottom = true;
    } catch (error: any) {
      console.error('Error:', error);
      this.messages.push({ 
        from: 'bot', 
        text: 'Sorry, I encountered an error. Please make sure the backend server is running.' 
      });
      this.shouldScrollToBottom = true;
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
      this.shouldScrollToBottom = true;
    }
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();
      // Blur the input to close the keyboard
      if (this.chatInput?.nativeElement) {
        this.chatInput.nativeElement.blur();
      }
      this.sendMessage();
      // Force viewport reset after a short delay
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
  }

  onInputBlur(): void {
    // When input loses focus (keyboard closes), reset viewport
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }
}
