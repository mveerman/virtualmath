<cfset viewState.copyToScope(variables, "isadministrator,iseditor")>

<cfoutput>
<a href="#viewstate.linkto('admin.home')#">Home</a>

<cfif isadministrator or iseditor>
<a href="#viewstate.linkto('view.category.List')#">Resultaten</a>
</cfif>
<cfif isadministrator>
<a href="#viewstate.linkto('security.user.List')#">Gebruikersbeheer</a>
</cfif>

<a href="#viewstate.linkto('admin.logout')#">Uitloggen</a>
</cfoutput>