<cfcomponent extends="BasicGateway" displayname="EntriesGateway" output="false">

    <cfset baseclass = "application.entries">
    <cfset MAX_ASSIGNMENTS = 2>

    <cffunction access="public" name="store" returntype="void" output="false">
        <cfargument name="user" type="virtualmath.model.beans.UserBean" required="true">
        <cfargument name="data" type="virtualmath.model.beans.EntryDataBean" required="true">

        <cftransaction action="begin">
            <cftry>
                <cfscript>
                    var newStudent = getOrmService().getTransfer().new("application.student");
                    newStudent.setName(user.getName());
                    newStudent.setAge(user.getAge());
                    newStudent.setSchoolName(user.getSchoolName());
                    newStudent.setSchoolType(user.getSchoolType());
                    newStudent.setSchoolLevel(user.getSchoolYear());
                    newStudent.setMathType(user.getMathType());
                            getOrmService().getTransfer().save(newStudent);

                    var newEntry = getOrmService().getTransfer().new("application.entry");
                    newEntry.setStudent(newStudent);
                    newEntry.setScore(data.getScore());
                    newEntry.setHelp1Shown(data.isHelp1Shown());
                    newEntry.setHelp2Shown(data.isHelp2Shown());
                            getOrmService().getTransfer().save(newEntry);

                    var runs = data.getData().runs;
                    var i = 1;
                    for (i = 1; i <= arraylen(runs); i++) {
                        var newRun = getOrmService().getTransfer().new("application.run");
                        newRun.setParentEntry(newEntry);
                        newRun.setIndex(i);
                        newRun.setScore(runs[i].score);
                        newRun.setHelp1Shown(runs[i].help1Shown);
                        newRun.setHelp2Shown(runs[i].help2Shown);
                        getOrmService().getTransfer().save(newRun);

                        for (var ai = 1; ai <= MAX_ASSIGNMENTS; ai++) {
                            var newAssignment = getOrmService().getTransfer().new("application.assignment");
                            newAssignment.setParentRun(newRun);
                            newAssignment.setAssignmentNumber(ai);
                            newAssignment.setData(charsetDecode(serializeJSON(runs[i]["assignment" & ai]), "utf-8"));
                            getOrmService().getTransfer().save(newAssignment);
                        }

                    }
                </cfscript>

                <cftransaction action="commit"/>
                <cfcatch>
                    <cftransaction action="rollback"/>
                    <cfrethrow>
                </cfcatch>
            </cftry>
        </cftransaction>
    </cffunction>

    <cffunction access="public" name="list" returntype="query" output="false">
        <cfargument name="teacher" type="numeric" required="false" />

        <cfscript>
            var Transfer = getOrmService().getTransfer();
            var studentEntryQuery = Transfer.createQuery("from application.entry join application.student");
            return Transfer.listByQuery(studentEntryQuery);
        </cfscript>
    </cffunction>

</cfcomponent>