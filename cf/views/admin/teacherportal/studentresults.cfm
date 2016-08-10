<cfsilent>
    <cfset viewState.copyToScope(variables, "isTeacher,myself,teacherPortal.entries,xe.view,xe.list")>
    <cfset variables.listEvent = myself & xe.list  />
    <cfset variables.viewEvent = myself & xe.view  />
</cfsilent>

<cfoutput><div class="container">
    <div class="row main-row">
        <div class="12u">
                <h3>Lerarenportaal</h3>
                <h4>Bekijk resultaten leerlingen</h4>
                <hr />
        </div>
        <div class="12u">
            <div class="rp-results-container">
                <table class="rp-results">
                    <tr class="header">
                        <th align="left">Datum</th>
                        <th align="left">Naam</th>
                        <th align="left">School</th>
                        <th align="left">Score</th>
                        <th class="last-column"><a href="#listEvent#"><img src="img/icons/arrow_circle_double.png"> Verversen</a></th>
                    </tr>

                    <cfloop query="teacherPortal.entries">
                    <tr>
                        <td>#DateFormat(teacherPortal.entries.timestamp, "YYYY-MM-DD")# #LSTimeFormat(teacherPortal.entries.timestamp, "HH:MM:ss")#</td>
                        <td>#teacherPortal.entries.name#</td>
                        <td>#teacherPortal.entries.schoolname#</td>
                        <td>#teacherPortal.entries.score#</td>
                        <th class="last-column"><a href="#viewEvent#&entry_id=#teacherPortal.entries.entry_id#" target="rp-results-screen"><img src="img/icons/magnifier.png"> Bekijken</a></th>
                    </tr>
                    </cfloop>
                </table>
            </div>
        </div>
    </div>
</div>
</cfoutput>