import $ from 'jquery';
var Promise = require('es6-promise-polyfill').Promise;
import { getDoctors } from './betterDoctorApi.js';


$(document).ready(function(){

  $("button#getDoctors").click(function(){

    let userInput = $("#input").val();

    getDoctors(userInput)

    .then(function(response){

      let doctors = JSON.parse(response);

      doctors.data.forEach(function(doctor){

        let doctorName = doctor.practices[0].name;
        let doctorImageUrl = doctor.profile.image_url;
        let doctorAddress = doctor.practices[0].visit_address.street + ", " + doctor.practices[0].visit_address.zip;
        let doctorPhone = doctor.practices[0].phones[0].number;
        let doctorNewPatients = doctor.practices[0].accepts_new_patients;
        let doctorWebsite = doctor.practices[0].website;

        $("#responseRow").append(
         `<div class="col-md-3">
            <div class="doctorCard">
              <h2 class="doctorName">${doctorName}</h2>
              <img class="doctorImage" src="${doctorImageUrl}">
              <h5 class="doctorAddress">Address: ${doctorAddress} </h5><hr>
              <h5 class="doctorPhone">Phone Number: ${doctorPhone} </h5><hr>
              <h5 class="doctorNewPatients">Accepting New Patients: ${doctorNewPatients}</h5><hr>
              <h5 class="doctorWebsite"><a href="${doctorWebsite}">doctor's website</a></h5>
            </div>
          </div>`)
      });
    });
  });
})
