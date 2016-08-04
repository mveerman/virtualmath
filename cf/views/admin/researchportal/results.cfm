<cfsilent>
    <cfset viewState.copyToScope(variables, "myself,xe.view,searchFormBean,searchResultBean")>
    <cfset variables.viewEvent = myself & xe.view/>

</cfsilent>

<cfif searchFormBean.isSearchStarted()>
    <cfoutput>
        <div class="rp-results-container">
        <input type="hidden" name="currentPage" value="#searchResultBean.getCurrentPage()#" />

        <cfset results = searchResultBean.getResultQuery()>
        <cfif searchResultBean.getTotal() gt 0>
                <table class="rp-results">
                    <tr class="header">
                        <th class="first-column"></th>
                        <th>Datum</th>
                        <th>Uniek ID</th>
                        <th>School</th>
                        <th>Niveau</th>
                        <th class="last-column"></th>
                    </tr>
                <cfloop query="#results#" startrow="#searchResultBean.getFirstPageResult()#" endrow="#searchResultBean.getLastPageResult()#">
                    <tr class="#iif(results.currentrow mod 2, de("row-odd"), de("row-even"))#">
                        <th class="first-column">#results.currentRow#</th>
                        <td>#DateFormat(results.timestamp, "YYYY-MM-DD")# #LSTimeFormat(results.timestamp, "HH:MM:ss")#</td>
                        <td>#results.entry_id#</td>
                        <td>#results.schoolname#</td>
                        <td>#results.score#</td>
                        <th class="last-column">
                            <a href="#viewEvent#&entry_id=#results.entry_id#" target="rp-results-screen"><img src="img/icons/magnifier.png"> Bekijken</a>
                        </th>
                    </tr>
                </cfloop>
                </table>
        <cfelse>
                <p class="rp-results-none">GEEN RESULTATEN GEVONDEN</p>
        </cfif>
        </div>
    </cfoutput>
</cfif>