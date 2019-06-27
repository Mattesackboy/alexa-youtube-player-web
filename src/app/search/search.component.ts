import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router"

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup
  queueForm: FormGroup
  success: boolean = true
  private headerText: String = ""
  youtubeResults: Array<Object> = []
  private readonly http: HttpClient
  private readonly baseServerUrl = this.getApiIP()

  constructor(private formBuilder: FormBuilder, http: HttpClient, private router: Router) {
    this.searchForm = formBuilder.group({
      query: ['', Validators.required],
    })
    this.queueForm = formBuilder.group({
      songUrl: ['', Validators.required]
    })
    this.http = http
  }

  onSubmit() {
    if (this.searchForm.invalid) return
    this.success = true
    this.headerText = "Loading..."

    const query = this.searchForm.controls.query.value
    this.getSongs(query).toPromise().then(songs => {
      this.success = true
      this.headerText = ""
      // @ts-ignore
      const data = songs.data
      if (!data) { //Probabilmente il server ha eseguito un add to queue (gli ho passato un url)
        return this.router.navigate(['/'])
      }
      this.youtubeResults = data
    }).catch(err => {
      this.success = false
      this.headerText = "Max Youtube Search Quota Exceeded. Paste a URL instead"
    })
  }

  addSongToQueue(url) {
    this.success = true
    this.headerText = "Adding to Queue..."
    
    return this.http.post(`${this.baseServerUrl}/api/add-song-to-queue`, {
      songUrl: url
    }).toPromise().then(() => {
      this.router.navigate(['/'])
    }).catch(() => {
      this.success = false
      this.headerText = "Something went wrong"
    })
  }

  addToQueue() { //Not working
    return console.log(this.queueForm.controls)
    if (this.queueForm.invalid) return
    return this.http.post('http://192.168.88.164:3288/api/add-song-to-queue', {
      songUrl: this.queueForm.controls.songUrl.value
    }).toPromise().then(() => {
      this.router.navigate(['/'])
    })
  }

  getApiIP() {
    const hostname = window.location.hostname 
    return hostname === "localhost" 
      || hostname === "127.0.0.1" 
      || hostname.startsWith("192.") ? "http://192.168.88.164:3288" : "http://2.37.172.53:3288"
  }
  
  getSongs(query: String) {
    return this.http.post(`${this.baseServerUrl}/api/search`, {
      query: query
    })
  }

  ngOnInit() {
  }

}
