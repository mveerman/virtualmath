<cfparam name="attributes.datasource">

<!--- Create table version --->
<cfquery datasource="#attributes.datasource#">
create table DOCSYS_VERSION
(
    installedversion   NUMERIC(8,0)
)
</cfquery>