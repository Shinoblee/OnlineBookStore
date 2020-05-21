import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  searchBooks(keyword: String) {
    this.router.navigateByUrl(`/search/${keyword}`);
  }
}
