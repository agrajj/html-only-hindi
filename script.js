// Hindi characters fall in the Unicode range 0600 - 06FF
var hindiCharUnicodeRange = /[\u0900-\u097F]/;

function restrictInputOtherThanHindi($field) {
  $field.bind("keypress", function(event) {
    var key = event.which;
    // 0 = numpad
    // 8 = backspace
    // 32 = space
    if (key == 8 || key == 0 || key === 32) {
      return true;
    }

    var str = String.fromCharCode(key);
    if (hindiCharUnicodeRange.test(str)) {
      return true;
    }

    return false;
  });
}

jQuery(document).ready(function() {
  $("input[only-hindi]").each(function(index, input) {
    const $text = $(input);

    $text.bind("paste", function(e) {
      // access the clipboard using the api
      var pastedData = e.originalEvent.clipboardData.getData("text");

      //if all charcters in pasted text do not belong to Hindi Unicode Range stop it from being pasted altogether.
      if (!hindiCharUnicodeRange.test(pastedData)) {
        e.preventDefault();
        return;
      }
    });

    // allow hindi characters only for following fields
    restrictInputOtherThanHindi($text);
  });
});
