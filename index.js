'use strict';
/*Fono API key, this has not usage limit*/
const fonoApiKey = 'd361b5aef22d5e763879c5defa2a1536e03bf9dc26c46a66';
const youtubeAPI = 'AIzaSyDfxiMU8cIxLSI35UzX3CH9IQC_kQniBsw';
const getDeviceURL = 'https://fonoapi.freshpixl.com/v1/getdevice';
const newDeviceURL= 'https://fonoapi.freshpixl.com/v1/getlatest';
const youtubeURL = 'https://www.googleapis.com/youtube/v3/search';

//Checks what part of the screen was clicked
function CheckWhereWasClicked(){
  let phone = true;
  $(document).click(function(event){
    if($(event.target).attr('class').includes('phone-image')){
      phone = true;
    }
    else{ phone = false; }
    existInitialScreen(phone);
    manageWrongClicks(phone);
  });
}

//Exist out of the initial screen
function existInitialScreen(phoneClicked=false){
   if(phoneClicked === true){
    $('.initial-nav-bar').toggle();
    phoneEffect();
    setTimeout(function(){
      $('.initial-screen').css('display','none');  
      $('.search-bar-screen').css('display','block');
      $('#background1').css('display','none');
     }, 2000);
  }
}

//Render phone image effect
function phoneEffect(){
  $('.text').animate({
    width: '150px',
    height: 0
  }, 200, function(){

    if($(window).width() < 600){$('.initial-one').animate({
      height: '250px'
    }, 300); }
    else if($(window).width() > 600 && $(window).width() < 1000){$('.initial-two').animate({
      height: '250px'
    }, 100); }
    else{$('.initial-three').animate({
      height: '250px'
    }, 300); }
  });

  setTimeout(function(){
  $( '.phone-image' ).css('animation', 'none');
  
  if($(window).width() > 1000 ){
    $( '.phone-image' ).css('transform', 'rotate(270deg) scale(6.5, 6.5)');
    $( '.phone-image' ).css('-ms-transform', 'rotate(270deg) scale(6.5, 6.5)');
    $( '.phone-image' ).css('-webkit-transform', 'rotate(270deg) scale(6.5, 6.5)');
    $( '.phone-image' ).css('-moz-transform', 'rotate(270deg) scale(6.5, 6.5)');
    $( '.phone-image' ).css('-o-transform', 'rotate(270deg) scale(6.5, 6.5)');
  }
  $('.phone-background').toggle();
  }, 1400);
}


//Vibrate the phone image when the user clicks on anything other than the phone image
function manageWrongClicks(phone=true){
        if(phone === false){  
          $( '.red' ).css('display', 'block');
          for(let i = 0; i < 3; i++){
            $('.image-container').animate({
              'right': '10px'
            }, 5).animate({
              'right': '0px'
            }, 5);
            $('.image-container').animate({
              'padding-left': '10px'
            }, 5).animate({
              'padding-left': '0px'
            }, 5,
            );
          }
          $( '.red' ).fadeOut(300);
        }
}

//This function return youtube links or prints that Youtubr apikey has exceeded its qouta limit in the review video element in html
function addVideos(deviceName, videoNum){
  let searchURL = youtubeURL; 

    const params = {
        key: youtubeAPI,
        part: 'snippet',
        maxResults: 10,
        order: 'relevance',
        q: deviceName + ' ' + 'review'
    };

    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;
    
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => appendVideos(responseJson, videoNum))
      .catch(err => {
        $('.search-results').children(`.review-${videoNum}`).append(`
              <p>Opps!! You have exceeded your qouta to use youtube API</p>`);
      });
}

//Adds videos to 'search-result'
function appendVideos(responseJson, reviewNum){
  for(let i = 0; i < 5; i++){
    $('.search-results').children(`.review-${reviewNum}`).append(`
         <iframe class='video' src='https://www.youtube.com/embed/${responseJson.items[i].id.videoId}'></iframe>
    `);
  }
}

//Displays results on the screen
function displayResults(responseJson, maxResults){
    if(!maxResults){ maxResults = 5; }
    $('.some-image').css('display','none');
    $('.search-result-screen').css('display','block');
    $('.search-results').empty();
    for (let i = 0; i < responseJson.length && i < maxResults; i++){
         $('.search-results').append(`
             <button class='results'>
              ${responseJson[i].DeviceName}
                <div class='click-to-see-specs'>
                  <span class='see-specs'>Click to see specs</span>
                  <span class='close-specs'>Close specs</span>
                <div>
              </button>  
              <ul class='result-specs spec-${i} hidden'> 
              </ul>
              <button class='show-reviews hidden'>
                <span class='see-videos'>Click Here To Watch Reviews</span>
                <span class='close-videos'>Close Reviews</span>
              </button>
              <div class='review-videos review-${i} hidden'>
              </div>`
            );           
            
            for(const key in responseJson[i]){
              $('.search-results').children(`.spec-${i}`).append(`
              <table>
              <tr>
                <td class='specs'>${changeLetterCase(key)}:</td>
                <td class='details'>${responseJson[i][key]}</td>
              <tr>
              </table>
              `);
            } 
            addVideos(responseJson[i].DeviceName, i);
            $('html').css('overflow-y', 'scroll');
    }
    if(responseJson.status === 'error'){ 
      $('.search-results').append(`
      <p class='no-result-found'>${responseJson.message}</p>
      `);
    }
}

//This functions converts all Json strings to a more readable format
function changeLetterCase(letters){
   const shouldBeCapital = ['sim', 'wlan', 'os', 'gps', 'usb', 'cpu', 'nfc', 'sar', 'gpu', 'gprs', 'us', 'eu'];
   while(letters.includes(' ')){letters = letters.replace(' ', '')};
   if(letters.startsWith('_')){ letters = letters.slice(1, letters.length); }
   if(letters.endsWith('_')){ letters = letters.slice(0, letters.length - 1); }
   letters = letters.charAt(0).toUpperCase() + letters.substr(1, letters.length);
   while(letters.includes('_')){ letters = letters.replace('_', ' ') };
   letters = letters.replace(' c', '');
   let seperatorBySpace = letters.split(' ');
   for(let i = 0; i < seperatorBySpace.length; i++){ 
        for(let j = 0; j < shouldBeCapital.length; j++){
          if(shouldBeCapital[j] === seperatorBySpace[i].toLowerCase()){ seperatorBySpace[i] = seperatorBySpace[i].toUpperCase(); }
        }
   }
   letters = seperatorBySpace.join(' ');
   if( letters.search('g') === 1 && !Number.isNaN(letters[letters.search('g') - 1])){
    letters = letters.charAt(0) + letters.charAt(1).toUpperCase() + letters.substr(2, letters.length);
   }
   if(!Number.isNaN(Number(letters[letters.search(' ') - 1])) && !Number.isNaN(Number(letters[letters.search(' ') + 1]))){
    letters = letters.replace(' ', '.');
   }
   if(letters.indexOf(' ') > 0 && Number.isNaN(Number(letters[letters.search(' ') + 1]))){
    letters = letters.substr(0, letters.search(' ')) + ' ' + letters.charAt(letters.indexOf(' ') + 1).toUpperCase() + letters.substr(letters.indexOf(' ') + 2, letters.length);
   }

   const joinWithSpace = [];
   let letterSeperator = 0;
   for(let i = 1; i < letters.length; i++){
        if(letters[i] === letters[i].toUpperCase() && !letters.includes(' ') && !(letters.toUpperCase() === letters)){
            joinWithSpace.push(letters.substr(letterSeperator, i));
            letterSeperator = letters.indexOf(letters[i]);
        }   
        else if(i === letters.length - 1){
          joinWithSpace.push(letters.substr(letterSeperator, i));
        }
    }
   if(letterSeperator > 0){  letters = joinWithSpace.join(' '); }
   return letters;
}

//Forms a query string
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

//Uses fono API to return device specs
function findDevice(brand, device, model, maxResults=5){
    let searchURL = getDeviceURL; 

    const params = {
        token: fonoApiKey,
    };

    if(!brand && !device && !model){
        searchURL = getDeviceURL;
        params.device = 'ThereWillBeNoResultsForSureWithThisString';
    }
    else if(!device && !model && brand){ 
        searchURL = newDeviceURL; 
        params.brand = brand;
    }
    else{  
        searchURL = getDeviceURL; 
        if(brand){ params.brand = brand; }
        if(model){ device = device + ' ' + model; }
        params.device = device;
    }

      const queryString = formatQueryParams(params)
      const url = searchURL + '?' + queryString;
    
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        })
        .then(responseJson => { 
          displayResults(responseJson, maxResults);})
        .catch(err => {
          $('.search-results').text(`Something went wrong: ${err.message}`);
        });
}


//Retrieves user inputs
function getInput(){
    $('form').submit(function(){
        event.preventDefault();
        const brand = $('#brand').val();
        const device = $('#device').val();
        const model = $('#model').val();
        const maxResults = $('#maxResults').val();

       // alert(brand + ' ' + device + ' ' + model + ' ' + maxResults);
         findDevice(brand, device, model, maxResults);
    });
}


//Allow device specs and review video sections to be collapsible
function collapsableSpecs(){
  $('.search-results').on('click', '.results', function(event){
    $(event.target).next().toggle();
    if($(event.target).nextAll('.review-videos').css('display') == 'block'){
      $(event.target).nextAll('.review-videos').css('display', 'none');
    }
    $(event.target).next().next().toggle();
    $(event.target).children('.click-to-see-specs').children('.see-specs').toggle();
    if($(event.target).children('.click-to-see-specs').children('.see-specs').css('display') == 'none'){
      $(event.target).children('.click-to-see-specs').children('.close-specs').css('display', 'inline');
    }
    else{  $(event.target).children('.click-to-see-specs').children('.close-specs').css('display', 'none'); }
  });
}

//Make review video sections collapsible
function collapsableReviews(){
  $('.search-results').on('click', '.show-reviews', function(event){
    $(event.target).next().toggle();
    $(event.target).children('.see-videos').toggle();
    if($(event.target).children('.see-videos').css('display') == 'none' && $(event.target).next().css('display') == 'block'){
        $(event.target).children('.close-videos').css('display', 'inline');
    }
    else{ $(event.target).children('.close-videos').css('display', 'none'); }
  });
}

//Controls the visibility of the text in the 'see-specs' button
function seeSpecs(){
  $('.search-results').on('mouseenter', '.results', function(){
    $(event.target).children('.click-to-see-specs').css('display', 'inline');
  })

  $('.search-results').on('mouseleave', '.results', function(){
    $(event.target).children('.click-to-see-specs').css('display', 'none');
  })
}


//Run all event handlers
function runAllfunctions(){
    existInitialScreen();
    getInput();
    collapsableSpecs();
    collapsableReviews();
    seeSpecs();
    CheckWhereWasClicked();
}
window.onload = $(runAllfunctions);
