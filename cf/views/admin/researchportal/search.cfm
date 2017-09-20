<cfsilent>
    <cfset viewState.copyToScope(variables, "isResearcher,myself,researchportal.search.entries,xe.view,xe.list,searchFormBean,schoolNames,schoolTypes,schoolLevels,mathTypes")>
    <cfset variables.listEvent = myself & xe.list/>
    <cfset variables.viewEvent = myself & xe.view/>
</cfsilent>

<cfform method="post" format="html">
    <cfoutput>
        <div class="container">
            <div class="row main-row">
                <div class="12u">
                    <h3>Onderzoekersportaal</h3>
                    <h4>Doorzoek resultaten (anoniem)</h4>
                    <hr/>
                </div>
            </div>
        <div class="row">
        <div class="4u">
        <section>
        <cfform method="post" format="html">
            <div class="card">
            <div class="card-header">
                <h4 class="card-title">Filters</h4>
            </div>
        <div class="card-block">

            <div class="form-group">
                <label for="code">Unieke code</label>
                <input type="number" name="code" value="#searchFormBean.getCode()#" min="1" placeholder="Geef een unieke code op" class="form-control col-12"/>
            </div>
            <div class="form-group">
                <label >Inleverdatum</label>
                <div class="form-inline">
                    <input type="date" name="dateStart" value="#searchFormBean.getDateStart()#" class="form-control col-5"/>
                    <label for="dateEnd" class="col-2">t/m</label>
                    <input type="date" name="dateEnd" value="#searchFormBean.getDateEnd()#" class="form-control col-5"/>
                </div>
            </div>
                <hr/>
            <div class="form-group">
                <label>Leeftijd</label>
                <div class="form-inline">
                    <input type="number" name="ageStart" min="10" max="110" value="#searchFormBean.getAgeStart()#"
                               class="form-control col-5"/>
                    <label for="ageEnd" class="col-2">&nbsp;t/m</label>
                    <input type="number" name="ageEnd" min="10" max="110" value="#searchFormBean.getAgeEnd()#"
                               class="form-control col-5"/>
                </div>
            </div>
            <div class="form-group">
                <label for="schoolName">Naam school</label>
                <select name="schoolName" class="form-control col-12">
                    <option value="">n.v.t.</option>
                    <cfloop query="schoolNames">
                            <option value="#schoolName#"<cfif searchFormBean.getSchoolName() eq schoolName>
                            selected="selected"</cfif>>#schoolName#</option>
                    </cfloop>
                </select>
            </div>
            <div class="form-group">
                <label for="schoolName">Schooltype</label>
                <select name="schoolType" class="form-control col-12">
                        <option value="">n.v.t.</option>
                    <cfloop query="schoolTypes">
                            <option value="#schoolType#"<cfif searchFormBean.getSchoolType() eq schoolType>
                            selected="selected"</cfif>>#schoolType#</option>
                    </cfloop>
                </select>
            </div>
            <div class="form-group">
                <label for="schoolLevel">Leerjaar</label>
                <select name="schoolLevel" class="form-control col-12">
                        <option value="">n.v.t.</option>
                    <cfloop query="schoolLevels">
                            <option value="#schoolLevel#"<cfif searchFormBean.getSchoolLevel() eq schoolLevel>
                            selected="selected"</cfif>>#schoolLevel#</option>
                    </cfloop>
                </select>
            </div>
            <div class="form-group">
                <label for="mathType">Type wiskunde</label>
                <select name="mathType" class="form-control col-12">
                        <option value="">n.v.t.</option>
                    <cfloop query="mathTypes">
                            <option value="#mathType#"<cfif searchFormBean.getMathType() eq mathType>
                            selected="selected"</cfif>>#mathType#</option>
                    </cfloop>
                </select>
            </div>
            <hr/>
            <div class="form-group">
                <label for="run">Beperk tot poging</label>
                <select name="run" class="form-control col-4">
                    <option value="">n.v.t.</option>
                            <option value="1"
                    <cfif searchFormBean.getRun() eq 1> selected="selected"</cfif>>1</option>
                        <option value="2"
                    <cfif searchFormBean.getRun() eq 2> selected="selected"</cfif>>2</option>
                </select>
            </div>
            <div class="form-group">
                <label>Niveau</label>
                <div class="form-inline">
                    <input type="number" name="levelStart" min="0" max="2" value="#searchFormBean.getLevelStart()#"
                               class="form-control col-5"/>
                    <label for="levelEnd" class="col-2">&nbsp;t/m</label>
                        <input type="number" name="levelEnd" min="0" max="2" value="#searchFormBean.getLevelEnd()#"
                               class="form-control col-5"/>
                </div>
            </div>
            <div class="form-group">
                <label for="help1Used">Help 1 gebruikt</label>
                <select name="help1Used" class="form-control col-4">
                        <option value="">n.v.t.</option>
                            <option value="true"
                    <cfif searchFormBean.getHelp1Used() eq true> selected="selected"</cfif>)>Ja</option>
                        <option value="false"
                    <cfif isBoolean(searchFormBean.getHelp1Used()) and not searchFormBean.getHelp1Used()>
                                selected="selected"</cfif>>Nee</option>
                </select>
            </div>
            <div class="form-group">
                <label for="help2Used">Help 2 gebruikt</label>
                <select name="help2Used" class="form-control col-4">
                        <option value="">n.v.t.</option>
                            <option value="true"
                    <cfif searchFormBean.getHelp2Used() eq true> selected="selected"</cfif>)>Ja</option>
                        <option value="false"
                    <cfif isBoolean(searchFormBean.getHelp2Used()) and not searchFormBean.getHelp2Used()>
                                selected="selected"</cfif>>Nee</option>
                </select>
            </div>
        </div>
        <div class="card-footer ">
            <cfinput type="submit" name="search" value="Zoek" align="right" class="btn btn-primary">
        </div>
        </div>
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