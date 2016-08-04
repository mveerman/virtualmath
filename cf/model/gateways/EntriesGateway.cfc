<cfcomponent extends="BasicGateway" displayname="EntriesGateway" output="false">

    <cfset baseclass = "application.entries">
    <cfset MAX_ASSIGNMENTS = 2>

    <cffunction access="public" name="store" returntype="void" output="false">
        <cfargument name="user" type="any" required="true">
        <cfargument name="data" type="any" required="true">

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
            var studentEntryQuery = Transfer.createQuery("from application.entry join application.student order by application.entry.timestamp desc");
            return Transfer.listByQuery(studentEntryQuery);
        </cfscript>
    </cffunction>

    <cffunction access="public" name="search" returntype="query" output="false">
        <cfargument name="searchFormBean" type="virtualmath.model.beans.ResearchPortalSearchFormBean" required="true" />

        <cfscript>
            var Transfer = getOrmService().getTransfer();
            var params = StructNew();
            var qs = "from application.entry join application.student";
            if (searchFormBean.getRun() neq "") {
                qs = "from application.run join application.entry join application.student";
            }
            qs = qs & " where application.entry.entry_id is not null";
            if (searchFormBean.getCode() neq "") {
                qs = qs & " and application.entry.entry_id = :code";
                params["code"]=searchFormBean.getCode();
            }
            if (searchFormBean.getDateStart() neq "") {
                qs = qs & " and application.entry.timestamp >= :dateStart";
                params["dateStart"]=searchFormBean.getDateStart();
            }
            if (searchFormBean.getDateEnd() neq "") {
                qs = qs & " and application.entry.timestamp < :dateEnd";
                params["dateEnd"]=searchFormBean.getDateEnd();
            }
            if (searchFormBean.getAgeStart() neq "") {
                qs = qs & " and application.student.age >= :ageStart";
                params["ageStart"]=searchFormBean.getAgeStart();
            }
            if (searchFormBean.getAgeEnd() neq "") {
                qs = qs & " and application.student.age <= :ageEnd";
                params["ageEnd"]=searchFormBean.getAgeEnd();
            }
            if (searchFormBean.getSchoolName() neq "") {
                qs = qs & " and application.student.schoolname = :schoolName";
                params["schoolName"]=searchFormBean.getSchoolName();
            }
            if (searchFormBean.getSchoolType() neq "") {
                qs = qs & " and application.student.schooltype = :schoolType";
                params["schoolType"]=searchFormBean.getSchoolType();
            }
            if (searchFormBean.getSchoolYear() neq "") {
                qs = qs & " and application.student.schoollevel = :schoolYear";
                params["schoolYear"]=searchFormBean.getSchoolYear();
            }
            if (searchFormBean.getMathType() neq "") {
                qs = qs & " and application.student.mathtype = :mathType";
                params["mathType"]=searchFormBean.getMathType();
            }
            if (searchFormBean.getRun() neq "") {
                qs = qs & " and application.run.run_index = :run";
                params["run"]=searchFormBean.getRun();
            }
            if (searchFormBean.getLevelStart() neq "") {
                if (searchFormBean.getRun() neq "") {
                    qs = qs & " and application.run.run_score >= :levelStart";
                } else {
                    qs = qs & " and application.entry.score >= :levelStart";
                }
                params["levelStart"]=searchFormBean.getLevelStart();
            }
            if (searchFormBean.getLevelEnd() neq "") {
                if (searchFormBean.getRun() neq "") {
                    qs = qs & " and application.run.run_score <= :levelEnd";
                } else {
                    qs = qs & " and application.entry.score <= :levelEnd";
                }
                params["levelEnd"]=searchFormBean.getLevelEnd();
            }
            if (searchFormBean.getHelp1Used() neq "") {
                if (searchFormBean.getRun() neq "") {
                    qs = qs & " and application.run.run_help1shown = :help1Used";
                } else {
                    qs = qs & " and application.entry.help1shown = :help1Used";
                }
                params["help1Used"]=iif(searchFormBean.getHelp1Used(), 1, 0);
            }
            if (searchFormBean.getHelp2Used() neq "") {
                if (searchFormBean.getRun() neq "") {
                    qs = qs & " and application.run.run_help2shown = :help2Used";
                } else {
                    qs = qs & " and application.entry.help2shown = :help2Used";
                }
                params["help2Used"]=iif(searchFormBean.getHelp2Used(), 1, 0);
            }
            qs = qs & " order by application.entry.timestamp desc";
            var searchQuery = Transfer.createQuery(qs);
            for (param in params) {
                searchQuery.setParam(param, params[param]);
            }
            return Transfer.listByQuery(searchQuery);
        </cfscript>
    </cffunction>

</cfcomponent>