$(document).ready( function(){
	var initialize = function(containerDiv){
		this.containerDiv = containerDiv;
	}

	initialize.prototype.start = function(){
		containerDiv_cach = this.containerDiv;
		usersElement_cach = containerDiv_cach.find("select");

		var getData = $.ajax({
		     type: "POST",
		     dataType: "json",
		     url: "getData.php",
		     data: { Action : "getData" }
		});
		getData.done(function(res)
		{
		    //console.log (res);
		    usersElement_cach.html("");
		    usersElement_cach.append("<option user_id=\"0\">לחץ לבחירה</option>")
		    $.each(res, function(i, val) {
       			usersElement_cach.append("<option user_id="+val.id+">" + val.fname + " " + val.lname + "</option>");
    		});
		});
		getData.fail(function(jqXHR, textStatus)
		{
		     //alert( "We could not get any data, please try again or contact us if the problem persists (" + textStatus + ")." );
		    notifier.err(jqXHR.responseText);
		});
	};

	initialize.prototype.timCheck = function(user_id){
		this.user_id = user_id;
		containerDiv_cach = this.containerDiv;
		notifier.clr( $("#logs_info") );

		$.post("getData.php",
    			{ Action : "checkTim", user_id : this.user_id },
    			function(res)
				{
          			if ( res == "false"){
          				console.log (containerDiv_cach.find("div#tim_btns"));
						containerDiv_cach.find("div#tim_btns").html('<button type="button" data-type="login" class="btn btn-lg btn-primary">כניסה</button>');
          			}
          			else
          			{
          				containerDiv_cach.find("div#tim_btns").html('<button type="button" data-type="logout" class="btn btn-lg btn-primary">יציאה</button>');
          			}
				}
		);
	};

	initialize.prototype.login = function(){
		$.post("getData.php",
    			{ Action : "logAction",type: "login", user_id : this.user_id },
    			function(res)
				{
					containerDiv_cach.find("div#tim_btns").html('');
					notifier.msgsDiv( $("#logs_info") );
					notifier.success("כניסה בוצעה בהצלחה בשעה:<br />"+res);
				}
		);
	};

	initialize.prototype.logout = function(){
		$.post("getData.php",
    			{ Action : "logAction",type: "logout", user_id : this.user_id },
    			function(res)
				{
					console.log (res);
					containerDiv_cach.find("div#tim_btns").html('');
					notifier.msgsDiv( $("#logs_info") );
					notifier.success("יציאה בוצעה בהצלחה בשעה:<br />"+res[0]+"<br /><br />סה\"כ שעות עבודה: "+res[1]+".");
				},
				'json'
		);
	};

	var notifier = {
		msgsDiv : function(div){
			this.div = div;
		},
		info : function(){
			this.div.html("some info");
		},
		err : function(errMsg){
			this.div.attr('class', 'alert alert-danger');
			this.div.html("אירעה שיגאה! פרטים נוספים:<br/ >"+errMsg);
		},
		success : function(successMsg){
			this.div.attr('class', 'alert alert-success');
			this.div.html(successMsg);
		},
		welcome : function(){
			this.div.attr('class', 'alert alert-info');
			this.div.html("ברוכים הבאים!<br /> אנא בחרו שם לצורך כניסה או יציאה.");
		},
		clr : function(div){
			this.div = div;
			this.div.removeClass();
			this.div.html("");
		}
	};

	notifier.msgsDiv( $("#msgs") );
	notifier.welcome();

	var init = new initialize( $(".jumbotron") );
	init.start();
	
	$("#users_selection").on('change', function(){
		var user_id = $("#users_selection option:selected").attr("user_id");
		init.timCheck(user_id);
	});


	$(document).on("click", "button", function myFunc(){
		
		var action = $(this).data("type");
    	init[action]();
	});
});