<cfcomponent output="false">
	
	<cfscript>
		variables.defaultInstance = {
			authenticated = false,
			authorized = false,
			name = "",
			uvanetid = "",
			email = "",
			roles = ""
		}; 
		
		variables.instance = duplicate(variables.defaultInstance);
		
	</cfscript>
	
	<cffunction name="clear" access="public" output="false" returntype="void">
		<cfset variables.instance = duplicate(variables.defaultInstance) />
	</cffunction>
	
	<cffunction name="setAuthenticated" access="public" output="false" returntype="void">
		<cfargument name="authenticated" type="boolean" required="true" />
		<cfset variables.instance.authenticated = arguments.authenticated />
	</cffunction>
	
	<cffunction name="isAuthenticated" access="public" output="false" returntype="boolean">
		<cfreturn variables.instance.authenticated />
	</cffunction>
	
	<cffunction name="setAuthorized" access="public" output="false" returntype="void">
		<cfargument name="authorized" type="boolean" required="true" />
		<cfset variables.instance.authorized = arguments.authorized />
	</cffunction>
	
	<cffunction name="isAuthorized" access="public" output="false" returntype="boolean">
		<cfreturn variables.instance.authorized />
	</cffunction>
	
	<cffunction name="isLoggedIn" access="public" output="false" returntype="boolean">
		<cfreturn isAuthenticated() AND isAuthorized() />
	</cffunction>
	
	<cffunction name="setUvAnetId" access="public" output="false" returntype="void">
		<cfargument name="UvAnetId" type="string" required="true" />
		<cfset variables.instance.UvAnetId = arguments.UvAnetId />
	</cffunction>
	
	<cffunction name="getUvAnetId" access="public" output="false" returntype="string">
		<cfreturn variables.instance.UvAnetId />
	</cffunction>
	
	<cffunction name="setName" access="public" output="false" returntype="void">
		<cfargument name="Name" type="string" required="true" />
		<cfset variables.instance.Name = arguments.Name />
	</cffunction>
	
	<cffunction name="getName" access="public" output="false" returntype="string">
		<cfreturn variables.instance.Name />
	</cffunction>
	
	<cffunction name="setEmail" access="public" output="false" returntype="void">
		<cfargument name="email" type="string" required="true" />
		<cfset variables.instance.email= arguments.email/>
	</cffunction>
	
	<cffunction name="getEmail" access="public" output="false" returntype="string">
		<cfreturn variables.instance.email/>
	</cffunction>
</cfcomponent>