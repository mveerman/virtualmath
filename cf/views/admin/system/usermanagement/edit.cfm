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
            <a href="#listEvent#">Lijst van gebruikers</a> /
    <cfif isNew>Toevoegen nieuwe
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
    <div class="12u container">
    <cfform action="#commitEvent#" class="edit" format="html">
        <cfinput type="hidden" name="user_id" value="#security.userRecord.getuser_id()#">
        <fieldset class="form-group">
            <legend>Persoonlijke gegevens</legend>
            <div class="col-sm-10">
                <label for="name" class="col-2 col-form-label">Naam</label>
                <div class="col-10">
                    <cfinput type="text" name="name" value="#security.userRecord.getName()#" label="Naam" required="true" class="form-control"/>
                </div>
            </div>
        </fieldset>
        <fieldset class="form-group">
            <legend>Inloggegevens</legend>
            <cfset username_ac = StructNew()>
            <cfif !isNew>
                <cfset username_ac.disabled = "disabled">
            </cfif>
            <div class="col-sm-10">
                    <label for="username" class="col-2 col-form-label">Gebruikersnaam</label>
                <div class="col-10">
                    <cfinput attributeCollection="#username_ac#" type="text" name="username" value="#security.userRecord.getusername()#" label="Gebruikersnaam" required="#isNew#" class="form-control"/>
                </div>
            </div>
            <div class="col-sm-10">
                <label for="password" class="col-2 col-form-label">Wachtwoord</label>
                <div class="col-10">
                    <cfinput type="password" name="password" value="" label="Wachtwoord" required="#isNew#" class="form-control"/>
                </div>
            </div>
        </fieldset>
        <fieldset class="form-group">
            <legend>Rollen</legend>
            <div class="col-10">
                <label class="col-2 col-form-label">Beheerder</label>
                <div class="col-10 form-check-inline">
                    <label class="form-check-label">
                        <cfinput type="radio" name="admin" value="true" checked="#security.userRecord.getAdmin()#" label="Ja" class="form-check-input">
                        Ja
                    </label>
                    <label class="form-check-label">
                        <cfinput type="radio" name="admin" value="false" checked="#!security.userRecord.getAdmin()#" label="Nee" class="form-check-input">
                        Nee
                    </label>
                </div>
            </div>

            <div class="col-10">
                <label class="col-2 col-form-label">Onderwijzer</label>
                <div class="col-10 form-check-inline">
                    <label class="form-check-label">
                        <cfinput type="radio" name="teacher" value="true" checked="#security.userRecord.getTeacher()#" label="Ja" class="form-check-input">
                        Ja
                    </label>
                    <label class="form-check-label">
                        <cfinput type="radio" name="teacher" value="false" checked="#!security.userRecord.getTeacher()#" label="Nee" class="form-check-input">
                        Nee
                    </label>
                </div>
            </div>

            <div class="col-10">
                <label class="col-2 col-form-label">Onderzoeker</label>
                <div class="col-10 form-check-inline">
                    <label class="form-check-label">
                        <cfinput type="radio" name="researcher" value="true" checked="#security.userRecord.getResearcher()#" label="Ja" class="form-check-input">
                        Ja
                    </label>
                    <label class="form-check-label">
                        <cfinput type="radio" name="researcher" value="false" checked="#!security.userRecord.getResearcher()#" label="Nee" class="form-check-input">
                        Nee
                    </label>
                </div>
            </div>
        </fieldset>
        <hr/>
        <cfinput type="submit" name="submit" value=" Gebruiker opslaan " label="&nbsp;"/>
    </cfform>
    </div>
    </div>
    </div>
</cfoutput>
