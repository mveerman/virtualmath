<!--- Document Information -----------------------------------------------------

Title:      TransferSelecter.cfc

Author:     Mark Mandel
Email:      mark@compoundtheory.com

Website:    http://www.compoundtheory.com

Purpose:    Builds a query out of BO Data, for PostGresSQL

Usage:

Modification Log:

Name			Date			Description
================================================================================
Mark Mandel		25/05/2006		Created

------------------------------------------------------------------------------->

<cfcomponent name="TransferSelecter" hint="Builds a Query out of BO data, for MYQSL" extends="transfer.com.sql.TransferSelecter">

<!------------------------------------------- PUBLIC ------------------------------------------->

<!------------------------------------------- PACKAGE ------------------------------------------->

<!------------------------------------------- PRIVATE ------------------------------------------->

<cffunction name="castValue" hint="Cast the value of this to another value" access="public" returntype="string" output="false">
	<cfargument name="column" hint="The column to write the 'NULL' for" type="string" required="Yes">
	<cfargument name="type" hint="Type to cast it to" type="string" required="Yes">
	<cfscript>
		var sql = "CAST(" & arguments.column & " as ";

		switch(arguments.type)
		{
			case "varchar":
				sql = sql & "varchar(1000)";
			break;
		}

		sql = sql & ")";

		return sql;
	</cfscript>
</cffunction>

<cffunction name="writeNULL" hint="Null String for postgresql" access="private" returntype="string" output="false">
	<cfargument name="column" hint="The column to write the 'NULL' for" type="string" required="Yes">
	<cfargument name="type" hint="The type to write the 'NULL' for" type="string" required="Yes">

	<cfscript>
		var nullValue = "Cast(NULL as ";

		switch(arguments.type)
		{
			case "numeric":
				nullValue = nullValue & "numeric";
			break;

			case "date":
				nullValue = nullValue & "timestamp";
			break;

			case "boolean":
				nullValue = nullValue & "boolean";
			break;

			default:
				nullValue = nullValue & "text";
			break;
		}

		return nullValue & (")");
	</cfscript>

</cffunction>

</cfcomponent>