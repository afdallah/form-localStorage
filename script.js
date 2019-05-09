var ready = function (fn) {

	// Sanity check
	if (typeof fn !== 'function') return;

  // If document is already loaded, run method
  document.onreadystatechange = function () {
    if (document.readyState === 'interactive') {
      removeEventListener('readystatechange', this)
      return fn();
    }
  }

  return document.onreadystatechange()

	// Otherwise, wait until document is loaded
	document.addEventListener('DOMContentLoaded', fn, sfalse);
};

ready(function () {
  // get all field inside the form
  var fields = document.querySelectorAll('textarea, input:not([type="submit"])')

  // Check if any existing saved data
  var saved = localStorage.getItem('fls')

  if (saved) {
    saved = JSON.parse(saved)

    for (var i = 0; i < fields.length; i++) {
      var val = saved[fields[i].id]
      if (!val) continue

      fields[i].value = val
    }
  }
})

var handleForm = function (event) {
  // check if any existing saved data
  var saved = localStorage.getItem('fls')
  saved = saved ? JSON.parse(saved) : {}

  saved[event.target.id] = event.target.value
  localStorage.setItem('fls', JSON.stringify(saved))
}
document.addEventListener('input', handleForm, false)