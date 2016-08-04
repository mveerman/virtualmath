component {
    this.tag = {
        search: false,
        previousPage: false,
        nextPage: false,
        code: "",
        dateStart: "",
        dateEnd: "",
        ageStart: "",
        ageEnd: "",
        schoolName: "",
        schoolType: "",
        schoolYear: "",
        mathType: "",
        levelStart: "",
        levelEnd: "",
        run: "",
        help1Used: "",
        help2Used: ""
    };

    public void function setSearch(required string search)
    {
        this.tag.search = true;
    }

    public boolean function getSearch() {
        return this.tag.search;
    }

    public void function setNextPage(required string nextPage)
    {
        this.tag.nextPage = true;
    }

    private boolean function getNextPage() {
        return this.tag.nextPage;
    }

    public void function setPreviousPage(required string previousPage)
    {
        this.tag.previousPage = true;
    }

    private boolean function getPreviousPage() {
        return this.tag.previousPage;
    }

    public boolean function isSearchStarted()
    {
        return getSearch() or getNextPage() or getPreviousPage();
    }

    public void function setCode(required string code)
    {
        this.tag.code = code;
    }

    public string function getCode()
    {
        return this.tag.code;
    }

    public void function setDateStart(required string dateStart)
    {
        this.tag.dateStart = dateStart;
    }

    public string function getDateStart()
    {
        return this.tag.dateStart;
    }

    public void function setDateEnd(required string dateEnd)
    {
        this.tag.dateEnd = dateEnd;
    }

    public string function getDateEnd()
    {
        return this.tag.dateEnd;
    }

    public void function setAgeStart(required string ageStart)
    {
        this.tag.ageStart = ageStart;
    }

    public string function getAgeStart()
    {
        return this.tag.ageStart;
    }

    public void function setAgeEnd(required string ageEnd)
    {
        this.tag.ageEnd = ageEnd;
    }

    public string function getAgeEnd()
    {
        return this.tag.ageEnd;
    }

    public void function setSchoolName(required string schoolName)
    {
        this.tag.schoolName = schoolName;
    }

    public string function getSchoolName()
    {
        return this.tag.schoolName;
    }

    public void function setSchoolType(required string schoolType)
    {
        this.tag.schoolType = schoolType;
    }

    public string function getSchoolType()
    {
        return this.tag.schoolType;
    }

    public void function setSchoolYear(required string schoolYear)
    {
        this.tag.schoolYear = schoolYear;
    }

    public string function getSchoolYear()
    {
        return this.tag.schoolYear;
    }

    public void function setMathType(required string mathType)
    {
        this.tag.mathType = mathType;
    }

    public string function getMathType()
    {
        return this.tag.mathType;
    }

    public void function setLevelStart(required string levelStart)
    {
        this.tag.levelStart = levelStart;
    }

    public string function getLevelStart()
    {
        return this.tag.levelStart;
    }

    public void function setLevelEnd(required string levelEnd)
    {
        this.tag.levelEnd = levelEnd;
    }

    public string function getLevelEnd()
    {
        return this.tag.levelEnd;
    }

    public void function setRun(required string run)
    {
        this.tag.run = run;
    }

    public string function getRun()
    {
        return this.tag.run;
    }

    public void function setHelp1Used(required string help1Used)
    {
        this.tag.help1Used = help1Used;
    }

    public string function getHelp1Used()
    {
        return this.tag.help1Used;
    }

    public void function setHelp2Used(required string help2Used)
    {
        this.tag.help2Used = help2Used;
    }

    public string function getHelp2Used()
    {
        return this.tag.help2Used;
    }
}
