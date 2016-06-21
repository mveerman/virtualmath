<cfsilent>
    <cfset viewState.copyToScope(variables, "isAdministrator,isTeacher,isResearcher,myself,system.userQuery,xe.delete,xe.edit,xe.list,xe.view")>
    <cfset variables.deleteEvent = myself & xe.delete  />
    <cfset variables.editEvent = myself & xe.edit  />
    <cfset variables.listEvent = myself & xe.list  />
    <cfset variables.viewEvent = myself & xe.view  />
</cfsilent>

<cfoutput><div class="container">
    <div class="row main-row">
        <div class="12u">
            <section>
                <h3>Beheer gebruikers</h3>
                <p>
                    Hier kunnen alle systeemgebruikers, leraren en onderzoekers beheerd worden.
                </p>
            </section>
        </div>
        <div class="8u">
            <table width="100%">
                <tr>
                    <th align="left">Gebruikersnaam</th>
                    <th align="left">Omschrijving</th>
                    <th align="left"><span title="Administrator">A</span></th>
                    <th align="left"><span title="Teacher">T</span></th>
                    <th align="left"><span title="Researcher">R</span></th>
                    <th align="left">&nbsp;</th>
                    <th align="left">&nbsp;</th>
                </tr>

                <cfloop query="system.userQuery">
                <tr>
                    <td><a href="#viewEvent#&user_id=#system.userQuery.user_id#">#system.userQuery.username#</a></td>
                    <td><a href="#viewEvent#&user_id=#system.userQuery.user_id#">#system.userQuery.name#</a></td>
                    <td><input type="checkbox" disabled<cfif system.userQuery.admin> checked</cfif>></td>
                    <td><input type="checkbox" disabled<cfif system.userQuery.teacher> checked</cfif>></td>
                    <td><input type="checkbox" disabled<cfif system.userQuery.researcher> checked</cfif>></td>
                    <td><a href="#editEvent#&user_id=#system.userQuery.user_id#"><img src="img/icons/pencil.png" alt="Bewerken" border="0" /></a></td>
                    <td><a href="#deleteEvent#&user_id=#system.userQuery.user_id#"><img src="img/icons/cross.png" alt="Verwijderen" border="0" /></a></td>
                </tr>
                </cfloop>
            </table>
        </div>
        <div class="4u">
            <a href="#editEvent#"><button class=""><img src="img/icons/user__plus.png" alt="Nieuwe gebruiker" border="0" /> Nieuwe gebruiker toevoegen</button></a>
        </div>
    </div>
</div>
</cfoutput>