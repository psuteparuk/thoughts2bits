import { MDCRipple } from "@material/ripple";
import { TopAppBar } from "./top-app-bar";
import { MainDrawer } from "./main-drawer";
import { fromEvent } from "rxjs";

fromEvent(document, "DOMContentLoaded").subscribe(_ => {
  const mainContentEl = document.querySelector(".t2b-main-content");
  const topAppBar = new TopAppBar(".t2b-top-app-bar");
  const mainDrawer = new MainDrawer(".t2b-main-drawer");

  topAppBar.handleNavEvent();
  mainDrawer.handleNavEvent(topAppBar.navEvent$, mainContentEl);
  mainDrawer.initRipple();

  // Attach ripple to all buttons
  document.querySelectorAll(".mdc-button").forEach(MDCRipple.attachTo);
});
