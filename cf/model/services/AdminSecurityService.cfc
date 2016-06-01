<cfcomponent displayname="AdminSecurityService" output="false">
	
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
	
	<cffunction name="authenticate" access="public" output="false" returntype="transfer.com.TransferObject">
		<cfargument name="username" required="true" type="string">
		<cfargument name="password" required="true" type="string">
		
		<cfreturn getUserGateway().authenticate(username, password)>
		
	</cffunction>
	
</cfcomponent>