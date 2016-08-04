<cfcomponent displayname="ResearchPortalController" extends="ModelGlue.gesture.controller.Controller" output="false" beans="EntriesGateway">

    <cffunction name="prepareSearchForm" access="public" returnType="void" output="false">
        <cfargument name="event" type="any" />

        <cfset arguments.event.setValue("schoolNames", beans.entriesGateway.getSchoolNames()) />
        <cfset arguments.event.setValue("schoolTypes", beans.entriesGateway.getSchoolTypes()) />
        <cfset arguments.event.setValue("schoolLevels", beans.entriesGateway.getSchoolLevels()) />
        <cfset arguments.event.setValue("mathTypes", beans.entriesGateway.getMathTypes()) />

    </cffunction>
	
	<cffunction name="search" access="public" returnType="void" output="false">
		<cfargument name="event" type="any" />

        <cfset var searchFormBean = getModelGlue().getBean("ResearchPortalSearchFormBean") />
        <cfset arguments.event.makeEventBean(searchFormBean) />
        <cfset arguments.event.setValue("searchFormBean", searchFormBean) />
        <cfif searchFormBean.isSearchStarted()>
            <cfset var searchResultBean = getModelGlue().getBean("ResearchPortalSearchResultBean") />
            <cfif not searchFormBean.isSearch()>
                <cfset arguments.event.makeEventBean(searchResultBean) />
            </cfif>
            <cfset searchResultBean.setResultQuery(beans.entriesGateway.search(searchFormBean)) />
            <cfset arguments.event.setValue("searchResultBean", searchResultBean) />
        </cfif>
	</cffunction>

</cfcomponent>