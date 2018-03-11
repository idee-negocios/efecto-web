(function(){
    
    function scrollNavbar(){
      var navbar = document.getElementsByClassName("navbar")[0];
      var ypos = window.pageYOffset;
      // var logo1 = document.getElementsByClassName("navbar-item")[0];
      // var logo2 = document.getElementsByClassName("navbar-item")[1];
      const mqM = window.matchMedia( "(min-width: 1020px)" );
    
    
      if (ypos > 10) {
        navbar.classList.add('navbar-scroll');

      }else {
        navbar.classList.remove('navbar-scroll');

      }
    } 
    
    function controlAside() {
      document.getElementsByClassName('navbar-toggle')[0].addEventListener('click',showAside);
      document.getElementsByClassName('navbar-aside-container')[0].addEventListener('click',hideAside);
    }
    
    function hideAside(){
      var asideContainer = document.getElementsByClassName('navbar-aside-container')[0];
      asideContainer.classList.remove('navbar-aside-container-show');
      var aside = document.getElementsByClassName('navbar-aside')[0];
      aside.classList.remove('navbar-aside-show');
    }
    
    function showAside() {
      var asideContainer = document.getElementsByClassName('navbar-aside-container')[0];
      asideContainer.classList.add('navbar-aside-container-show');
      var aside = document.getElementsByClassName('navbar-aside')[0];
      aside.classList.add('navbar-aside-show');
    }
    
    

    window.addEventListener('DOMContentLoaded',controlAside);
    window.addEventListener('scroll',scrollNavbar);
    
    }())