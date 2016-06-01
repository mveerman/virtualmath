<!---
	This gateway manages all initial orm handling regarding users.
	
	It is NOT used for data tweaking. This should be done in the calling 
	service using the methods the ORM provides.
	
	Users define the editors.
--->
<cfcomponent extends="BasicGateway" displayname="UserGateway" output="false">
	
	<cfset baseclass = "application.users">
	
	<!--- 
		Get a UserRecord by providing username and password hash. 
		An error is thrown when the authentication fails. 
		
		@param username - username of the record to retrieve.
		@param password - password of the record to retrieve.
		@throws UserAuthenticationError no record with provided credentials 
										is found
	--->
	<cffunction access="public" name="authenticate" returntype="Transfer.com.TransferObject" output="false">
		<cfargument name="username" type="string" required="true">
		<cfargument name="password" type="string" required="true">
		
		<cfset var user = getOrmService().getTransfer().readByPropertyMap(baseclass, arguments)>

		<cfif user.getisPersisted()>
			<cfreturn user>
		<cfelse>
			<cfthrow type="UserAuthenticationError" message="Authentication failed">
		</cfif>
		
	</cffunction>
	
</cfcomponent>