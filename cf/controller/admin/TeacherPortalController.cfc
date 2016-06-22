<cfcomponent displayname="TeacherPortalController" extends="ModelGlue.gesture.controller.Controller" output="false" beans="EntriesGateway">
	
	<cffunction name="getStudentEntriesForTeacher" access="public" returnType="void" output="false">
		<cfargument name="event" type="any" />
		
		<cfset var isTeacher = event.getValue("isTeacher") />
        <cfset event.setValue('teacherPortal.entries', queryNew("entryid"))>

        <cfif isTeacher>
            <cfset event.setValue('teacherPortal.entries', beans.EntriesGateway.list())> <!--- TODO: pass teacher --->
        <cfelse>
            <cfset event.setValue('teacherPortal.entries', beans.EntriesGateway.list())>
        </cfif>

	</cffunction>

</cfcomponent>