<!--- Document Information -----------------------------------------------------

Title:      ManyToOneNotSetException.cfc

Author:     Mark Mandel
Email:      mark@compoundtheory.com

Website:    http://www.compoundtheory.com

Purpose:    Exception when trying to retrieve a M2O value that does not exist

Usage:      

Modification Log:

Name			Date			Description
================================================================================
Mark Mandel		05/06/2009		Created

------------------------------------------------------------------------------->
<cfcomponent hint="Exception when trying to retrieve a M2O value that does not exist" extends="transfer.com.exception.Exception" output="false">

<!------------------------------------------- PUBLIC ------------------------------------------->

<cffunction name="init" hint="Constructor" access="public" returntype="void" output="false">
	<cfargument name="className" hint="the classname of the object in question" type="string" required="Yes">
	<cfargument name="linkClass" hint="the class we are linking to" type="string" required="Yes">
	<cfargument name="manytoone" hint="the name of the manytoone" type="string" required="Yes">
	<cfscript>
		super.init("A ManyToOne TransferObject has not been initialised.", 
					"In TransferObject '"& arguments.className &"' manytoone '"& arguments.linkClass &"' does not exist, when calling get"& arguments.manytoone &"()");
	</cfscript>
</cffunction>

<!------------------------------------------- PACKAGE ------------------------------------------->

<!------------------------------------------- PRIVATE ------------------------------------------->

</cfcomponent>