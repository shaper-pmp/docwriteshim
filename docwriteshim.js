document.write = function(html, printall) {
  // Check to see if the array of things to be written to the page has been initialised, and to initialise it if so:
  if(typeof this.htmlChunks == 'undefined') {
    this.htmlChunks = [];  /* No static variables in javascript, but as functions are objects and objects are functions, we can get the same effect by using member variables */
  }

  if(html) {
    this.htmlChunks.push(html);
  }

  if(printall) {
    var writediv = document.createElement('div');
    writediv.innerHTML = this.htmlChunks.join('');
    document.getElementsByTagName('body')[0].appendChild(writediv);
    this.htmlChunks = [];
  }
};

