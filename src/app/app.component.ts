import { Component } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

import surpriseMePrompts from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'practice';

  loading = false;

  mainForm: FormGroup;
  activeButton = false;
  buttonname = 'Download';

  imageURL = 'https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png';

  constructor(private http: HttpClient) {
    this.mainForm = new FormGroup({
      prompt: new FormControl(''),
    });
  }

  handleSurprise(prompt: string): any {
    const Idx = Math.floor(Math.random() * surpriseMePrompts.length);

    const randomPrompt = surpriseMePrompts[Idx];

    if (randomPrompt === prompt) return this.handleSurprise(prompt);
    this.mainForm.setValue({ prompt: randomPrompt });
    return randomPrompt;
  }

  generateImage(prompt: string) {
    this.loading = true;

    this.http
      .post(
        'https://api.openai.com/v1/images/generations',
        {
          prompt: JSON.stringify(prompt),
          n: 2,
          size: '1024x1024',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer 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',
          },
        }
      )
      .subscribe((res: any) => {
        this.imageURL = res.data[0].url;
        setTimeout(() => {
          this.loading = false;
          this.activeButton = true;
        }, 2500);
      });
  }

  async download(data: any) {
    this.buttonname = 'Downloading...';
    const image = await fetch(this.imageURL);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);
    const link = document.createElement('a');
    link.href = imageURL;
    link.download = this.mainForm.value.prompt;
    document.body.appendChild(link);
    link.click();
    this.buttonname = 'Download';
  }
}
