<cfcomponent displayname="Controller" extends="ModelGlue.gesture.controller.Controller" output="false">
	
	<cffunction name="Init" access="Public" returnType="Controller" output="false" hint="I build a new SampleController">
		<cfargument name="ModelGlue" required="true" type="ModelGlue.ModelGlue" />
		<cfargument name="InstanceName" required="true" type="string" />
		
		<cfset var AppConfig = "" />
		<cfset var config = "" />
		
		<cfset super.Init(arguments.ModelGlue) />
		
		<cfset AppConfig = getModelGlue().getBean('AppConfig') />
		<cfset config = AppConfig.getConfig() />
		<cfset config.ldapAddress = application.settings.application.ldap.server.xmlText />
		<cfset config.ldapPort = application.settings.application.ldap.port.xmlText />
		<cfset config.ldapUseSecureConnection = application.settings.application.ldap.useSecureConnection.xmlText />
		<cfset config.ldapAdminUser = application.settings.application.ldap.username.xmlText />
		<cfset config.ldapAdminPass = application.settings.application.ldap.password.xmlText />
		<cfset AppConfig.setConfig(config) />
		
		<cfreturn this />
	</cffunction>
	
	<!--- 
		Any function set up to listen for the onRequestStart message happens before any of the <event-handlers>.
		This is a good place to put things like session defaults.
	--->
	<cffunction name="onRequestStart" access="public" returnType="void" output="false">
	  	<cfargument name="event" type="any">
	  
	</cffunction>

	<!--- 
		Any function set up to listen for the onQueueComplete message happens after all event-handlers are
		finished running and before any views are rendered.  This is a good place to load constants (like UDF
		libraries) that the views may need.
	--->
	<cffunction name="onQueueComplete" access="public" returnType="void" output="false">
	  <cfargument name="event" type="any">
	</cffunction>
	
	<cffunction name="onApplicationStart" access="public" returnType="void" output="false">
	  <cfsilent><cfapplication name="docvhjaar" sessionmanagement="true" applicationtimeout="#CreateTimeSpan(0,0,1,0)#" scriptprotect="all" sessiontimeout="#CreateTimeSpan(0,0,1,0)#"/>
	  <cfinclude template="/ModelGlue/ModelGlue.cfm" /></cfsilent>
	</cffunction>

	<!--- 
		Any function set up to listen for the onRequestEnd message happens after views are rendered.
	--->
	<cffunction name="onRequestEnd" access="public" returnType="void" output="false">
	  <cfargument name="event" type="any">
	</cffunction>
	
</cfcomponent>