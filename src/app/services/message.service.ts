import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../models/message';
import { ItemService } from './item.service';
import { ActivityService } from './activity.service';
import storyline from '../../assets/messages';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private subMessages = new Subject<Message[]>();
  private messages: Message[] = [];
  private advanceVisible = true;
  private subAdvanceVisible = new Subject<boolean>();

  constructor(private itemService: ItemService, private activityService: ActivityService) { }

  subscribeMessages() {
    return this.subMessages;
  }

  subscribeAdvance() {
    return this.subAdvanceVisible;
  }

  initializeMessages() {
    const messageSetup = [
      {
        text: 'Welcome to Wobert Idle, Wobert!'
      },
    ];

    messageSetup.forEach(message => {
      this.messages.push(new Message(message.text));
    });
    this.subMessages.next(this.messages);
  }
  getMessages() {
    this.subMessages.next(this.messages);
  }

  getAdvanceVisible() {
    this.subAdvanceVisible.next(this.advanceVisible);
  }

  toggleAdvanceVisible() {
    this.advanceVisible = !this.advanceVisible;
    this.subAdvanceVisible.next(this.advanceVisible);
  }
  toggleAdvanceOn() {
    this.subAdvanceVisible.next(true);
  }
  toggleAdvanceOff() {
    this.subAdvanceVisible.next(false);
  }

  addMessage(message) {
    this.messages.unshift(new Message(message));
    this.subMessages.next(this.messages);
  }

  advanceStoryline() {
    const nextMessage = storyline.shift();
    this.messages.unshift(nextMessage);
    this.subMessages.next(this.messages);

    if (nextMessage.triggerId) {
      this.processTrigger(nextMessage.triggerId);
    }
  }

  processTrigger(triggerId) {
    switch (triggerId) {
      case 1:
        this.activityService.toggleVisible(true, 1);
        this.itemService.toggleVisible(true, 1);
        this.itemService.forceSetAmount(901, 1);
        break;
      case 900:
        this.toggleAdvanceOn();
        break;
      case 901:
        this.advanceStoryline();
        this.processTrigger(900);
        break;
      case 903:
        this.toggleAdvanceOff();
        break;
      case 904:
        this.advanceStoryline();
        this.processTrigger(903);
        break;
      default:
        break;
    }
  }
}
