component accessors="true" {
    property string search;
    property string previousPage;
    property string nextPage;
    property string code;
    property string dateStart;
    property string dateEnd;
    property string ageStart;
    property string ageEnd;
    property string schoolName;
    property string schoolType;
    property string schoolLevel;
    property string mathType;
    property string run;
    property string levelStart;
    property string levelEnd;
    property string help1Used;
    property string help2Used;

    public any function init() {
        variables.search="";
        variables.previousPage="";
        variables.nextPage="";
        variables.code="";
        variables.dateStart="";
        variables.dateEnd="";
        variables.ageStart="";
        variables.ageEnd="";
        variables.schoolName="";
        variables.schoolType="";
        variables.schoolLevel="";
        variables.mathType="";
        variables.run="";
        variables.levelStart="";
        variables.levelEnd="";
        variables.help1Used="";
        variables.help2Used="";

        return this;
    }

    public boolean function isSearchStarted() {
        return isSearch() or isNextPage() or isPreviousPage();
    }

    public boolean function isSearch() {
        return len(this.getSearch());
    }

    public boolean function isNextPage() {
        return len(this.getNextPage());
    }

    public boolean function isPreviousPage() {
        return len(this.getPreviousPage());
    }
}
