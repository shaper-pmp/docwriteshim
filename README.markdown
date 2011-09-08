If you have to deal with a lot of different legacy systems which use `document.write()` to add to the DOM as it's being constructed (these days, a big javascript no-no[1]), you may find this code helpful.

Insert it at the top of the page before any calls to `document.write`, and it overwrites `document.write` with a function which stores up all the code which would otherwise be written to the page in the order it would be added.

Then, in your footer/on `$(document).ready()`/asynchronously you can just call `document.write(null, true);` to have all the content which would have been `document.write()`ten appended to the page-body in a safe, standards-compliant way.

This shim won't work without modification for code which requires `document.write()`ten elements to be inserted *at the position of the `document.write()` call*, but it's a great for things like Google Analytics, third-party Javascript libraries or other scripts which insert absolutely-positioned divs (ie, where their position in the DOM isn't always vitally important).

## Footnotes ##

[1]: Modifying the DOM while it's being constructed always used to be the only way to do it, at least until the DOM API came along. However, it leaves your code open to all sorts of race conditions and arbitrary/impossible-to-predict timing issues, and can sometimes royally screw up your DOM - duplicating elements, prematurely closing elements, even preventing whole subtrees of elements from being included.  Moreover, a few hundredths of a second in loading time, or a change to a completely unrelated element elsewhere on the page can cause, prevent or utterly change the symptoms, making it all but impossible to diagnose if you don't recognise the symptoms.
