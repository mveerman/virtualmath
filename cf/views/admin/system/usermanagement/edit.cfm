<cfsilent>

    <cfset event.copyToScope(variables, "user_id,myself,security.userRecord,xe.commit,xe.edit,xe.list")/>
    <cfset variables.commitEvent = "#myself##xe.commit#&user_id=#security.userRecord.getuser_id()#"/>
    <cfset variables.editEvent = myself & xe.edit/>
    <cfset variables.listEvent = myself & xe.list/>
    <cfset variables.hasErrors = false/>
    <cfset variables.validation = event.getValue("security.userValidation", structNew())/>
    <cfset variables.isNew = true/>
    <cfif NOT structIsEmpty(validation)>
        <cfset variables.hasErrors = true/>
    </cfif>
    <cfif security.userRecord.getIsPersisted()>
        <cfset variables.isNew = false/>
    </cfif>
</cfsilent>

<cfoutput>
    <div class="container">
    <div class="row main-row">
    <div class="12u">
    <section>
        <h3>Beheer gebruikers</h3>
    <div id="breadcrumb">
            <a href="#listEvent#">Lijst van gebruikers</a> / <cfif isNew>Toevoegen nieuwe
<cfelse>Bewerken</cfif> gebruiker
</div>
</section>
    <cfif hasErrors IS true>
            <section>
                <h2>Submission Errors</h2>
            <ul>
            <cfloop collection="#validation#" item="variables.field">
                    <li>#arrayToList(validation[field])#</li>
            </cfloop>
            </ul>
            </section>
    </cfif>
    </div>
    <div class="12u">
    <cfform action="#commitEvent#" class="edit" format="xml">

        <cfinput type="hidden" name="user_id" value="#security.userRecord.getuser_id()#">
        <cfformgroup type="vertical" label="Persoonlijke gegevens">
            <cfinput type="text" name="name" value="#security.userRecord.getName()#"
                    label="Naam" required="true"/>
        </cfformgroup>
        <cfformgroup type="vertical" label="Inloggegevens">
            <cfset username_ac = StructNew()>
            <cfif !isNew>
                <cfset username_ac.disabled = "disabled">
            </cfif>
            <cfinput attributeCollection="#username_ac#" type="text" name="username" value="#security.userRecord.getusername()#"
                    label="Gebruikersnaam" required="#isNew#"/>
            <cfinput type="password" name="password" value=""
                    label="Wachtwoord" required="#isNew#"/>
        </cfformgroup>
        <cfformgroup type="vertical" label="Rollen">
            <cfformgroup type="horizontal" label="Administrateur">
                <cfinput type="radio" name="admin" value="true" checked="#security.userRecord.getAdmin()#"
                        label="Ja">
                <cfinput type="radio" name="admin" value="false" checked="#!security.userRecord.getAdmin()#"
                        label="Nee">
            </cfformgroup>
            <cfformgroup type="horizontal" label="Onderwijzer">
                <cfinput type="radio" name="teacher" value="true" checked="#security.userRecord.getTeacher()#"
                        label="Ja" >
                <cfinput type="radio" name="teacher" value="false" checked="#!security.userRecord.getTeacher()#"
                        label="Nee" >
            </cfformgroup>
            <cfformgroup type="horizontal" label="Onderzoeker">
                <cfinput type="radio" name="researcher" value="true" checked="#security.userRecord.getResearcher()#"
                        label="Ja" >
                <cfinput type="radio" name="researcher" value="false" checked="#!security.userRecord.getResearcher()#"
                        label="Nee" >
            </cfformgroup>
        </cfformgroup>
        <cfformitem type="hrule" />
        <cfformgroup type="horizontal">
            <cfinput type="submit" name="submit" value=" Gebruiker opslaan " label="&nbsp;"/>
        </cfformgroup>

    </cfform>
    </div>
    </div>
    </div>
</cfoutput>
