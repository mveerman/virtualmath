<cfsilent>
    <cfset viewState.copyToScope(variables, "isAdministrator,isTeacher,isResearcher")>
</cfsilent>

<cfoutput><div class="container">
    <div class="row main-row">
        <div class="12u">
            <section>
                <h3>Welkom bij het administratieportaal voor de <i>Interactive VirtualMath</i> demo-applicatie</h3>
                <p>
                    In dit portaal kan onderzoek gedaan worden naar antwoorden die zijn ingevoerd via de VirtualMath
                    demo-applicatie. Er zijn verschillende rollen waarmee ingelogd kan worden. Voor leraren is het
                    mogelijk om de resultaten van leerlingen te volgen. Voor onderzoekers is het mogelijk om
                    geanonimiseerd onderzoek te doen naar bijvoorbeeld trends in het gebruik van de applicatie. Rollen
                    worden toegekend door beheerders.
                </p>
                <p>Voor u zijn de volgende functies beschikbaar:</p>
            </section>
        </div>
    </div>
    <div class="row admin-function-block">
        <cfif isTeacher or isAdministrator>
            <div class="4u 6u(mobile)">
                <section>
                    <h4>Lerarenportaal</h4>
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
                    <h4>Onderzoekersportaal</h4>
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
                        <h4>Systeemportaal</h4>
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