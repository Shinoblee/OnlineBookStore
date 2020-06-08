import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { CartItem } from "src/app/common/cart-item";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;

  constructor(
    private formBuiler: FormBuilder,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuiler.group({
      customer: this.formBuiler.group({
        firstName: [""],
        lastName: [""],
        email: [""],
      }),
      shippingAddress: this.formBuiler.group({
        street: [""],
        city: [""],
        state: [""],
        country: [""],
        zipcode: [""],
      }),
      billingAddress: this.formBuiler.group({
        street: [""],
        city: [""],
        state: [""],
        country: [""],
        zipcode: [""],
      }),
      creditCard: this.formBuiler.group({
        cardType: [""],
        nameOnCard: [""],
        cardNumber: [""],
        cvv: [""],
        expirationMonth: [""],
        expirationYear: [""],
      }),
    });

    this.cartDetails();
  }

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  cartDetails() {
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe((data) => {
      this.totalPrice = data;
    });

    this.cartService.totalQuantity.subscribe((data) => {
      this.totalQuantity = data;
    });

    this.cartService.calculateTotalPrice();
  }

  onSubmit() {
    console.log("purchase books");
    console.log(this.checkoutFormGroup.get("customer").value);
    console.log(this.checkoutFormGroup.get("shippingAddress").value);
    console.log(this.checkoutFormGroup.get("billingAddress").value);
    console.log(this.checkoutFormGroup.get("creditCard").value);
  }

  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(
        this.checkoutFormGroup.controls.shippingAddress.value
      );
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }
}
