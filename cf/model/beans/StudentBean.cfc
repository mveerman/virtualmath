<cfcomponent>

    <cfset this.data = StructNew()>

    <cffunction name="fill" access="public" returntype="StudentBean">
        <cfargument name="studentData" type="struct" required="true">
        
        <cfparam name="studentData.name" type="string" default="">
        <cfparam name="studentData.age" type="numeric" default="0">
        <cfparam name="studentData.schoolName" type="string" default="">
        <cfparam name="studentData.schoolType" type="string" default="">
        <cfparam name="studentData.schoolYear" type="numeric" default="0">
        <cfparam name="studentData.wiskundeType" type="string" default="">
        
        <cfset setName(studentData.name) />
        <cfset setAge(studentData.age) />
        <cfset setSchoolName(studentData.schoolName) />
        <cfset setSchoolType(studentData.schoolType) />\
        <cfset setSchoolYear(studentData.schoolYear) />
        <cfset setMathType(studentData.wiskundeType) />

        <cfreturn this />
    </cffunction>

    <cffunction name="setName" access="public" returntype="void">
        <cfargument name="name" type="string" required="true">
        <cfset this.data.name = name>
    </cffunction>

    <cffunction name="getName" access="public" returntype="string">
        <cfreturn this.data.name />
    </cffunction>

    <cffunction name="setAge" access="public" returntype="void">
        <cfargument name="age" type="numeric" required="true">
        <cfset this.data.age = age>
    </cffunction>

    <cffunction name="getAge" access="public" returntype="numeric">
        <cfreturn this.data.age />
    </cffunction>

    <cffunction name="setSchoolName" access="public" returntype="void">
        <cfargument name="schoolName" type="string" required="true">
        <cfset this.data.schoolName = schoolName>
    </cffunction>

    <cffunction name="getSchoolName" access="public" returntype="string">
        <cfreturn this.data.schoolName />
    </cffunction>

    <cffunction name="setSchoolType" access="public" returntype="void">
        <cfargument name="schoolType" type="string" required="true">
        <cfset this.data.schoolType = schoolType>
    </cffunction>

    <cffunction name="getSchoolType" access="public" returntype="string">
        <cfreturn this.data.schoolType />
    </cffunction>

    <cffunction name="setSchoolYear" access="public" returntype="void">
        <cfargument name="schoolYear" type="numeric" required="true">
        <cfset this.data.schoolYear = schoolYear>
    </cffunction>

    <cffunction name="getSchoolYear" access="public" returntype="numeric">
        <cfreturn this.data.schoolYear />
    </cffunction>

    <cffunction name="setMathType" access="public" returntype="void">
        <cfargument name="mathType" type="string" required="true">
        <cfset this.data.mathType = mathType>
    </cffunction>

    <cffunction name="getMathType" access="public" returntype="string">
        <cfreturn this.data.mathType />
    </cffunction>

</cfcomponent>
