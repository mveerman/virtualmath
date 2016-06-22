<cfparam name="attributes.datasource">

<!--- Create table version --->
<cfquery datasource="#attributes.datasource#">
create table docsys_version
(
    installedversion   NUMERIC(8,0)
)
</cfquery>