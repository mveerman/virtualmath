<cfsilent>
    <cfset viewState.copyToScope(variables, "searchFormBean,searchResultBean")>
</cfsilent>
<cfif searchFormBean.isSearchStarted() and searchResultBean.getTotal() gt 0>
    <cfoutput>
        <div class="rp-pagination">
            <div class="total">
                #searchResultBean.getTotal()# resultaten gevonden<br/>
            </div>
            <div class="page-navigation">
                <input type="submit" <cfif not searchResultBean.hasPreviousPage()>disabled="disabled"</cfif> name="previousPage" value="&lt;&lt; Vorige pagina">
                <span>Pagina #searchResultBean.getCurrentPage()# van #searchResultBean.getMaxPages()#</span>
                <input type="submit" <cfif not searchResultBean.hasNextPage()>disabled="disabled"</cfif> name="nextPage" value="Volgende pagina &gt;&gt;">
            </div>
        </div>
    </cfoutput>
</cfif>