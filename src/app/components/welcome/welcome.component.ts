import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  public messages = [
    'As an almighty DEMIGOD, you have the power to CONTROL THE MINDS OF HUMANS!',
    'Er... human... singular.',
    'You can control the mind of just a single human.',
    'But you can make him do ANYTHING YOU WANT!',
    'Haha!  Just kidding!  You are only a Level 0 Demigod.',
    'Which means you can only make your human do a single thing at a time.',
    'And he won\'t be very good at it:',
    '- He\'ll keep trying to do it even after reaching the maximum limit',
    '- He\'ll have to be forced to stop one activity before he can start another',
    'But every time you force a human to do your will you will gain Mind Control Powers!',
    'Gain enough powers, and you\'ll be able to increase your rank!',
    'Now get out there and impose your will on your mindless human slave!',
    'Select \'Play\' from the top menu.'
  ];
  public nextMessage = this.messages.shift();
  public oldMessages = [];

  constructor() { }

  ngOnInit(): void {
  }

  displayNext() {
    this.oldMessages.unshift(this.nextMessage);
    this.nextMessage = this.messages.shift();
  }

}
