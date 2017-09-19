<!---**********************************************************************
* $URL: https://source.ic.uva.nl/repos/svn/docvhjaar/trunk/Application/database/DatabaseManager.cfc $
* $Id: DatabaseManager.cfc 217 2012-10-08 12:54:54Z mveerma1 $
*
* DatabaseManager developed by Maarten Veerman
*
* Used to manage upgrades to databases.
***********************************************************************--->
<cfcomponent output="false" displayname="DatabaseManager">
	
	<cfset variables.dbCurrentVersion=0 />
	<cfset variables.fileCurrentVersion=0 />
	<cfset variables.versionsXML="" />
	
	<cfset variables.instance = StructNew() />
	
	<cfset variables.dsn = "" />
	
	<cfset this.versiontablename = "docsys_version" />

	<!----------------------------------------------------------------------
		Setter for datasource
	----------------------------------------------------------------------->
	<cffunction name="setDatasource" access="public" returntype="void" output="false">
		<cfargument name="dsn" type="String" required="true">
		
		<cfset variables.dsn = arguments.dsn />
	</cffunction>
	
	<!----------------------------------------------------------------------
		Getter for datasource
	----------------------------------------------------------------------->
	<cffunction name="getDatasource" access="public" returntype="String" output="false">
		<cfreturn variables.dsn />
	</cffunction>
	
	<!----------------------------------------------------------------------
		Constructor function; manages all functions
	----------------------------------------------------------------------->
	<cffunction name="checkAndUpgrade" access="public" output="false" returntype="DatabaseManager">
		<cfscript>
			// read the database and find out the current version
			readDBCurrentVersion();
			
			// read the versions.xml. 
			readVersionsXML();
			
			// Upgrade the database (only if necessary)
			upgradeDatabase();
			
			return this;
		</cfscript>
	</cffunction>
	
	<!----------------------------------------------------------------------
		Reads the highest version from the version table in the database. 
		If the versions table does not exists it sets the version to 0 (ZERO)
		
		Sets variables.dbCurrentVersion
	----------------------------------------------------------------------->
	<cffunction name="readDBCurrentVersion" access="public" output="false" returntype="void">
		<cfset var checkVersionsExists =  "" />
		<cfset var checkLatestVersion =  "" />
		
		<cfset var dbtables = "" />
		
		<!------------------------------------------------------------------
			Determine if the database is reachable and the versions table 
			exists 
		------------------------------------------------------------------->
		
		<cfdbinfo datasource="#dsn#" name="dbtables" type="tables">
		
		<cftry>
			<cfquery dbtype="query" name="checkVersionsExists">
			SELECT 	TABLE_NAME
			FROM 	dbtables
			WHERE	lower(TABLE_NAME) = <cfqueryparam cfsqltype="cf_sql_varchar" value="#lcase(this.versiontablename)#">
			</cfquery>

			<cfif checkVersionsExists.recordcount>
				<!--- Versions table exists; check the latest version --->
				<cfquery datasource="#dsn#" name="checkLatestVersion">
				SELECT 	MAX(installedversion) as latestversion
				FROM	#this.versiontablename#
				</cfquery>
				<cfset variables.dbCurrentVersion = checkLatestVersion.latestversion />
			<cfelse>
				<!--- Versions table doesn't exist --->
				<cfset variables.dbCurrentVersion = 0 />
			</cfif>
			
			<cfcatch>
				<!--- Database unavailable throw message --->
				<cfthrow type="DATABASE_FATAL" message="Database #dsn# is unavailable. aborting. The underlying message is: #cfcatch.message#<br/>#cfcatch.detail#">
			</cfcatch>
		</cftry>
		
	</cffunction>
	
	<!----------------------------------------------------------------------
		Reads the versions.xml from file.
		
		Sets variables.fileCurrentVersion;
		sets variables.versionsXML
	----------------------------------------------------------------------->
	<cffunction name="readVersionsXML" access="public" output="false" returntype="void">
		<cfset var versionPath = ExpandPath(getDatabaseVersionsPath()) />
		
		<cfset var DatabaseVersionsFileContent="" />
		<cfset var validation = "" />
		
		<cfif NOT FileExists(versionPath)>
			<cfthrow 
				type="APPLICATION_FATAL" 
				message="DatabaseVersionsPath does not point to a valid file location. DatabaseManager is unable to check the data model.">
		</cfif>
		
		<!--- Check if this file is valid XML --->
		<!--- Read the xml into variables.versionsXML --->
		<cftry>
			<cfset variables.versionsXML = xmlParse(versionPath, false, getVersionsSchemaPath())>
			<cfcatch>
				<cfrethrow>
				<cfthrow 
					type="APPLICATION_FATAL" 
					message="DatabaseVersionsPath file is not formatted correctly">
			</cfcatch>
		</cftry>
		
		<!--- set the variables.fileCurrentVersion --->
		<cfset variables.fileCurrentVersion = variables.versionsXML.database.currentversion.xmlText />
		
	</cffunction>
	
	<!----------------------------------------------------------------------
		Upgrades the database if necessary. This is determined by matching 
		the values of variables.dbCurrentVersion to 
		variables.fileCurrentVersion. If the latter is higher, all 
		intermediate patch scripts (available from versions.xml) are run.
		This function should be run after readDBCurrentVersion() and 
		readVersionsXML().
		
		updates dbCurrentVersion;
	----------------------------------------------------------------------->
	<cffunction name="upgradeDatabase" access="public" output="false" returntype="void">
		
		<cfset var runnableScripts = "" />
		<cfset var tag = "">
		<cfset var inTransaction = true>

		<cfif variables.fileCurrentVersion GT variables.dbCurrentVersion>
			<cfset runnableScripts = xmlSearch(variables.versionsXML, '//tag [./version > #variables.dbCurrentVersion#]') />
			
			<cfif ArrayLen(runnableScripts)>
				<cfsetting requesttimeout="1000" />
			</cfif>
			
			
			<cfloop array="#runnableScripts#" index="tag">
				
				<cfif IsDefined("tag.inTransaction.xmltext") AND isBoolean(tag.inTransaction.xmltext)>
					<cfset inTransaction = tag.inTransaction.xmltext>
				</cfif>

				<cfif not inTransaction>
					<cftry>
						<!--- run script --->
						<cfset runScript(tag) />
						
						<cflog 
							file="cms-info" 
							application="false" 
							type="information" 
							text="Database #dsn# upgraded to version #tag.version.xmlText#" 
						>
						
						<!--- Error handling --->
						<cfcatch>
							<cflog 
								file="cms-info" 
								application="false" 
								type="error" 
								text="Upgrade of database #dsn# to version #tag.version.xmlText# failed: #cfcatch.message#" 
							>  
							
							<cfrethrow>
						</cfcatch>
					</cftry>
				<cfelse>
					<cftransaction action="begin">
						<cftry>
							
							<!--- run script --->
							<cfset runScript(tag) />
							
							<!--- Commit all changes --->
							<cftransaction action="commit" />
							
							<cflog 
								file="cms-info" 
								application="false" 
								type="information" 
								text="Database #dsn# upgraded to version #tag.version.xmlText#" 
							>
							
							<!--- Error handling --->
							<cfcatch>
								<cftransaction action="rollback" />
								
								<cflog 
									file="cms-info" 
									application="false" 
									type="error" 
									text="Upgrade of database #dsn# to version #tag.version.xmlText# failed: #cfcatch.message#" 
								> 
								
								<cfrethrow>
							</cfcatch>
						</cftry>
					</cftransaction>
				</cfif>
				
				<!--- Update variables.dbCurrentVersion --->
				<cfset variables.dbCurrentVersion = tag.version.xmlText />
				
			</cfloop>
		</cfif>
	</cffunction>
	
	<cffunction name="runScript" access="private">
		<cfargument name="tag" type="Any" required="true" />
		
		<!--- Run the database upgrade script --->
		<cfif IsDefined("tag.isComponent.xmlText") AND tag.isComponent.xmlText>
			<cfset CreateObject('Component', '#tag.file.xmlText#').init(dsn) />
		<cfelse>
			<cfmodule template="#variables.instance.rootPath##tag.file.xmlText#" datasource="#dsn#">
		</cfif>
		
		<!--- add the version number to the version table --->
		<cfset addVersionToDatabase(tag.version.xmlText) />
		
	</cffunction>
	
	
	<!----------------------------------------------------------------------
		Add a version number to the versions table in the database
		
		updates dbCurrentVersion;
	----------------------------------------------------------------------->
	<cffunction name="addVersionToDatabase" access="private" output="false" returntype="void">
		<cfargument name="version" type="numeric" required="true" />
		
		<cfset var addVersion="" />
		
		<cfquery datasource="#dsn#" name="addVersion">
		INSERT INTO #this.versiontablename#
		VALUES (<cfqueryparam cfsqltype="cf_sql_integer" value="#arguments.version#">)
		</cfquery>
	</cffunction>
	
	<cffunction name="getCurrentDatabaseVersion" access="public" output="false" returntype="numeric">
		<cfreturn variables.dbCurrentVersion />
	</cffunction>
	
	<cffunction name="getRootPath" access="public" output="false" returntype="any">
		<cfreturn variables.instance.rootPath />
	</cffunction>
	
	<cffunction name="setRootPath" access="public" output="false" returntype="void">
		<cfargument name="rootPath" type="any" required="true" />
		<cfset variables.instance.rootPath = arguments.rootPath />
	</cffunction>
	
	<cffunction name="getDatabaseVersionsPath" access="public" output="false" returntype="any">
		<cfreturn variables.instance.DatabaseVersionsPath />
	</cffunction>
	
	<cffunction name="setDatabaseVersionsPath" access="public" output="false" returntype="void">
		<cfargument name="DatabaseVersionsPath" type="any" required="true" />
		<cfset variables.instance.DatabaseVersionsPath = arguments.DatabaseVersionsPath />
	</cffunction>
	
	<cffunction name="getVersionsSchemaPath" access="public" output="false" returntype="any">
		<cfreturn variables.instance.VersionsSchemaPath />
	</cffunction>
	
	<cffunction name="setVersionsSchemaPath" access="public" output="false" returntype="void">
		<cfargument name="VersionsSchemaPath" type="any" required="true" />
		<cfset variables.instance.VersionsSchemaPath = arguments.VersionsSchemaPath />
	</cffunction>
	
</cfcomponent>