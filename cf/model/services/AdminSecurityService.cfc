<cfcomponent displayname="AdminSecurityService" output="false" beans="AppConfig">

	<!--- Beans variable containing all the auto-wired beans --->
	<cfset variables.beans = {}>

	<!--- Getters and setters are loaded via auto-wiring --->

    <cffunction name="setUserGateway" access="public" output="false" returntype="void">
		<cfargument name="UserGateway" type="any" required="true">
		<cfset beans.UserGateway=UserGateway>
	</cffunction>

	<cffunction name="getUserGateway" access="public" output="false" returntype="any">
		<cfreturn beans.UserGateway>
	</cffunction>

    <cffunction name="setAppConfig" access="public" output="false" returntype="void">
        <cfargument name="AppConfig" type="any" required="true">
        <cfset beans.AppConfig=AppConfig>
    </cffunction>

    <cffunction name="getAppConfig" access="public" output="false" returntype="any">
        <cfreturn beans.AppConfig>
    </cffunction>

	<cffunction name="authenticate" access="public" output="false" returntype="transfer.com.TransferObject">
		<cfargument name="username" required="true" type="string">
		<cfargument name="password" required="true" type="string">

		<cfreturn getUserGateway().authenticate(username, password)>
	</cffunction>

	<cffunction name="saltPassword" access="public" output="false" returntype="String">
		<cfargument name="unsaltedPassword" required="true" type="string">

        <cfset var saltkey="#getAppConfig().getConfigSetting('saltkey')#">
        <cfreturn encrypt(unsaltedPassword, saltkey, "DESEDE") />
	</cffunction>
	
</cfcomponent>