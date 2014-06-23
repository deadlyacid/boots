
<html>
<body>
	<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title></title>

    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap theme -->
    <link href="css/bootstrap-theme.min.css" rel="stylesheet">
<link href="http://trentrichardson.com/examples/timepicker/jquery-ui-timepicker-addon.css">
    <!-- Custom styles for this template -->
    <link href="css/bootstrap-theme.css" rel="stylesheet">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
    <style type="text/css" title="currentStyle">
            @import "css/demo_page.css";
            @import "css/demo_table_jui.css";
            @import "css/jquery-ui-1.8.4.custom.css";
    </style>
<div class="container">
	
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">שעון נוכחות - קניון הצעצועים (דוח נוכחות)</h3>
        </div>
        <div class="panel-body">
            <div id="msgs"></div>
            <div class="jumbotron" style="height: 900px;">
                <label id="refresh">רענן</label>
                <select class="form-control" class="users_selection" id="users_selection">
                </select>
                <div class="datepicker">
                    <label for="from">מתאריך</label>
                    <input type="text" id="from" name="from">
                    <label for="to">עד לתאריך</label>
                    <input type="text" id="to" name="to"><br />
                    <span style="font-size: smaller;">
                        מקרא צבעים - שעות נוספות: <br />
                        <span style="background-color: rgb(255, 181, 108);">כתום - בין 8 ל- 10 שעות.</span>
                        <br />
                        <span style="background-color: rgb(255, 154, 154);">אדום - מעל ל10 שעות.</span>
                    </span>
                </div>

                <div id="tim_table">
                    
                    <table cellpadding="0" cellspacing="0" border="0" class="display" id="example">
                        <thead>
                            <tr>
                                <th>שם</th>
                                <th>זמן התחלה</th>
                                <th>זמן סיום</th>
                                <th>יום בשבוע</th>
                                <th>סה"כ זמן עבודה</th>
                            </tr>
                        </thead>
                            <tbody>

                            </tbody>
                        </table>

                </div>
                <div id="logs_info"></div>
                <br><br><br>
                <div id="self_add" style="clear:both; direction: rtl; margin-top: 25px; color: rgb(61, 124, 236); font-weight: bold; cursor: pointer; font-size: 16px;">הוספה ידנית</div>
                    <div id="self_add_container">
                        <select class="form-control" class="sa_users_selection" id="sa_users_selection" style="width: 280px;float:right;">
                        </select><br><br>
                       <div class="datepicker" id="sa_datepicker">
                            <label for="sa_from">תאריך</label>
                            <input type="text" id="sa_date" name="sa_date">
                            <br>
                            <label for="sa_time_from">משעה</label>
                            <input type="text" class="time-picker" id="sa_time_from" name="sa_time_from" style="width: 80px; margin-right: 13px;"><br />
                            <label for="sa_time_to">עד שעה</label>
                            <input type="text" class="time-picker" id="sa_time_to" name="sa_time_to" style="width: 80px; "><br />
                            <br>
                             <button type="button" class="btn btn-primary btn-xs btn-self-add">הזן</button>
                        </div> 
                    </div>
                
            </div>

        </div>
    </div>
    
	
</div>
<script src="js/jquery-1.11.0.js"></script>
<script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
<script type="text/javascript" language="javascript" src="js/jquery.dataTables.js"></script>
<script type="text/javascript" language="javascript" src="js/jquery-timepicker.js"></script>

<script type="text/javascript" src="js/tim_logs.js"></script>
</body>
</html>


 
