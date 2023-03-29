import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewChecked {

  socket = io('https://socket-angular-chat-server.onrender.com');
  // socket = io('http://localhost:3000');
  messages: Message[] = [];
  username!: string;

  form = new FormGroup({
    message: new FormControl('')
  });

  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  constructor() {}

  ngOnInit(): void {

    this.scrollToBottom();

    this.username = localStorage.getItem('username') || '';

    this.socket.on('initial_messages', (data: Message[]) => {
      this.messages = data;
    });

    this.socket.on('update_messages', (data: Message) => {
      this.messages.push(data);
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  submit() {
    if(this.form.controls.message.value!.length > 0) {
      this.socket.emit('new_message', {username: this.username, message: this.form.value.message});
      this.form.controls.message.setValue('');
    }

  }

  onKeydown(event: any) {
    if (event.key === "Enter") {
      this.submit();
    }
  }


  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
}

export interface Message {
  username: string;
  message: string;
}

