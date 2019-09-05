import { MDCDrawer } from "@material/drawer";
import { MDCTopAppBar } from "@material/top-app-bar";
import { BehaviorSubject, fromEvent } from "rxjs";
import { filter } from "rxjs/operators";

const mainContentEl = document.querySelector(".t2b-main-content")
const topAppBar = MDCTopAppBar.attachTo(document.querySelector(".t2b-top-app-bar"));
const mainDrawer = MDCDrawer.attachTo(document.querySelector(".t2b-main-drawer"));
const mainDrawerListEl = document.querySelector(".t2b-main-drawer .mdc-list")

const navEvent$ = new BehaviorSubject(null);
topAppBar.listen("MDCTopAppBar:nav", _ => navEvent$.next(true));

navEvent$
  .pipe(filter(ev => ev != null))
  .subscribe(_ => mainDrawer.open = !mainDrawer.open);
fromEvent(mainDrawerListEl, "click")
  .subscribe(_ => mainDrawer.open = false);
fromEvent(document.body, "MDCDrawer:closed")
  .subscribe(_ => mainContentEl.querySelector("input, button").focus());
