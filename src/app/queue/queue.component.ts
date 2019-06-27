import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  private queueSongs = []
  private enqueuedSong: any
  private http: HttpClient
  private readonly baseServerUrl: String = this.getApiIP()

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
  
  getApiIP() {
    const hostname = window.location.hostname
    return hostname === "localhost"
      || hostname === "127.0.0.1"
      || hostname.startsWith("192.") ? "http://192.168.88.164:3288" : "http://2.37.172.53:3288"
  }

  ngOnInit() {
  }

}
