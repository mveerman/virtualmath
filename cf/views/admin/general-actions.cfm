<cfoutput>
    <div class="admin-general-actions-box">
    <div class="action first"><cfoutput>#session.adminuser.getName()# </cfoutput>(
    <cfif session.adminUser.getAdmin()>
            ADMINISTRATOR
    <cfelse>
            TEACHER
    </cfif>
        )</div>
    <div class="action last"><cfoutput><a href="#viewstate.linkto('admin.logout')#">Uitloggen</a></cfoutput></div>
</div>
</cfoutput>
