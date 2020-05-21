import { Component, OnInit } from "@angular/core";
import { Book } from "../../common/book";
import { BookService } from "src/app/services/book.service";
import { ActivatedRoute } from "@angular/router";
import { NgbPaginationConfig } from "@ng-bootstrap/ng-bootstrap";
import { CartService } from "src/app/services/cart.service";
import { CartItem } from "src/app/common/cart-item";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "book-list",
  // templateUrl: "./book-list.component.html",
  templateUrl: "./book-grid.component.html",
  styleUrls: ["./book-list.component.css"],
})
export class BookListComponent implements OnInit {
  constructor(
    private bookService: BookService,
    private activedRoute: ActivatedRoute,
    private cartService: CartService,
    private config: NgbPaginationConfig,
    private spinnerSerivce: NgxSpinnerService
  ) {
    config.maxSize = 3;
    config.boundaryLinks = true;
  }

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe(() => {
      this.listBooks();
    });
  }

  currentCategoryId: number = 1;
  books: Book[] = [];
  searchMode: boolean = false;
  previousCategory: number = 1;

  //new properties for server side paging
  currentPage: number = 1;
  pageSize: number = 5;
  totalRecords: number = 0;

  listBooks() {
    //Starts the spinner loader
    // this.spinnerSerivce.show();

    this.searchMode = this.activedRoute.snapshot.paramMap.has("keyword");

    if (this.searchMode) {
      this.handleSearchBooks();
    } else {
      this.handleListBooks();
    }
  }

  handleListBooks() {
    const hasCategoryid: boolean = this.activedRoute.snapshot.paramMap.has(
      "id"
    );

    if (hasCategoryid) {
      this.currentCategoryId = +this.activedRoute.snapshot.paramMap.get("id");
    } else {
      this.currentCategoryId = 1;
    }

    //setting up the current page to 1
    //if user navigates to another category
    if (this.previousCategory != this.currentCategoryId) {
      this.currentPage = 1;
    }

    this.previousCategory = this.currentCategoryId;

    this.bookService
      .getBooks(this.currentCategoryId, this.currentPage - 1, this.pageSize)
      .subscribe(this.processPaginate());
  }

  handleSearchBooks() {
    const keyword: String = this.activedRoute.snapshot.paramMap.get("keyword");

    this.bookService
      .searchBooks(keyword, this.currentPage - 1, this.pageSize)
      .subscribe(this.processPaginate());
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.listBooks();
  }

  processPaginate() {
    return (data) => {
      // to mock database connection
      // setTimeout(() => {
      //   //stops the spinner
      //   this.spinnerSerivce.hide();
      //   this.books = data._embedded.books;
      //   //page number starts from 1 index
      //   this.currentPage = data.page.number + 1;
      //   this.totalRecords = data.page.totalElements;
      //   this.pageSize = data.page.size;
      // }, 1000);
      this.books = data._embedded.books;
      //page number starts from 1 index
      this.currentPage = data.page.number + 1;
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
    };
  }

  addToCart(book: Book) {
    const cartItem = new CartItem(book);
    this.cartService.addToCart(cartItem);
  }
}
