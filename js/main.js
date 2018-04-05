import $ from 'jquery';
import * as Navbar from './navbar';

window.$ = $;
window.jQuery = $;

require('./slides.min');


(() => {

  //FUNCIONES SCROLLTOP
  $(".arrow").click(function() {
    $('html, body').animate({
        scrollTop: $("#web").offset().top
    }, 1000);
  });

  $(".contact").click(function() {
    $('html, body').animate({
        scrollTop: $("#contacto").offset().top
    }, 2000);
  });

  $(".arrow").click(function() {
    $('html, body').animate({
      scrollTop: $("#web").offset().top
    }, 1000);
  });
  
  //funciones scrolltop para barra de navegacion
  $(".navbar-web").click(function() {
    $('html, body').animate({
      scrollTop: $("#web").offset().top
    }, 1000);
  });
  $(".navbar-que-hacemos").click(function() {
    $('html, body').animate({
      scrollTop: $("#que-hacemos").offset().top
    }, 1000);
  });
  $(".navbar-nuestros-sitios").click(function() {
    $('html, body').animate({
      scrollTop: $("#nuestros-sitios").offset().top
    }, 1000);
  });
  $(".navbar-nuestros-servicios").click(function() {
    $('html, body').animate({
      scrollTop: $("#nuestros-servicios").offset().top
    }, 1000);
  });
  $(".navbar-contacto").click(function() {
    $('html, body').animate({
      scrollTop: $("#contacto").offset().top
    }, 1000);
  });



  //INICIALIZACIONES DE SLIDER
  $('.que-hacemos-slider').slidesjs({
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


  //Variables y funciones para planes (mobile)
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

        $.post('https://dev.ideenegocios.com.ar:3001/efecto-web', contactData, function(res) {
          console.log(res);

          $('.form').hide('slow', function() {
            $('.contact-message').show('slow');
          });
        });
      }
    });
  });

  $('.button-plan').on('click', function(evt) {
    const plan = $(this).data().plan;
    $('#plantilla').val(plan);
  });
})();


