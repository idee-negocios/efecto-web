import $ from 'jquery';
// import * as Navbar from './navbar';

window.$ = $;
window.jQuery = $;

require('./slides.min');


(() => {

  $('.web-slider').slidesjs({
    // width: 320,
    // height: 324,
    play: {
      active: false,
      effect: "slide", //fade or slide
      interval: 4000,
      auto: false,
      swap: false,
      pauseOnHover: false,
      restartDelay: 2500
    },
    pagination: {
      active: false,
    }
  });


  //variables y funciones para planes (mobile)
  let landingPageActive = false;
  let personalizadoActive = false;
  let eCommerceActive  = false;

  function planesControl(){

    if(landingPageActive == false){
      $(".box-button-description-landing-page").removeClass("box-button-active");
    } else{
      $(".box-button-description-landing-page").addClass("box-button-active");
    };
    if(personalizadoActive == false){
      $(".box-button-description-personalizado").removeClass("box-button-active");
    } else{
      $(".box-button-description-personalizado").addClass("box-button-active");
    };
    if(eCommerceActive == false){
      $(".box-button-description-e-commerce").removeClass("box-button-active");
    } else{
      $(".box-button-description-e-commerce").addClass("box-button-active");
    };
  }

  //funcion para mostrar planesDescription
  $(document).ready(function(){

    $(".box-button-description-landing-page").on( "click", function() {	 

      landingPageActive = (!landingPageActive); 
      personalizadoActive = false;
      eCommerceActive  = false;
      planesControl();

      $('.box-mobile-description-landing-page').toggle("slow");

      if($('.box-mobile-description-personalizado').show()){
        $('.box-mobile-description-personalizado').hide();
      }
      if($('.box-mobile-description-e-commerce').show()){
        $('.box-mobile-description-e-commerce').hide();
      }
    });

    $(".box-button-description-personalizado").on( "click", function() {	 
      landingPageActive = false; 
      personalizadoActive = (!personalizadoActive);
      eCommerceActive  = false;
      planesControl();

      $('.box-mobile-description-personalizado').toggle("slow");
      if($('.box-mobile-description-landing-page').show()){
        $('.box-mobile-description-landing-page').hide();
      }
      if($('.box-mobile-description-e-commerce').show()){
        $('.box-mobile-description-e-commerce').hide();
      }
    });

    $(".box-button-description-e-commerce").on( "click", function() {	 
      landingPageActive = false; 
      personalizadoActive = false;
      eCommerceActive  = (!eCommerceActive);
      planesControl();
      $('.box-mobile-description-e-commerce').toggle("slow");
      if($('.box-mobile-description-landing-page').show()){
        $('.box-mobile-description-landing-page').hide();
      }
      if($('.box-mobile-description-personalizado').show()){
        $('.box-mobile-description-personalizado').hide();
      }
    });

  });

  $(document).ready(function() {
    $('.form').on('submit', function(e) {
      console.log(e);
      e.preventDefault();
      var contactData = $(this).serializeArray();

      var validForm = contactData.every(function(item) {
        return item.value !== '';
      });

      if(!validForm) {
        alert('Algunos campos requeridos están vacíos. Por favor, completelos.');
      } else {
        contactData = contactData.reduce((data, item) => {
          data[item.name] = item.value;
          return data;
        }, {});

        console.log(contactData);

        $.post('https://dev.ideenegocios.com.ar:3001/juan-kohler', contactData, function(res) {
          console.log(res);

          $('.form').hide('slow', function() {
            $('.contact-message').show('slow');
          });
        });
      }
    });
  });
})();


