<cfcomponent extends="BasicGateway" displayname="EntriesGateway" output="false">

    <cfset baseclass = "application.entries">

    <cffunction access="public" name="store" returntype="void" output="false">
        <cfargument name="user" type="virtualmath.model.beans.UserBean" required="true">
        <cfargument name="data" type="virtualmath.model.beans.EntryDataBean" required="true">

        <cftransaction action="begin">
            <cftry>
                <cfscript>
                    var newStudent = getOrmService().getTransfer().new("application.students");
                    newStudent.setName(user.getName());
                    newStudent.setAge(user.getAge());
                    newStudent.setSchoolName(user.getSchoolName());
                    newStudent.setSchoolType(user.getSchoolType());
                    newStudent.setSchoolLevel(user.getSchoolYear());
                    newStudent.setMathType(user.getMathType());
                            getOrmService().getTransfer().save(newStudent);

                    var newEntry = getOrmService().getTransfer().new("application.entries");
                    newEntry.setStudent(newStudent);
                    newEntry.setData(data.getData());
                    newEntry.setScore(data.getScore());
                    newEntry.setHelp1Shown(data.isHelp1Shown());
                    newEntry.setHelp2Shown(data.isHelp2Shown());
                            getOrmService().getTransfer().save(newEntry);
                </cfscript>

                <cftransaction action="commit"/>
                <cfcatch>
                    <cftransaction action="rollback"/>
                    <cfrethrow>
                </cfcatch>
            </cftry>
        </cftransaction>
    </cffunction>

</cfcomponent>