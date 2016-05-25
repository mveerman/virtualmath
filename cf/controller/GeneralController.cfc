<cfcomponent displayname="GeneralController" extends="ModelGlue.gesture.controller.Controller" output="false" beans="">
	
	<cffunction name="Init" access="Public" returnType="any" output="false">
		<cfargument name="ModelGlue" required="true" type="ModelGlue.ModelGlue" />
		<cfargument name="InstanceName" required="true" type="string" />
		
		<cfset var appConfig="" />
		
		<cfset super.Init(arguments.ModelGlue) />
		
		<!--- Check Database model --->
		<cfset getModelGlue().getBean("DatabaseManager").checkAndUpgrade() />
		
		<cfreturn this />
	</cffunction>
	
	<cffunction name="onRequestStart" access="public" returnType="void" output="false">
		<cfargument name="event" type="any" />
		
		<!--- Check if session.userinfo exists --->
		<cfif NOT StructKeyExists(session, "userinfo") OR NOT IsObject(session.userinfo) OR (IsDefined("url.init") AND url.init)>
			<cfset session.userInfo = getModelGlue().getBean("UserInfoBean") />
		</cfif>

		<!--- Set values --->
		<cfset arguments.event.setValue('appconfig', getModelGlue().getBean('AppConfig')) />
		
		
	</cffunction>
	
	<cffunction name="checkEnvironment" access="public" returnType="void" output="false">
		<cfargument name="event" type="any" />
		
		<cfif REFind("/admin.cfm", cgi.SCRIPT_NAME)>
			<cfset arguments.event.addResult( "isadmin" )>
		<cfelse>
			<cfparam name="session.userinfo" default="#getModelGlue().getBean("UserInfoBean")#">
			
			<cfset arguments.event.addResult( "isfront" )>
			<cfset arguments.event.setValue('userinfo', session.userinfo) />
			<!---<cfset arguments.event.setValue('language', beans.I18nService.getUserLanguageRecord()) />--->
		</cfif>
		
		
	</cffunction>
	
</cfcomponent>