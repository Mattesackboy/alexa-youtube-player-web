import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment' //https://blog.angularindepth.com/becoming-an-angular-environmentalist-45a48f7c20d8

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  private queueSongs = []
  private enqueuedSong: any
  private http: HttpClient
  private readonly baseServerUrl: String = environment.apiBaseUrl

  constructor(http: HttpClient) {
    this.http = http
    this.getCurrentQueue().subscribe(res => {
      //@ts-ignore
      const data = res.data, enqueuedSong = data.enqueuedSong, queue = data.queue
      console.log(data)
      this.enqueuedSong = enqueuedSong
      this.queueSongs = queue
    })
  }

  getCurrentQueue() {
    return this.http.post(`${this.baseServerUrl}/api/get-queue`, {})
  }

  ngOnInit() {
  }

}
