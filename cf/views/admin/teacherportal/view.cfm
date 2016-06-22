<cfsilent>
    <cfset viewState.copyToScope(variables, "isTeacher,myself,entryRecord,xe.list")>
    <cfset variables.listEvent = myself & xe.list/>
</cfsilent>

<cfoutput>
<div class="container">
    <div class="row main-row">
        <div class="12u">
            <section>
                <h3>Lerarenportaal</h3>
                <div id="breadcrumb"><a href="#listEvent#">Ingediende resultaten</a> / Bekijk opgaven</div>
            </section>
        </div>
        <div class="6u">
            <section>
                <table width="100%" class="studentinfo">
                <tr>
                    <th>Naam:&nbsp;</th>
                    <td>#entryRecord.getStudent().getName()#</td>
                    <td>&nbsp;</td>
                    <th>Leeftijd:&nbsp;</th>
                    <td>#entryRecord.getStudent().getAge()#</td>
                </tr>
                <tr>
                    <th>School:&nbsp;</th>
                    <td colspan="3">#entryRecord.getStudent().getSchoolName()#</td>
                </tr>
                <tr>
                    <th>Niveau:&nbsp;</th>
                    <td>#entryRecord.getStudent().getSchoolType()# #entryRecord.getStudent().getSchoolLevel()#</td>
                    <td>&nbsp;</td>
                    <th>Type wiskunde:&nbsp;</th>
                    <td>#entryRecord.getStudent().getMathType()#</td>
                </tr>
                </table>
            </section>
        </div>
        <div class="3u">
            <section class="databoard">
                <ul>
                    <li>Kenmerk:&nbsp;#entryrecord.getEntry_id()#</li>
                    <cfif entryrecord.getHelp1Shown()>
                            <li class="green">Hulp 1 is gebruikt</li>
                    <cfelse>
                            <li class="red">Hulp 1 is niet gebruikt</li>
                    </cfif>

                    <cfif entryrecord.getHelp2Shown()>
                            <li class="green">Hulp 2 is gebruikt</li>
                    <cfelse>
                            <li class="red">Hulp 2 is niet gebruikt</li>
                    </cfif>
                </ul>
            </section>
        </div>
        <div class="3u">
            <section class="scoreboard">
                <div>
                    <h4>Score</h4>
                    <h1 class="big">#entryrecord.getScore()#</h1>
                </div>
            </section>
        </div>
    </div>
    <cfset runs = entryRecord.getEntryRunArray()>
<cfloop array="#runs#" index="run">
    <div class="row">
        <div class="12u">
            <div class="runcontainer">
                <h2>Poging #run.getIndex()#</h2>
                <div class="assignments">
            <cfset assignments = run.getRunAssignmentArray()>
            <cfloop array="#assignments#" index="assignment">
                <cfset assignmentData = deserializeJSON(charsetencode(assignment.getData(), "utf-8"))>
                    <div class="assignmentcontainer">
                        <h3>Opgave #assignment.getAssignmentNumber()#</h3>
                        <div class="answer">
                            <img src="#assignmentData.graphData.base64url#" width="100%">
                        </div>
                        <div class="caption">
                            <span>#assignmentData.description#</span>
                        </div>

                    </div>
            </cfloop>
                </div>
                <div class="helpshown">
                    <cfif run.getHelp1Shown()>
                        <div class="helpblock green">Help 1 is getoond</div>
                    <cfelse>
                        <div class="helpblock red">Help 1 is niet getoond</div>
                    </cfif>
                    <cfif run.getHelp2Shown()>
                            <div class="helpblock green">Help 2 is getoond</div>
                    <cfelse>
                            <div class="helpblock red">Help 2 is niet getoond</div>
                    </cfif>
                </div>
            </div>
        </div>
    </div>
</cfloop>
</div>
</cfoutput>