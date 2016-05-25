<!---
	This is an abstract Gateway instance used map general settings like the ORM
	to gateways. Gateways are likely to extend this Class.
--->
<cfcomponent output="false" >
	
	<!--- Baseclass --->
	<cfset baseClass = "">
	
	<!--- Beans variable containing all the auto-wired beans --->
	<cfset variables.beans = {}>
	
	<!--- Getters and setters are loaded via auto-wiring --->
	
	<cffunction name="setOrmService" access="public" output="false" returntype="void">
		<cfargument name="OrmService" type="Transfer.TransferFactory" required="true">
		<cfset beans.OrmService=OrmService>
	</cffunction>
	

	<cffunction name="getOrmService" access="public" output="false" returntype="Transfer.TransferFactory" >
		<cfreturn beans.OrmService>
	</cffunction>
	
	<!--- 
		Get an new TransferObject of type baseClass.
		
		@return TransferObject of type baseClass
	--->
	<cffunction access="public" name="new" returntype="Transfer.com.TransferObject" output="false">
		
		<cfreturn getOrmService().getTransfer().new(baseClass)>
	</cffunction>
	
	<!--- 
		Get an existing TransferObject or create a blank one. It either retrieves an
		existing record from the database, or creates an new blank (dummy) record
		(when no id is provided).
		
		@param id - primary key of the record to retrieve.
		@return TransferObject
		@throws ObjectNotAvailableError no record with matching id found
	--->
	<cffunction access="public" name="get" returntype="Transfer.com.TransferObject" output="false">
		<cfargument name="id" type="any" required="false">
		
		<cfif not structkeyexists(arguments, "id")>
			<cfset result = getOrmService().getTransfer().new(baseClass)>
		<cfelse>
			<cfset result = getOrmService().getTransfer().get(baseClass, arguments.id)>
			<cfif NOT result.getIsPersisted()>
				<cfthrow type="ObjectNotAvailableError" message="Object of type <code>#baseClass#</code> with key '<code>#arguments.id#</code>' not found">
			</cfif>
		</cfif>
		<cfreturn result>
	</cffunction>

	<!---
		get an existing Transfer object by property and it's value
		@property: property to look for
		@value: proprty value to look for
		@return: Transfer object
	--->
	<cffunction access="public" name="getByProperty" returntype="Transfer.com.TransferObject" output="false" >
		<cfargument name="property" type="string" required="true" hint="The property to look for">
		<cfargument name="value" type="any" required="true" hint="The value of the property to look for">
		<cfset var local={}>

		<cfset local.result= getOrmService().getTransfer().readByProperty(baseClass,arguments.property,arguments.value)>

		<cfreturn local.result>
	</cffunction>

	<!--- 
		Save a transfer object
		
		@param transferObject - a transferObject
		@throws ORMError
	--->
	<cffunction access="public" name="save" returntype="any" output="false">
		<cfargument name="transferObject" type="Transfer.com.TransferObject" required="false">

		<cftry>
			<cfset getOrmService().getTransfer().save(arguments.transferObject)>
			<cfcatch>
				<cfrethrow>
				<cfthrow type="ORMError" message="#cfcatch.message#" detail="#cfcatch.detail#" extendedinfo="#cfcatch.ExtendedInfo#">
			</cfcatch>
		</cftry>
		
		<cfreturn arguments.transferObject>
	</cffunction>
	
	<!---
		Get an query of all records
		
		@return query of all records
	--->
	<cffunction access="public" name="list" returntype="Query" output="false">
		<cfargument name="orderProperty" type="string" required="false">
		<cfargument name="orderASC" type="boolean" required="false">
		<cfargument name="useAliases" type="boolean" required="false">
		
		<cfset arguments.classname = baseclass>
		<cfreturn getOrmService().getTransfer().list(argumentCollection=arguments)>
		
	</cffunction>

</cfcomponent>