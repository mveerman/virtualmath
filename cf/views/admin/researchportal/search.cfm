<cfsilent>
    <cfset viewState.copyToScope(variables, "isResearcher,myself,researchportal.search.entries,xe.view,xe.list,searchFormBean,schoolNames,schoolTypes,schoolLevels,mathTypes")>
    <cfset variables.listEvent = myself & xe.list  />
    <cfset variables.viewEvent = myself & xe.view  />
</cfsilent>

<cfform method="post" format="html">
<cfoutput>
<div class="container">
    <div class="row main-row">
        <div class="12u">
            <h3>Onderzoekersportaal</h3>
            <h4>Doorzoek resultaten (anoniem)</h4>
            <hr />
        </div>
    </div>
    <div class="row">
        <div class="4u">
            <section>
                <cfform method="post" format="html" skin="silver" style="width:95%">
                    <!---<cfformgroup type="vertical">--->
                        <label>Filters</label>
                        <hr>
                        <cfinput type="text" name="code" value="#searchFormBean.getCode()#" validate="integer" message="Onjuiste unieke code opgegeven" label="Unieke code" style="width:95%" />
                        <cfinput type="text" name="dateStart" label="Inleverdatum vanaf" value="#searchFormBean.getDateStart()#" style="width:95%" />
                        <cfinput type="text" name="dateEnd" label="Inleverdatum tot" value="#searchFormBean.getDateEnd()#" style="width:95%" />
                        <hr>
                        <cfinput type="text" name="ageStart" min="10" max="110" label="Leeftijd vanaf" value="#searchFormBean.getAgeStart()#" style="width:95%" />
                        <cfinput type="text" name="ageEnd" min="10" max="110" label="Leeftijd tot en met" value="#searchFormBean.getAgeEnd()#" style="width:95%" />
                        <cfselect name="schoolName" label="Naam school" style="width:95%">
                            <option value="">n.v.t.</option>
                        <cfloop query="schoolNames">
                            <option value="#schoolName#"<cfif searchFormBean.getSchoolName() eq schoolName> selected="selected"</cfif>>#schoolName#</option>
                        </cfloop>
                        </cfselect>
                        <cfselect name="schoolType" label="Schooltype" style="width:95%">
                            <option value="">n.v.t.</option>
                            <cfloop query="schoolTypes">
                                    <option value="#schoolType#"<cfif searchFormBean.getSchoolType() eq schoolType> selected="selected"</cfif>>#schoolType#</option>
                            </cfloop>
                        </cfselect>
                        <cfselect name="schoolLevel" label="Leerjaar" style="width:95%">
                            <option value="">n.v.t.</option>
                            <cfloop query="schoolLevels">
                                    <option value="#schoolLevel#"<cfif searchFormBean.getSchoolLevel() eq schoolLevel> selected="selected"</cfif>>#schoolLevel#</option>
                            </cfloop>
                        </cfselect>
                        <cfselect name="mathType" label="Type wiskunde" style="width:95%">
                            <option value="">n.v.t.</option>
                            <cfloop query="mathTypes">
                                    <option value="#mathType#"<cfif searchFormBean.getMathType() eq mathType> selected="selected"</cfif>>#mathType#</option>
                            </cfloop>
                        </cfselect>
                        <hr/>
                        <cfselect name="run" label="Beperk tot poging">
                            <option value="">n.v.t.</option>
                            <option value="1"<cfif searchFormBean.getRun() eq 1> selected="selected"</cfif>>1</option>
                            <option value="2"<cfif searchFormBean.getRun() eq 2> selected="selected"</cfif>>2</option>
                        </cfselect>
                        <cfinput type="text" name="levelStart" min="0" max="2" label="Niveau vanaf" value="#searchFormBean.getLevelStart()#" style="width:40px" />
                        <cfinput type="text" name="levelEnd" min="0" max="2" label="Niveau tot en met" value="#searchFormBean.getLevelEnd()#" style="width:40px" />
                        <cfselect name="help1Used" label="Help 1 gebruikt" style="width:60px">
                            <option value="">n.v.t.</option>
                            <option value="true"<cfif searchFormBean.getHelp1Used() eq true> selected="selected"</cfif>)>Ja</option>
                            <option value="false"<cfif isBoolean(searchFormBean.getHelp1Used()) and not searchFormBean.getHelp1Used()> selected="selected"</cfif>>Nee</option>
                        </cfselect>
                        <cfselect name="help2Used" label="Help 2 gebruikt" style="width:60px">
                            <option value="">n.v.t.</option>
                            <option value="true"<cfif searchFormBean.getHelp2Used() eq true> selected="selected"</cfif>)>Ja</option>
                            <option value="false"<cfif isBoolean(searchFormBean.getHelp2Used()) and not searchFormBean.getHelp2Used()> selected="selected"</cfif>>Nee</option>
                        </cfselect>
                        <hr/>
                        <cfinput type="submit" name="search" value="Zoek" align="right">
                    <!---</cfformgroup>--->
                </cfform>
            </section>
        </div>
        <div class="8u" style="">
            #viewcollection.getView("admin.researchportal.search.pagination")#
            #viewcollection.getView("admin.researchportal.search.results")#
            #viewcollection.getView("admin.researchportal.search.pagination")#
        </div>
    </div>
</div>
</cfoutput>

</cfform>