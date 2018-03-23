import $ from 'jquery';
var Promise = require('es6-promise-polyfill').Promise;

//Api url: https://api.betterdoctor.com/2016-03-01/doctors?query=[]&location=wa-seattle&skip=0&limit=10&user_key=[]
//query words are separated by "%20";
//doctor's name = data[n].practices[n].name
//data is an array
//image = data[n].profile.image_url
//address = data[n].practices[n].visit_address.street and .zip
//phonenumber = data[n].practices[n].phones[n].number
//website = data[n].practices[n].website
//accepts new patients? = data[n].practices[n].accepts_new_patients


export function getDoctors(userInput){
  return new Promise(function(resolve, reject){
    let request = new XMLHttpRequest();
    let query = (() => {
      let splitArray = userInput.split(" ");
      let tempQuery = splitArray.join("%20");
      console.log("Search Query: " + tempQuery);
      return tempQuery;
    })();
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${query}&location=wa-seattle&skip=0&limit=10&user_key=${process.env.exports.apiKey}`;

    request.onload = function(){
      if(request.status === 200) {
        resolve(request.response)
      } else {
        reject(Error(request.statusText))
      }
    };

    request.open("GET", url, true);
    request.send();
  })
}
