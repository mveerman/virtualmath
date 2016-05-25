<!--- Document Information -----------------------------------------------------

Title:      UnsupportedAutoGenerateTypeExcpetion.cfc

Author:     Mark Mandel
Email:      mark@compoundtheory.com

Website:    http://www.compoundtheory.com

Purpose:    Exception for an unsupported generation type

Usage:      

Modification Log:

Name			Date			Description
================================================================================
Mark Mandel		05/06/2009		Created

------------------------------------------------------------------------------->

<cfcomponent hint="Exception for an unsupported generation type" extends="transfer.com.exception.Exception" output="false">

<!------------------------------------------- PUBLIC ------------------------------------------->

<cffunction name="init" hint="Constructor" access="public" returntype="void" output="false">
	<cfargument name="object" hint="The object meta in question" type="transfer.com.object.Object" required="Yes">
	<cfscript>
		super.init("This type of ID cannot be generated by Transfer",
			"The type of '#arguments.object.getPrimaryKey().getType()#' is not of type 'numeric', 'UUID' or 'GUID'");
	</cfscript>
</cffunction>

<!------------------------------------------- PACKAGE ------------------------------------------->

<!------------------------------------------- PRIVATE ------------------------------------------->

</cfcomponent>