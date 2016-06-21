<cfcomponent displayname="SystemController" extends="ModelGlue.gesture.controller.Controller" output="false" beans="AdminSecurityService">
	
	<cffunction name="preparePasswords" access="public" returnType="void" output="false">
		<cfargument name="event" type="any" />

		<cfif event.getValue('password') eq "">
			<cfset structDelete(form, 'password')>
			<cfset event.removeValue('password')>
		<cfelse>
			<cfset var saltedPassword = beans.AdminSecurityService.saltPassword(form.password)>
            <cfset structUpdate(form, 'password', saltedPassword)>
            <cfset event.setValue('password', saltedPassword)>
		</cfif>

	</cffunction>

</cfcomponent>