<cfcomponent output="false">

<!--- Application settings --->
<cfscript>
	this.name = 'virtualmath';
	this.sessionmanagement = true;
	this.setclientcookies = true;
	this.sessiontimeout = CreateTimeSpan(0,0,60,0); // 1 hour
	this.applicationtimeout = CreateTimeSpan(2,0,0,0); // 2 days
	this.scriptprotect = "all";
	this.loginstorage = "session";
	
	// set mappings
	this.mappings["/ColdSpring"] 	= ExpandPath("../lib/ColdSpring");
	this.mappings["/ModelGlue"] 	= ExpandPath("../lib/ModelGlue");
	this.mappings["/Transfer"] 		= ExpandPath("../lib/Transfer");
	this.mappings["/virtualmath"] 	= ExpandPath("../");
	</cfscript>
	
	<cffunction name="onApplicationStart" access="public" output="false" returntype="void">
		<cfscript>
			application.errorlog = "virtualmath-err";
			application.infolog = "virtualmath-info";
			application.securitylog = "virtualmath-audit";
			
			application.ERROR_FATAL = "virtualmath-fatal";
			application.ERROR_ERROR = "virtualmath-error";
			application.ERROR_WARNING = "virtualmath-warning";
			application.ERROR_INFO = "virtualmath-info";
			
			application.applicationXML = ExpandPath("/virtualmath/application.xml");
			application.applicationXSD = ExpandPath("/virtualmath/application.xsd");
			
		</cfscript>
		
		<cflog 
			application="true" 
			file="#application.infolog#" 
			type="information"  
			text="Starting application VirtualMath">
		
		<cfscript>
			application.settings = readApplicationXML(application.applicationXML, application.applicationXSD);
			setMode(application.settings.application.mode.xmlText);
			setDatabaseName(application.settings.application.dbname.xmlText);
			application.dbOwner = application.settings.application.dbowner.xmlText;
			application.hostname = application.settings.application.hostname.xmlText;
			application.skin = application.settings.application.skin.xmlText;
		</cfscript>
	
	</cffunction>
	
	<cffunction name="readApplicationXML" access="private" returnType="xml" output="false">
		<cfargument name="applicationXML" type="String" required="true" >
		<cfargument name="applicationXSD" type="String" required="true" >
		
		<cfset var xml = "">
	
		<cfif NOT FileExists(arguments.applicationXML)>
			<cflog 
				application="true" 
				file="#application.errorlog#" 
				type="fatal" 
				text="The file #arguments.applicationXML# is not found">
			<cfthrow 
				type="#application.ERROR_FATAL#" 
				errorcode="11001"
				message="Application.xml missing"
				detail="the file #arguments.applicationXML# is not found">
		</cfif>
		
		<cftry>
			
			<cfset xml = xmlParse(arguments.applicationXML, false, arguments.applicationXSD)>
			
			<cfcatch type="expression">
				<cfif StructKeyExists(cfcatch, "proc") AND cfcatch.proc EQ "parsing">
					<cflog 
						application="true" 
						file="#application.errorlog#" 
						type="fatal" 
						text="Validation of #arguments.applicationXML# failed">
					<cfthrow 
						type="#application.ERROR_FATAL#" 
						errorcode="11002"
						message="Validation of application.xml failed"
						detail="the file #arguments.applicationXML# has no valid format">
				<cfelse>
					<cflog 
						application="true" 
						file="#application.errorlog#" 
						type="fatal" 
						text="#cfcatch.message#">
					<cfrethrow>
				</cfif>
			</cfcatch>
			<cfcatch type="any">
				<cflog 
					application="true" 
					file="#application.errorlog#" 
					type="fatal" 
					text="#cfcatch.message#">
				<cfrethrow>
			</cfcatch>
		</cftry>
		
		<cfreturn xml>
	</cffunction>
	
	<cffunction name="setMode" access="private" output="false" returntype="void">
		<cfargument name="mode" type="String" required="true" >
		
		<cfset var coldspring = ''>
		<cfset var reactor = ''>
		
		<cfset var coldSpringXmlFile = ExpandPath("/virtualmath/config/ColdSpring.xml")>
		<!---<cfset var reactorXmlFile = ExpandPath("/virtualmath/config/reactor/Reactor.xml")>--->
		
		<cfswitch expression="#arguments.mode#">
		
			<cfcase value="production">
				<cflog 
					application="true" 
					file="#application.infolog#" 
					type="information"  
					text="Setting application mode to production">
				
				<cffile 
					action="read" 
					file="#coldSpringXmlFile#"
					variable="coldspring" 
					charset="utf-8" >
					
				<cfset coldspring = REReplaceNoCase(coldspring, "<property name=""reload""><value>(true|false)</value></property>", "<property name=""reload""><value>false</value></property>", "one")> 
				<cfset coldspring = REReplaceNoCase(coldspring, "<property name=""rescaffold""><value>(true|false)</value></property>", "<property name=""rescaffold""><value>false</value></property>", "one")>
				<cfset coldspring = REReplaceNoCase(coldspring, "<property name=""debug""><value>(true|false)</value></property>", "<property name=""debug""><value>false</value></property>", "one")>
				<cfset coldspring = REReplaceNoCase(coldspring, "<property name=""mode""><value>(development|production)</value></property>", "<property name=""mode""><value>production</value></property>", "all")>
				
				<cffile 
					action="write" 
					file="#coldSpringXmlFile#" 
					output="#trim(coldspring)#" 
					addnewline="true" 
					fixnewline="true"  
					charset="utf-8">
				
				<!---<cffile 
					action="read" 
					file="#reactorXmlFile#"
					variable="reactor" 
					charset="utf-8" >
					
				<cfset reactor = REReplaceNoCase(reactor, "<mode value=""(development|production)"" />", "<mode value=""production"" />", "one")>
				
				<cffile 
					action="write" 
					file="#reactorXmlFile#" 
					output="#trim(reactor)#" 
					addnewline="true" 
					fixnewline="true"  
					charset="utf-8">--->
			</cfcase>
			
			<cfcase value="development">
				<cflog 
					application="true" 
					file="#application.infolog#" 
					type="warning"  
					text="Application mode is set to development. This causes slow response times as no caching will be performed.">
				
				<cffile 
					action="read" 
					file="#coldSpringXmlFile#"
					variable="coldspring" 
					charset="utf-8" >
					
				<cfset coldspring = REReplaceNoCase(coldspring, "<property name=""reload""><value>(true|false)</value></property>", "<property name=""reload""><value>true</value></property>", "one")> 
				<cfset coldspring = REReplaceNoCase(coldspring, "<property name=""rescaffold""><value>(true|false)</value></property>", "<property name=""rescaffold""><value>true</value></property>", "one")>
				<cfset coldspring = REReplaceNoCase(coldspring, "<property name=""debug""><value>(true|false)</value></property>", "<property name=""debug""><value>false</value></property>", "one")>
				<cfset coldspring = REReplaceNoCase(coldspring, "<property name=""mode""><value>(development|production)</value></property>", "<property name=""mode""><value>development</value></property>", "all")>
				
				<cffile 
					action="write" 
					file="#coldSpringXmlFile#" 
					output="#trim(coldspring)#" 
					addnewline="true" 
					fixnewline="true"  
					charset="utf-8">
				
				<!---<cffile 
					action="read" 
					file="#reactorXmlFile#"
					variable="reactor" 
					charset="utf-8" >
					
				<cfset reactor = REReplaceNoCase(reactor, "<mode value=""(development|production)"" />", "<mode value=""development"" />", "one")>
				
				<cffile 
					action="write" 
					file="#reactorXmlFile#" 
					output="#trim(reactor)#" 
					addnewline="true" 
					fixnewline="true"  
					charset="utf-8">--->
			</cfcase>
			
		</cfswitch>
	</cffunction>
	
	<cffunction name="setDatabaseName" access="private" output="false" returntype="void">
		<cfargument name="dbname" required="true" type="string" />
		
		<cfset var coldspring = ''>
		<cfset var transferDSF = ''>
		
		<cfset var coldSpringXmlFile = ExpandPath("/virtualmath/config/ColdSpring.xml")>
		<cfset var transferDatasourceXmlFile = ExpandPath("/virtualmath/config/transfer/Datasource.xml")>
		
		<cflog 
			application="true" 
			file="#application.infolog#" 
			type="info"  
			text="settings database to #dbname#">
		
		<cffile 
			action="read" 
			file="#coldSpringXmlFile#"
			variable="coldspring" 
			charset="utf-8" >
			
		<cfset coldspring = REReplaceNoCase(coldspring, "(<entry key=""dsn""><value>)([^<]*)(</value></entry>)", "\1#arguments.dbname#\3", "one")>
		<cfset coldspring = REReplaceNoCase(coldspring, "(<property name=""datasource""><value>)([^<]*)(</value></property>)", "\1#arguments.dbname#\3", "one")>
		
		<cffile 
			action="write" 
			file="#coldSpringXmlFile#" 
			output="#trim(coldspring)#" 
			addnewline="true" 
			fixnewline="true"  
			charset="utf-8">
			
		<cffile 
			action="read" 
			file="#transferDatasourceXmlFile#"
			variable="reactor" 
			charset="utf-8" >
			
		<cfset transferDSF = REReplaceNoCase(reactor, "(<name>)([^<]*)(</name>)", "\1#arguments.dbname#\3", "one")>
		
		<cffile 
			action="write" 
			file="#transferDatasourceXmlFile#" 
			output="#trim(transferDSF)#" 
			addnewline="true" 
			fixnewline="true"  
			charset="utf-8">
		
	</cffunction>

<cffunction name="onSessionStart"  output="false">
	<!--- Not sure anyone'll ever need this...
	<cfset invokeSessionEvent("modelglue.onSessionStartPreRequest", session, application) />
	--->
	<!--- Set flag letting MG know it needs to broadcast onSessionStart before onRequestStart --->
	<cfset request._modelglue.bootstrap.sessionStart = true />
</cffunction>

<cffunction name="onSessionEnd" output="false">
	<cfargument name="sessionScope" type="struct" required="true">
	<cfargument name="appScope" 	type="struct" required="false">

	<cfset invokeSessionEvent("modelglue.onSessionEnd", arguments.sessionScope, appScope) />
</cffunction>

<cffunction name="invokeSessionEvent" output="false" access="private">
	<cfargument name="eventName" />
	<cfargument name="sessionScope" />
	<cfargument name="appScope" />

	<cfset var mgInstances = createObject("component", "ModelGlue.Util.ModelGlueFrameworkLocator").findInScope(appScope) />
	<cfset var values = structNew() />
	<cfset var i = "" />

	<cfset values.sessionScope = arguments.sessionScope />

	<cfloop from="1" to="#arrayLen(mgInstances)#" index="i">
		<cfset mgInstances[i].executeEvent(arguments.eventName, values) />
	</cfloop>
</cffunction>

<cffunction name="onRequestStart" output="false">
	<cfset request.isInclude = false />

    <cfset request.skin = application.skin>
    <cfif isDefined("url.skin") and listFind("hva,uva", url.skin) gt 0>
        <cfset request.skin = url.skin>
    </cfif>
</cffunction>


</cfcomponent>