import {Component, OnInit} from '@angular/core';
import {AjaxService} from "./ajax.service";

import * as moment from 'moment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  messages: any = []

  constructor(
    private AjaxService: AjaxService,
  ) {
  }

  async ngOnInit() {
    const ajax: any = await this.AjaxService.GetData()

    this.ParseMessage(ajax.data)

    // Checking expiration message every 1s
    setInterval(() => {
      this.messages.forEach((msg, msg_key) => {
        const msg_date = moment(msg.expiration, 'DD-MM-YYYY h:mm:ss')
        const now = moment()

        const expired = msg_date.diff(now)


        if (expired > 0) return
        this.messages.splice(msg_key, 1)
      })
    }, 0)
  }

  ParseMessage(messages, flush = true) {
    messages.map(msg => {
      if (msg.message.indexOf('data:image') > -1) msg.message = `<img src="${msg.message}" height="100" height="auto">`
      msg.expiration = moment(msg.expiration, 'DD-MM-YYYY h:mm:ss')
    })

    if (flush) return this.messages = messages
    this.messages.push(...messages)
  }

  AddSampleData() {
    this.ParseMessage([{
      name: 'Sample',
      message: 'this message will deleted in 5 seconds',
      expiration: moment().add(5, 's').format('DD-MM-YYYY h:mm:ss')
    }], false)
  }
}
