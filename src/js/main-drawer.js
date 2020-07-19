import { MDCDrawer } from "@material/drawer";
import { MDCList } from "@material/list";
import { MDCRipple } from "@material/ripple";
import { fromEvent } from "rxjs";
import { filter } from "rxjs/operators";

class MainDrawer {
  constructor(selector) {
    this.el = MDCDrawer.attachTo(document.querySelector(selector));
    this.listEl = document.querySelector(`${selector} .mdc-list`);
  }

  handleNavEvent(navEvent$, mainContentEl) {
    navEvent$
      .pipe(filter(ev => ev != null))
      .subscribe(_ => this.el.open = !this.el.open);

    fromEvent(this.listEl, "click")
      .subscribe(_ => this.el.open = false);

    fromEvent(document.body, "MDCDrawer:closed")
      .subscribe(_ => mainContentEl.querySelector("input, button").focus());
  }

  initRipple() {
    MDCList.attachTo(this.listEl).listElements.forEach(MDCRipple.attachTo);
  }
}

export { MainDrawer }