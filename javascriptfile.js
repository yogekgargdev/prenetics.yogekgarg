$(document).ready(function() {
    $("#searchbutton").on("click", function(e) {
      e.preventDefault();
        $('.card').hide();

        if($("#searchboxtext").val()=='')
        {
            alert("empty search!");
            return;
        }

      $.get("AttendanceRegister.json", function(data) {
        const empname = $("#searchboxtext").val();
        let booleanval = false;
        $("#emppresentdetails").html('');
        
        data.forEach(element => {
          if (element.employeName.toLowerCase() == empname.toLowerCase()) {
            
            if (booleanval == false) {
              booleanval = true;
              $("#empname").html('Employee Name: ' + element.employeName);
              $("#Departementname").html('Departement Name: ' + element.dept);
            }

            let [hours, minutes] = element.checkinTime.split(":");
            let [hours1, minutes1] = element.checkouttime.split(":");
            hours = hours1 - hours;
            minutes = minutes1 - minutes;

            if (minutes != 0) {
              $("#emppresentdetails").append('<li> Date: '+element.date +'   Checkin time: '+ element.checkinTime+'   Checkout time: '+element.checkouttime+ '   Total working hours: '+hours+'   hours and '+minutes+'   minutes </li>');
              }
              else {
                $("#emppresentdetails").append('<li> Date: '+element.date +'   Checkin time: '+ element.checkinTime+'   Checkout time: '+element.checkouttime+ '   Total working hours: '+hours+'   hours </li>');
                }
              }
            });

          if (booleanval == false) {
          
            alert("No Users Found!");
          } else {
            $('.card').show();
          }
          booleanval = false;
          console.log(data);
        }).fail(function() {
          console.log("An error has occurred.");
        });
      });
    });