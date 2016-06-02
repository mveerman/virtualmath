<cfsilent>
    <cfset viewState.copyToScope(variables, "isAdministrator,isTeacher,isResearcher")>
</cfsilent>

<cfoutput><div class="container">
    <div class="row main-row">
        <div class="12u">
            <section>
                <h3>Administratiemodule voor de VirtualMath applicatie</h3>
                <p>
                    Hier kan wat beschrijvende tekst komen
                </p>
            </section>
        </div>
    </div>
    <div class="row admin-function-block">
        <cfif isTeacher or isAdministrator>
            <div class="4u 6u(mobile)">
                <section>
                    <h4>Docenten</h4>
                    <p>Alle toepassingen voor de docent</p>
                    <nav>
                        <ul>
                            <li><a href="#viewstate.linkto('admin.teacherportal.studentresults')#">Bekijk resultaten leerlingen</a></li>
                        </ul>
                    </nav>
                </section>
            </div>
        </cfif>
        <cfif isResearcher or isAdministrator>
            <div class="4u 6u(mobile)">
                <section>
                    <h4>Onderzoekers</h4>
                    <p>Alle toepassingen voor de onderzoeker</p>
                    <nav>
                        <ul>
                            <li><a href="#viewstate.linkto('admin.researchportal.search')#">Doorzoek resultaten (anoniem)</a></li>
                        </ul>
                    </nav>
                </section>
            </div>
        </cfif>
        <cfif isAdministrator>
                <div class="4u 6u(mobile)">
                    <section>
                        <h4>Systeem</h4>
                        <p>Alle systeemfuncties</p>
                        <nav>
                            <ul>
                                <li><a href="#viewstate.linkto('admin.system.usermanagement')#">Beheer gebruikers</a></li>
                            </ul>
                        </nav>
                    </section>
                </div>
        </cfif>
    </div>
</div>
</cfoutput>