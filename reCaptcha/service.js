window.recaptchaCallback = undefined;

jQuery(document).ready(function($) {

  window.recaptchaCallback = function recaptchaCallback(response) {
    // console.log('CALLBACK - captcha response: ' + response);

    $.ajax({
      method: "POST",
      url: "https://whatsthetea.info/service.ajax.php",
      data: { 'g-recaptcha-response': response },
    })
      .done(function(msg) {
        // console.log(msg);
        if (msg.success === true) {
          window.location.replace("http://stackoverflow.com");
          // hide panel that contains recaptcha challenge...
          $("#panel-recaptcha").hide();
          // ... and show service result instead
          var tmpl = $.templates("#tmpl-service");
          $("#result").html(tmpl.render({data: msg.data}));
        } else {
          // show alert message
          var tmpl = $.templates("#tmpl-alert");
          $("#result").html(tmpl.render());
        }
      })
      .fail(function(jqXHR, textStatus) {
          // show alert message
        var tmpl = $.templates("#tmpl-alert");
        $("#result").html(tmpl.render());
      });
  }

});