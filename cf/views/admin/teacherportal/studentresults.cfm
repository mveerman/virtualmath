<cfsilent>
    <cfset viewState.copyToScope(variables, "isTeacher,myself,teacherPortal.entries,xe.view")>
    <cfset variables.viewEvent = myself & xe.view  />
</cfsilent>

<cfoutput><div class="container">
    <div class="row main-row">
        <div class="12u">
            <section>
                <h3>Lerarenportaal</h3>
                <p>
                    Bekijk hier alle ingediende opgaven
                </p>
            </section>
        </div>
        <div class="12u">
            <table width="100%">
                <tr>
                    <th align="left">Datum</th>
                    <th align="left">Naam</th>
                    <th align="left">School</th>
                    <th align="left">Score</th>
                    <th></th>
                </tr>

                <cfloop query="teacherPortal.entries">
                <tr>
                    <td>#DateFormat(teacherPortal.entries.timestamp, "YYYY-MM-DD")# #LSTimeFormat(teacherPortal.entries.timestamp, "HH:MM:ss")#</td>
                    <td>#teacherPortal.entries.name#</td>
                    <td>#teacherPortal.entries.schoolname#</td>
                    <td>#teacherPortal.entries.score#</td>
                    <th><a href="#viewEvent#&entry_id=#teacherPortal.entries.entry_id#"><button><img src="img/icons/magnifier.png"> Bekijken</button></a></th>
                </tr>
                </cfloop>
            </table>
        </div>
    </div>
</div>
</cfoutput>