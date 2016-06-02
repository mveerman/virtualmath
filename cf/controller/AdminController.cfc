<cfcomponent displayname="AdminController" extends="ModelGlue.gesture.controller.Controller" output="false">
	
	<cffunction name="onRequestStart" access="public" returnType="void" output="false">
		<cfargument name="event" type="any" />
		
		<cfset var role="" />
		<cfset var userroles = "">
		<cfset var role_id = "">
		
		<cfset event.setValue("isAdministrator", false)>
		<cfset event.setValue("isTeacher", false)>
		<cfset event.setValue("isResearcher", false)>

		<cfif StructKeyExists(session, "adminUser")>
			<cfif session.adminUser.getAdmin() eq true>
				<cfset event.setValue("isAdministrator", true)>
			</cfif>
			<cfif session.adminUser.getTeacher() eq true>
				<cfset event.setValue("isTeacher", true)>
			</cfif>
			<cfif session.adminUser.getResearcher() eq true>
				<cfset event.setValue("isResearcher", true)>
			</cfif>
		</cfif>
		
	</cffunction>
	
	<!--- Check if the current user is logged in or not --->
	<cffunction name="isAuthenticated" access="public" returnType="void" output="false">
		<cfargument name="event" type="any" />
		
		<cfif not StructKeyExists(session, "adminUser")>
			<cfset event.addResult("notAuthenticated")>
		</cfif>
		
	</cffunction>
	
	<!--- do authentication if necessary --->
	<cffunction name="doAuthentication" access="public" returnType="void" output="false">
		<cfargument name="event" type="any" />
		
		<cfif StructKeyExists(session, "adminUser")>
			<cfset event.addResult("isauthenticated")>
		<cfelse>
			
			<cfif event.exists("username") AND event.exists("password")>
				<cftry>
					<cfset session.adminUser = beans.AdminSecurityService.authenticate(event.getValue("username"), hash(event.getValue("password")))>
					<cfset event.addResult("isauthenticated")>
				<cfcatch type="UserAuthenticationError">
					<cfset event.addResult("logininvalid")>
				</cfcatch>
				<cfcatch type="any">
					<cfrethrow>
				</cfcatch>
				</cftry>
			</cfif>
		</cfif>
		
	</cffunction>
	
	<!--- do authentication if necessary --->
	<cffunction name="doLogout" access="public" returnType="void" output="false">
		<cfargument name="event" type="any" />
		
		<cfset StructDelete(session, "adminUser")>
	</cffunction>
	
	<!--- 
		Check if the current user is authorized for a specific role.
		
		@requires argument "role"
		@result	SecurityViolation
	--->
	<cffunction name="checkRole" access="public" returnType="void" output="false">
		<cfargument name="event" type="any" />
		
		<cfset var role="" />
		<cfset var userroles = "">
		<cfset var role_id = "">
		
		<cfloop list="#event.getArgument("role")#" index="role">
			<cfset userroles = session.adminUser.getRoleStruct()>
			<cfloop collection="#userroles#" item="role_id">
				<cfif userroles[role_id].getRoleKey() eq role>
					<cfreturn />
				</cfif>
			</cfloop>
		</cfloop>
		
		<!--- If not returned the user does not match any role --->
		<cfset event.addResult("SecurityViolation") />
				
	</cffunction>

</cfcomponent>