<cfset setlocale("Dutch (Standard)")>
<cfset viewstate.setValue('title', 'VirtualMath - Teacher login')>


<cfoutput><!DOCTYPE html>
<!--[if lt IE 7]>
<html lang="en" ng-app="virtualMath" class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>
<html lang="en" ng-app="virtualMath" class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>
<html lang="en" ng-app="virtualMath" class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html lang="en" ng-app="virtualMath" class="no-js"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>VirtualMath</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->
    <link rel="stylesheet" href="app/bower_components/html5-boilerplate/dist/css/normalize.css">
    <link rel="stylesheet" href="app/bower_components/html5-boilerplate/dist/css/main.css">
    <link rel="stylesheet" href="app/assets/css/main.css">
    <link rel="stylesheet" href="css/admin.css">
    <!--[if lte IE 9]><link rel="stylesheet" href="app/assets/css/ie9.css" /><![endif]-->
    <link rel="stylesheet" href="app/app.css">
    <script src="app/bower_components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js"></script>
</head>
<body ng-controller="SurveyController">
<div id="page-wrapper">
    <div id="header-wrapper">
        #viewcollection.getView( "admin.header" )#
    </div>

    <div id="main">


        <!--[if lt IE 7]>
		<p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a
				href="http://browsehappy.com/">upgrade
			your browser</a> to improve your experience.</p>
        <![endif]-->

        #viewcollection.getView( "admin.body" )#


    </div>

    <div id="footer-wrapper">
		#viewcollection.getView( "admin.footer" )#
        <!---<div class="container">
            <div class="row">
                <div class="12u">
                    <div id="copyright">
                        &copy; HvA &ndash; ICT Services &ndash; O&O &mdash; VirtualMath: v<span app-version></span>
                    </div>
                </div>
            </div>
        </div>--->
    </div>
</div>

<!-- Scripts -->
<script src="app/assets/js/jquery.min.js"></script>
<script src="app/assets/js/skel.min.js"></script>
<script src="app/assets/js/skel-viewport.min.js"></script>
<script src="app/assets/js/util.js"></script>
<!--[if lte IE 8]><script src="app/assets/js/ie/respond.min.js"></script><![endif]-->
<script src="app/assets/js/main.js"></script>
</body>
</html>
</cfoutput>