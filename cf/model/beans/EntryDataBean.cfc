<cfcomponent>

    <cfset this.data = StructNew()>

    <cffunction name="fill" access="public" returntype="EntryDataBean">
        <cfargument name="entryData" type="string" required="true">

        <cfif isJson(entryData)>
            <cfset var extractedData = deserializeJSON(entryData)>

            <cfparam name="extractedData.currentRun" default="0">
            <cfparam name="extractedData.runs" default="#ArrayNew(1)#">
            <cfparam name="extractedData.runs[#extractedData.currentRun + 1#]" default="#StructNew()#">
            <cfparam name="extractedData.runs[#extractedData.currentRun + 1#].score" default="0">

            <cfset setData(entryData)/>
            <cfset setScore(extractedData.runs[extractedData.currentRun + 1].score)/>
            <cfset setHelp1Shown(extractedData.help1Shown)/>
            <cfset setHelp2Shown(extractedData.help2Shown)/>
        </cfif>

        <cfreturn this/>
    </cffunction>

    <cffunction name="setData" access="public" returntype="void">
        <cfargument name="data" type="string" required="true">
        <cfset this.data.data = data>
    </cffunction>

    <cffunction name="getData" access="public" returntype="string">
        <cfreturn this.data.data/>
    </cffunction>

    <cffunction name="setScore" access="public" returntype="void">
        <cfargument name="score" type="numeric" required="true">
        <cfset this.data.score = score>
    </cffunction>

    <cffunction name="getScore" access="public" returntype="numeric">
        <cfreturn this.data.score/>
    </cffunction>

    <cffunction name="setHelp1Shown" access="public" returntype="void">
        <cfargument name="help1Shown" type="boolean" required="true">
        <cfset this.data.help1Shown = help1Shown>
    </cffunction>

    <cffunction name="isHelp1Shown" access="public" returntype="boolean">
        <cfreturn this.data.help1Shown/>
    </cffunction>

    <cffunction name="getHelp1Shown" access="public" returntype="boolean">
        <cfreturn this.isHelp1Shown()/>
    </cffunction>

    <cffunction name="setHelp2Shown" access="public" returntype="void">
        <cfargument name="help2Shown" type="boolean" required="true">
        <cfset this.data.help2Shown = help2Shown>
    </cffunction>

    <cffunction name="isHelp2Shown" access="public" returntype="boolean">
        <cfreturn this.data.help2Shown/>
    </cffunction>

    <cffunction name="getHelp2Shown" access="public" returntype="boolean">
        <cfreturn this.isHelp2Shown()/>
    </cffunction>

</cfcomponent>
