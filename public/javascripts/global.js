// file: public/javascript/global.js

// User list data holds the data for one user
var userListData = [];

// DOM readey
$(document).ready(function(){
    console.log('PING! DOM REady');
    // Populate table on page load
    
    loadJSONfile();

    // Attach event handlers
/*    $('#filedialogue').change(function(){        
        var filePath = this.value;
        if(filePath.indexOf('.json') != -1){
            console.log('PING! Filepath OK: ' + filePath);
        }else{
            console.log('PING! Type of file was not accepted.');
        }        
    });*/

    $('#filedialogue').click(function(){
        console.log('Clicked!');
    });

    $('#clicka').click(function(){
        $('#filedialogue').click();
    });

    $('#loadDB').click(function(){
        loadMongoData();
    });

    $('#filedialogue').change(function(){
        var file = this.files[0];
        console.log("The form: " +  $('form')[0].id);
        console.log("The form: " +  $('form')[0].id);        
        if(file.name.indexOf('.json') != -1){
            console.log('PING! Filepath OK: ' + file.name);
            $.ajax({
                url:'/users/uploadtodb',
                type:'POST',
                data: new FormData($('form')[0]),
                cache: false,
                processData: false,
                xhr: function(){
                    var xhtmlReq = $.ajaxSettings.xhr();
                    if(xhtmlReq.upload){
                        console.log('PING, request is UPLOAD!')                            
                        xhtmlReq.upload.addEventListener('progress', function(e){
                            if(e.lengthComputable){
                                $('progress').attr({
                                    value: e.loaded,
                                    max: e.total,
                                });
                                console.log('PING, upload in PROGRESS!')    
                            }
                        }, false);
                    }
                    return xhtmlReq;
                },
            })
                .done(function(data, status) {
                    /*alert( "success" );*/
                    console.log('PING, upload SUCCESS!');  
                    console.log('PING, status: ' + status);                      
                })
                .fail(function(xhr, stat, err) {
                    /*alert( "error" );*/
                    console.log('PING, upload ERROR!');
                    console.log('PING ERROR, stat: ' + stat + ' err: ' + err);
                })
                .always(function() {
                    /*alert( "complete" );*/
                    console.log('PING, upload request COMPLETE!');                        
                });
        }else{
            console.log('PING! Type of file was not accepted.');
        }     
    });

});


// FUNCTIONS ////////////////

function populateTable(data){
    var tableContent = '';
    $.each(data, function(){
        tableContent += '<tr>';
        tableContent += '<td>' + this.country + '</td>';
        tableContent += '<td>' + this.title + '</td>';
        tableContent += '<td>' + this.name + '</td>';
        tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.url + '">' + this.url + '</a></td>';
        tableContent += '</tr>';
    });
    $('#userlist table tbody').html(tableContent);
    $('#tbllist tr')
        .mouseenter(function(){
            $(this).toggleClass('row-highlight');
        })
        .mouseleave(function(){
            $(this).toggleClass('row-highlight');
        });    
    console.log('PING! tableContent: ' + tableContent);
}

function loadJSONfile(){
    $.getJSON('users/userload', function(data){
        populateTable(data);
        $('#userlist').removeClass().addClass('list-file');
        $('#listlabel').html('List from file');
        $('#listlabel').removeClass().addClass('label-file');        
    });
}

function loadMongoData(){
    $.getJSON('/users/userlist', function(data){
        // $('#response').html(data[Object.keys(data)[0]]);
        populateTable(data);
        $('#userlist').removeClass().addClass('list-db');
        $('#listlabel').html('List from DB');        
        $('#listlabel').removeClass().addClass('label-db');                
    });
}