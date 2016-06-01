<!---**********************************************************************
* $URL: https://source.ic.uva.nl/repos/svn/docvhjaar/trunk/Application/views/templates/page.cfm $
* $Id: page.cfm 276 2015-10-19 13:36:10Z mveerma1 $
***********************************************************************--->
<!--- 

	This is the wrapper for the page. It is used for both front and admin, 
	so it should only display the most generic of code
	
	@embeds value "title"
	@embeds value "head"
	@embeds view "body"
--->

<!---<cfsetting enablecfoutputonly="false" showdebugoutput="false">--->
<cfsetting enablecfoutputonly="false" showdebugoutput="true">

<cfheader name="Content-Type" value="text/html; charset=UTF-8" />

<cfcontent type="text/html; charset=UTF-8" reset="true">
<cfoutput><!doctype html>
<html class="no-js" lang="nl">
<head>
    <meta charset="utf-8"/>
    <title>#viewstate.getValue('title', '')#</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="description" content="Docent van het Jaar nominatie applicatie" lang="nl" />
    <link rel="shortcut icon" href="/img/favicon-#request.skin#.ico" type="image/ico" />
	#viewstate.getValue('head', '')#
</head>
<body #viewstate.getValue('body.attributes', '')#>
	#viewcollection.getView("body")#
</body>
</html></cfoutput>