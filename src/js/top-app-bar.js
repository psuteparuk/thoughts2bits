import { MDCTopAppBar } from "@material/top-app-bar";
import { BehaviorSubject } from "rxjs";

class TopAppBar {
  constructor(selector) {
    this.el = MDCTopAppBar.attachTo(document.querySelector(selector));
    this.navEvent$ = new BehaviorSubject(null);
  }
  
  handleNavEvent() {
    this.el.listen("MDCTopAppBar:nav", _ => this.navEvent$.next(true));
  }
}

export { TopAppBar };
