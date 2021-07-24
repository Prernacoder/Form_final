var userRef = firebase.database().ref('user');
//$('#user-table').find('tbody').html('');
var new_html = '';
window.onload = function () {
    initApp();
    displayUserData();
};
//BUTTONS OR ACTIONS
function initApp() {
    document.getElementById('add_user').addEventListener('click', addNewUser, false);

}





// INSERT DATA
function addNewUser() {
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var hobbies = document.getElementById('hobbies').value;
    var interest = document.getElementById('interest').value;
    var timeStamp = new Date().getTime();
    var userID = 'USR_' + timeStamp;
    userRef.child(userID).set({
        name: name,
        age: age,
        hobbies: hobbies,
        interest: interest,
        User_id: userID
    });
    $('#name').val('');
    $('#age').val('');
    $('#hobbies').val('');
    $('#interest').val('');
}



//Display userloyee Data 


function displayUserData() {

    userRef.on('child_added', function (userData) {
        console.log(userData.val());

        new_html += '<tr id="'+userData.val().User_id+'">';
        new_html += '<td id="name_'+userData.val().User_id+'">' + userData.val().name + '</td>';
        new_html += '<td id="age_'+userData.val().User_id+'">' + userData.val().age + '</td>';
        new_html += '<td id="hobbies_'+userData.val().User_id+'">' + userData.val().hobbies + '</td>';
        new_html += '<td id="interest_'+userData.val().User_id+'">' + userData.val().interest + '</td>';
        new_html += '<td><a  class="edit" data-toggle="modal"><i class="material-icons editUser"';
        new_html += 'data-toggle="tooltip" data-user-id="' + userData.val().User_id + '" title="Edit">&#xE254;</i></a>';
        new_html += '<a class="" data-toggle="modal"><i class="material-icons delete"';
        new_html += 'data-toggle="tooltip"  data-user-id="' + userData.val().User_id + '" title="Delete">&#xE872;</i></a>';
        new_html += '</td>';
        new_html += '</tr>';

        $("#user-table").html(new_html);
       
    });

    

    // $('#user-table').find('tbody').append(new_html);

}

$(document).on('click', '.delete', function () {
    var User_id = $(this).attr('data-user-id');
    



    userRef.child(User_id).once('value', function (user) {
        var modal_header = '';

        modal_header += '<h4 class="modal-title">Delete ' + user.val().name + '</h4>';
        modal_header += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';

        var modal_body = '';
        modal_body += '<p>Are you sure you want to delete these Records?</p>';
        modal_body += '<p class="text-warning"><small>This action cannot be undone.</small></p>';
        var modal_footer = '';
        modal_footer += '<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">';
        modal_footer += '<input type="submit" data-dismiss="modal" data-user-id="'+User_id+'" class="btn btn-danger deleteuserData" value="Delete">';
        $("#deleteUserModal").find('.modal-header').html(modal_header);
        $("#deleteUserModal").find('.modal-body').html(modal_body);
        $("#deleteUserModal").find('.modal-footer').html(modal_footer);
        $("#deleteUserModal").modal();
    })
}); 

$(document).on('click', '.editUser', function () {
    var User_id = $(this).attr('data-user-id');
    



    userRef.child(User_id).once('value', function (user) {
        var modal_header = '';

        modal_header += '<h4 class="modal-title">Add ' + user.val().name + '</h4>';
        modal_header += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';

        var modal_body = '';
        modal_body += '<div class="form-group">';
        modal_body += '<label>Name</label>';
        modal_body += '<input id="edit-name" type="text" value="'+user.val().name+'" class="form-control" required>';
        modal_body += '</div>';
        modal_body += '<div class="form-group">';
        modal_body += '<label>Age</label>';
        modal_body += '<input type="text" id="edit-age" value="'+user.val().age+'" class="form-control" required>';
        modal_body += '</div>';
        modal_body += '<div class="form-group">';
        modal_body += '<label>Hobbies</label>';
        modal_body += '<textarea id="edit-hobbies"  class="form-control" required>'+user.val().hobbies+'</textarea>';
        modal_body += '</div>';
        modal_body += '<div class="form-group">';
        modal_body += '<label>Interest</label>';
        modal_body += '<select id="edit-interest" type="text" value="'+user.val().interest+'" class="form-control">';
        modal_body +='<option>Health and Fitness</option>'+'<option>Cooking</option>'+'<option>Gardening</option>'+' <option>Reading</option>'+'<option>Nature</option>'+'<option>Sports</option>'+'</select>';
        
        
       
        
        
      
        modal_body += '</div>';
        

        var modal_footer = '';
        modal_footer += '<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">';
        modal_footer += '<input type="submit" data-dismiss="modal" data-user-id="'+User_id+'"  class="btn btn-danger updateuserData" value="Save">';
        $("#editUserModal").find('.modal-header').html(modal_header);
        $("#editUserModal").find('.modal-body').html(modal_body);
        $("#editUserModal").find('.modal-footer').html(modal_footer);
        $("#editUserModal").modal();
    })
});


$(document).on('click', '.deleteuserData', function () {
    var User_id = $(this).attr('data-user-id');
     
    userRef.child(User_id).remove();
  
    $('#'+User_id).remove();
    
    
});


$(document).on('click', '.updateuserData', function () {
    var User_id = $(this).attr('data-user-id');
     
    var name = document.getElementById('edit-name').value;
    var age = document.getElementById('edit-age').value;
    var hobbies = document.getElementById('edit-hobbies').value;
    var interest = document.getElementById('edit-interest').value;
    
   
    userRef.child(User_id).update({
        name: name,
        age: age,
        hobbies: hobbies,
        interest: interest
    })
    
    $('#name_'+User_id).html(name);
    $('#age_'+User_id).html(age);
    $('#hobbies_'+User_id).html(hobbies);
    $('#interest_'+User_id).html(interest);


    
});

$(document).on('click', '.dltAllData', function () {
    var User_id = $(this).attr('data-user-id');
     
    userRef.remove();
  
    $('#user-table').remove();

    
});
