<cfsilent>
<!---  --->

</cfsilent>

<div class="container">
    <div class="row">
<div class="4u 12u(mobile)"></div>
        <div class="4u">
<section class="bar login-form">
	<h2>Inloggen</h2>
<cfform name="cflogin">
<div class="form-container">
	<div class="row">
	    <div class="12u 12u(mobile)">
            <label>Gebruikersnaam</label>
			<cfinput name="username" type="text" label="username" autosuggest="true" size="100">
	    </div>
    </div>
    <div class="row">
        <div class="12u 12u(mobile)">
            <label>Wachtwoord</label>
			<cfinput name="password" type="password" label="password" size="100">
	    </div>
    </div>
    <div class="row">
        <div class="12u 12u(mobile)">
	        <cfinput name="submit" type="submit" value="Login" class="button">
        </div>
    </div>
</div>
	</cfform>
</section>
			<cfif viewCollection.exists("admin.login.message")>
				<cfoutput>
					<section>
				<div class="docadmin-error">
					#viewCollection.getView("admin.login.message")#
				</div>
                </section>
				</cfoutput>
			</cfif>
		</div>
            <div class="4u"></div>
	</div>
</div>