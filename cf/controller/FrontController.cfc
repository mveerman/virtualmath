<!---
  Created by mveerma1 on 8-6-2016.
--->
<cfcomponent displayname="FrontController" extends="ModelGlue.gesture.controller.Controller" output="false" beans="EntriesGateway">

    <cffunction name="storeEntry" access="public" returntype="void">
        <cfargument name="event" type="any"/>

        <cfset var userInfo = event.getValue("userinfo")>
        <cfset var entryData = event.getValue("entryData")>

        <cfset event.setValue("result", false)>

        <cfif isJSON(userInfo) AND isJSON(entryData)>
            <cfset var studentBean = getModelGlue().getBean("StudentBean").fill(deserializeJSON(userInfo))>
            <cfset var entryDataBean = getModelGlue().getBean("EntryDataBean").fill(entryData)/>

            <cfset beans.EntriesGateway.store(studentBean, entryDataBean) />
            <cfset event.setValue("result", true)>
        <cfelse>
            <cfthrow
                    message="Parameters 'userInfo' and/or 'entryData' either missing or format is invalid. Please check the documentation."
                    type="EntryStoreException">
        </cfif>
    </cffunction>

</cfcomponent>