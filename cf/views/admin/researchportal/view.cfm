<cfsilent>
    <cfset viewState.copyToScope(variables, "isTeacher,myself,entryRecord,xe.list")>
    <cfset variables.listEvent = myself & xe.list/>
</cfsilent>

<cfoutput>
<div class="container">
    <div class="row main-row">
        <div class="12u">
            <section>
                <h3>Researchportaal</h3>
                <hr>
            </section>
        </div>
        <div class="6u">
            <section>
                <table width="100%" class="studentinfo">
                <tr>
                    <th>Naam:&nbsp;</th>
                    <td><cfif isTeacher>#entryRecord.getStudent().getName()#<cfelse>[...]</cfif></td>
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
                </ul>
            </section>
        </div>
        <div class="3u">
            <section class="scoreboard">
                <div>
                    <h4>Eindscore</h4>
                    <h1 class="big">#entryrecord.getScore()#</h1>
                </div>
            </section>
<div class="helpshown">
    <cfif entryrecord.getHelp1Shown()>
            <div class="helpblock green">Help 1 is getoond</div>
    <cfelse>
            <div class="helpblock red">Help 1 is niet getoond</div>
    </cfif>

    <cfif entryrecord.getHelp2Shown()>
            <div class="helpblock green">Help 2 is getoond</div>
    <cfelse>
            <div class="helpblock red">Help 2 is niet getoond</div>
    </cfif>
</div>
        </div>
    </div>
    <cfset runs = entryRecord.getEntryRunArray()>
<cfloop array="#runs#" index="run">
    <div class="row">
        <div class="9u">
            <div class="runcontainer">
                <h2>Poging #run.getRun_Index()#</h2>
                <div class="assignments">
            <cfset assignments = run.getRunAssignmentArray()>
            <cfloop array="#assignments#" index="assignment">
                <cfset assignmentData = deserializeJSON(charsetencode(assignment.getData(), "utf-8"))>
                    <div class="assignmentcontainer">
                        <h3>Opgave #assignment.getAssignmentNumber()#</h3>
                        <div class="answer <cfif assignmentData.graphData.analysis.result>correct<cfelse>incorrect</cfif>">
                            <img src="#assignmentData.graphData.base64url#" width="100%">
                        </div>
                        <div class="caption">
                            <span>#assignmentData.description#</span>
                        </div>

                    </div>
            </cfloop>
                </div>

            </div>
        </div>
        <div class="3u">
            <section class="scoreboard">
                <div>
                    <h4>Score poging</h4>
                    <h1 class="big">#run.getRun_Score()#</h1>
                </div>
            </section>
            <section>
    <div class="helpshown">
        <cfif run.getRun_Help1Shown()>
                <div class="helpblock green">Help 1 is getoond</div>
        <cfelse>
                <div class="helpblock red">Help 1 is niet getoond</div>
        </cfif>
        <cfif run.getRun_Help2Shown()>
                <div class="helpblock green">Help 2 is getoond</div>
        <cfelse>
                <div class="helpblock red">Help 2 is niet getoond</div>
        </cfif>
        </div>
            </section>
        </div>
    </div>
</cfloop>
</div>
</cfoutput>