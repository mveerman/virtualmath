component accessors="true" {

    property numeric pageSize;
    property query resultQuery;
    property numeric currentPage;
    property string nextPage;
    property string previousPage;

    public any function init() {
        variables.pageSize=10;
        variables.resultQuery=QueryNew("");
        variables.currentPage=1;
        variables.nextPage="";
        variables.previousPage="";

        return this;
    }

    this.tag = {
        pageSize: 10,
        resultQuery: QueryNew(""),
        currentPage: 1,
        nextPage: false,
        previousPage: false
    };

    public numeric function getPageSize() {
        return max(variables.pageSize, 1);
    }

    public boolean function isNextPage() {
        return len(this.getNextPage());
    }

    public boolean function isPreviousPage() {
        return len(this.getPreviousPage());
    }

    public numeric function getCurrentPage() {
        var page = variables.currentPage;
        if (isNextPage()) page=page+1;
        if (isPreviousPage()) page=page-1;
        return min(max(page, 1), getMaxPages());
    }

    public numeric function getTotal() {
        return getResultQuery().recordcount;
    }

    public numeric function getMaxPages() {
        return ceiling(getTotal()/getPageSize());
    }

    public numeric function getFirstPageResult() {
        return min(getTotal(), (getPageSize() * (getCurrentPage()-1)) + 1);
    }

    public numeric function getLastPageResult() {
        return min(getPageSize() * getCurrentPage(), getTotal());
    }

    public boolean function hasPreviousPage() {
        return getCurrentPage() > 1;
    }

    public boolean function hasNextPage() {
        return getCurrentPage() < getMaxPages();
    }
}
