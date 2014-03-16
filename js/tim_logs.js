$(document).ready( function(){
	var initialize = function(containerDiv){
		this.containerDiv 	= containerDiv;
		this.start_time 	= "";
		this.end_time 		= "";
		this.user_id 		= "";
		this.checkClicked   = false;

		this.start_time_new	= "";
		this.end_time_new	= "";
		this.log_id 		= null;
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

	initialize.prototype.set_user = function(user_id){
		this.user_id = user_id;
	};

	initialize.prototype.set_start = function(start_time){
		this.start_time = start_time;
	};

	initialize.prototype.set_end = function(end_time){
		this.end_time = end_time;
	};

	initialize.prototype.getLogs = function(){
		if (this.user_id != "" && this.start_time != "" && this.end_time != "")
		{
			containerDiv_cach 	= this.containerDiv;
			notifier.clr( $("#logs_info") );
			var details = {
				"user_id" 		: this.user_id,
				"start_time"	: this.start_time,
				"end_time"		: this.end_time
			};
			oTable.fnClearTable();

				$.post("getDataLogs.php",
	    			{ Action : "getLogs", details : details },
	    			function(res)
					{

						//console.log (res);
						var table_div 	= containerDiv_cach.find('div#tim_table');
						var tBody 		= table_div.find('tbody');
						var color		= '<span>';
						var totalH = {
							"regularH"	: 00,
							"regularM"	: 00,
							"firstIncH"		: 00,
							"firstIncM"		: 00,
							"secIncH"		:00,
							"secIncM"		:00
						};

						//var results 	= { "aaData": [ ] };
						tBody.html("");

						$.each(res, function(i, val) {
							var tempH = val['total'].split(":");
							switch(val['day_of_week']){
								case "שישי" :
									// case of 7 hours but firstInc (125%) from the minutes
									if ( tempH[0] == 7 && tempH[1] >0 )
									{
										color = '<span style="background-color: rgb(255, 181, 108);">';
										
										totalH.firstIncM 	+= parseFloat(tempH[1]);
										totalH.regularH		+= parseFloat(tempH[0]);
									}
									// case of more than 8 hours (ex 10 hours) only 2 of them goes
									// to firstIncH ans the rest to regularH. (9:30, 10:30)
									else if ( tempH[0] > 7 && tempH[0] <= 10 )
									{
										color = '<span style="background-color: rgb(255, 181, 108);">';
										
										var getDiffFromInc		= parseFloat(tempH[0]-8);
											totalH.firstIncH 	+= getDiffFromInc;
											totalH.regularH		+= parseFloat(tempH[0]-getDiffFromInc);
											
											// if it was 10:30 hours, take the 30min to the secInc
											if (tempH[0] == 10 && tempH[1] >0)
											{
												color = '<span style="background-color: rgb(255, 154, 154);">';
												totalH.secIncM		+= parseFloat(tempH[1]);
											}
											else
												totalH.firstIncM	+= parseFloat(tempH[1]);
									}
									// case of more than 10 hours (ex 12 hours) 2 of them goes to 150%
									// and the diff by 8 goes to 125%
									// and all the rest to regular
									else if (tempH[0] > 10 && tempH[1]>=0){
										color = '<span style="background-color: rgb(255, 154, 154);">';

										var getDiffFromSInc		= parseFloat(tempH[0]-10);
										totalH.secIncH 			+= getDiffFromSInc;
										totalH.secIncM 			+= parseFloat(tempH[1]);

										var getDiffFromFInc		= parseFloat( (tempH[0]-getDiffFromSInc) - 7);
										totalH.firstInc 		+= getDiffFromFInc;

										totalH.regularH			+= parseFloat( (tempH[0]-getDiffFromSInc) - getDiffFromFInc);
									}
									else{
										color		= '<span>';
										totalH.regularH += parseFloat(tempH[0]);
										totalH.regularM += parseFloat(tempH[1]);
									}

								break;

								default:
									// case of 8 hours but firstInc (125%) from the minutes
									if ( tempH[0] == 8 && tempH[1] >0 )
									{
										color = '<span style="background-color: rgb(255, 181, 108);">';
										
										totalH.firstIncM 	+= parseFloat(tempH[1]);
										totalH.regularH		+= parseFloat(tempH[0]);
									}
									// case of more than 8 hours (ex 10 hours) only 2 of them goes
									// to firstIncH ans the rest to regularH. (9:30, 10:30)
									else if ( tempH[0] > 8 && tempH[0] <= 10 )
									{
										color = '<span style="background-color: rgb(255, 181, 108);">';
										
										var getDiffFromInc		= parseFloat(tempH[0]-8);
											totalH.firstIncH 	+= getDiffFromInc;
											totalH.regularH		+= parseFloat(tempH[0]-getDiffFromInc);
											
											// if it was 10:30 hours, take the 30min to the secInc
											if (tempH[0] == 10 && tempH[1] >0)
											{
												color = '<span style="background-color: rgb(255, 154, 154);">';
												totalH.secIncM		+= parseFloat(tempH[1]);
											}
											else
												totalH.firstIncM	+= parseFloat(tempH[1]);
									}
									// case of more than 10 hours (ex 12 hours) 2 of them goes to 150%
									// and the diff by 8 goes to 125%
									// and all the rest to regular
									else if (tempH[0] > 10 && tempH[1]>=0){
										color = '<span style="background-color: rgb(255, 154, 154);">';

										var getDiffFromSInc		= parseFloat(tempH[0]-10);
										totalH.secIncH 			+= getDiffFromSInc;
										totalH.secIncM 			+= parseFloat(tempH[1]);

										var getDiffFromFInc		= parseFloat( (tempH[0]-getDiffFromSInc) - 8);
										totalH.firstInc 		+= getDiffFromFInc;

										totalH.regularH			+= parseFloat( (tempH[0]-getDiffFromSInc) - getDiffFromFInc);
									}
									else{
										color		= '<span>';
										totalH.regularH += parseFloat(tempH[0]);
										totalH.regularM += parseFloat(tempH[1]);
									}
							}
							

							/*
							tBody.append('<tr class="'+ trClass +'">')
							.append('<td>'+ val['fname'] +'</td>')
							.append('<td>'+ val['start_time'] +'</td>')
							.append('<td>'+ val['end_time'] +'</td>')
							.append('<td class="center ">'+ val['day_of_week'] +'</td>')
							.append('<td class="center ">'+ val['total'] +'</td>')
							.append('</tr>');
							results['aaData'].push({
						        //"grade" 			: trClass,
						        "שם" 				: val['fname'],
						        "זמן התחלה"			: val['start_time'],
						        "זמן סיום"			: val['end_time'],
						        "יום בשבוע"			: val['day_of_week'],
						        "סה\"כ זמן עבודה"	: val['total']
						    });*/
							
							var myTable = $('#example').dataTable().fnAddData( [
									
							        val['fname'],
							        val['start_time'],
							        val['end_time'],
							        val['day_of_week'],
							        color + val['total'] + "</span>" ]);
							
							// set id to tr so we can edit that row
							var theNode = $('#example').dataTable().fnSettings().aoData[myTable[0]].nTr;
								theNode.setAttribute('id', val['indx']);
						});

	
						//put total info on screen
						if ( totalH.regularM > 59)
						{
							var tempM = parseInt( totalH.regularM/60 );
							totalH.regularH += tempM;

							totalH.regularM = totalH.regularM%60;
							if ( totalH.regularM<10 )
								totalH.regularM = '0' + totalH.regularM;
						}
						if ( totalH.firstIncM > 59)
						{
							var tempM = parseInt( totalH.firstIncM/60 );
							totalH.firstIncH += tempM;

							totalH.firstIncM = totalH.firstIncM%60;
							if ( totalH.firstIncM<10 )
								totalH.firstIncM = '0' + totalH.firstIncM;
						}
						if ( totalH.secIncM > 59)
						{
							var tempM = parseInt( totalH.secIncM/60 );
							totalH.secIncH += tempM;

							totalH.secIncM = totalH.secIncM%60;
							if ( totalH.secIncM<10 )
								totalH.secIncM = '0' + totalH.secIncM;
						}

						containerDiv_cach.find('#logs_info').append('<div style="padding: 3px; margin-top: 10px; direction: rtl; float: right; background-color: rgb(218, 218, 218); border: 1px solid rgb(189, 189, 189); border-radius: 7;"><u><b>סה"כ שעות עבודה רגילות</u></b> ------ ' + totalH.regularM + ' : ' + totalH.regularH + '<br/><u><b>שעות עבודה נוספות ראשונות</u></b> -- ' + totalH.firstIncM + ' : ' + totalH.firstIncH + '<br/><u><b>שעות עבודה נוספות שניות</u></b> ----- ' + totalH.secIncM + ' : ' + totalH.secIncH + '</div>');

					},
					'json'
			);
		}
	};

	initialize.prototype.editVal = function(tr){
		if (!this.checkClicked)
		{
			var self = this;
			self.log_id = tr.attr('id');
			//set which td will be editable
			var tdArr = [1,2];

			tr.find('td').each (function(i, val) {
  				
  				if ( tdArr.indexOf(i)>-1 )
  				{
  					thisCache = $(this);
  					editableTime = thisCache.text().split(" ")[1];

  					if (i == 1)
  					{
  						var id = "start_time_new";
  						self.start_time_new = thisCache.text().split(" ")[0];
  					}
  					else
  					{
  						var id = "end_time_new";
  						self.end_time_new = thisCache.text().split(" ")[0];
  					}
  					
  					thisCache.html('<input type="text" id="'+id+'" value="'+editableTime+'" style="width: 105px; background-color: rgb(188, 241, 255);"></input>');
  				}
			}); 

			tr.append('<span class="apply"></span>')

			self.checkClicked=true;
		}
	};

	initialize.prototype.applyChanges = function(){
		
		this.start_time_new = $.trim( this.start_time_new + ' ' + $("#start_time_new").val());
		this.end_time_new 	= $.trim( this.end_time_new + ' ' + $("#end_time_new").val() );

		if (this.start_time_new != "" && this.end_time_new != "" )
		{
			$.post("getDataLogs.php",
	    			{ 	Action : "edit_logs", 
	    				start_time_new : this.start_time_new, 
	    				end_time_new : this.end_time_new,
	    				log_id : this.log_id
	    			},
	    				function(res)
						{
							notifier.msgsDiv( $("#logs_info") );
							notifier.info ("הנתונים עודכנו בהצלחה!")
						}
			);
	
		}
		else
			notifier.info ("נא לציין זמן תקין, בדוק שזמן ההתחלה קטן מזמן הסיום.");

	};

	var notifier = {
		msgsDiv : function(div){
			this.div = div;
		},
		info : function(msg){
			this.div.css("display", "block");
			this.div.html(msg);
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
			this.div.html("ברוכים הבאים!<br />אנא בחר שם ולאחר מכן סנן לפי תאריך");
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
	

	oTable = $('#example').dataTable({
		"bJQueryUI": true,
		"sPaginationType": "full_numbers"
	});

	$( ".datepicker" ).hide(); 

	$( "#from, #to" ).datepicker({
	  showOn: "button",
      buttonImage: "images/calendar.gif",
      buttonImageOnly: true,
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 1,
      onClose: function( selectedDate ) {
        $( "#to" ).datepicker( "option", "minDate", selectedDate );
      },
      dateFormat: 'yy-mm-dd'
    });

	$("#users_selection").on('change', function(){
		var user_id = $("#users_selection option:selected").attr("user_id");
		$( ".datepicker" ).fadeIn(300);
		init.set_user(user_id);
		init.getLogs();	
	});

	$("#from").on('change', function(){
		init.set_start( $(this).val() );
		init.getLogs();
	});

	$("#to").on('change', function(){
		init.set_end( $(this).val() );
		init.getLogs();		
	});

	$("#refresh").on('click', function(){
		location.reload();
	});

	$(document).on("click", "tr", function(){
		init.editVal( $(this) );
	});

	$(document).on("click", "span.apply", function(){
		init.applyChanges();
	});

});