component {
    this.tag = {
        pageSize: 10,
        resultQuery: QueryNew(""),
        currentPage: 1,
        nextPage: false,
        previousPage: false
    };

    public void function setPageSize(required numeric pageSize)
    {
        this.tag.pageSize = pageSize;
    }

    public numeric function getPageSize()
    {
        return max(this.tag.pageSize, 1);
    }

    public void function setResultQuery(required query resultQuery)
    {
        this.tag.resultQuery = resultQuery;
    }

    public query function getResultQuery()
    {
        return this.tag.resultQuery;
    }

    public void function setCurrentPage(required numeric currentPage)
    {
        this.tag.currentPage = currentPage;
    }

    public numeric function getCurrentPage()
    {
        var page = this.tag.currentPage;
        if (getNextPage()) page=page+1;
        if (getPreviousPage()) page=page-1;
        return min(max(page, 1), getMaxPages());
    }

    public numeric function getTotal()
    {
        return getResultQuery().recordcount;
    }

    public numeric function getMaxPages()
    {
        return ceiling(getTotal()/getPageSize());
    }

    public numeric function getFirstPageResult()
    {
        return min(getTotal(), (getPageSize() * (getCurrentPage()-1)) + 1);
    }

    public numeric function getLastPageResult()
    {
        return min(getPageSize() * getCurrentPage(), getTotal());
    }

    public void function setNextPage(any nextPage)
    {
        this.tag.nextPage = true;
    }

    private boolean function getNextPage()
    {
        return this.tag.nextPage;
    }

    public void function setPreviousPage(any nextPage)
    {
        this.tag.previousPage = true;
    }

    private boolean function getPreviousPage()
    {
        return this.tag.previousPage;
    }

    public boolean function hasPreviousPage()
    {
        return getCurrentPage() > 1;
    }

    public boolean function hasNextPage()
    {
        return getCurrentPage() < getMaxPages();
    }
}
