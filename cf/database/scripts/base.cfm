<cfsilent>

    /* Create Tables */
    <cfquery datasource="#attributes.datasource#">
    CREATE TABLE STUDENTS
    (
        student_id          NUMERIC NOT NULL,
        name                VARCHAR(255) NOT NULL,
        email               VARCHAR(255),
        age                 NUMERIC NOT NULL,
        school              VARCHAR(255),
        schooltype          VARCHAR(50),
        schoollevel         NUMERIC,
        mathtype            VARCHAR(50)
    )
    </cfquery>

    <cfquery datasource="#attributes.datasource#">
    CREATE TABLE ENTRIES
    (
        entry_id                NUMERIC NOT NULL,
        student_id              NUMERIC NOT NULL,
        data                    BLOB,
        score                   NUMERIC
    )
    </cfquery>

    <cfquery datasource="#attributes.datasource#">
    CREATE TABLE USERS
    (
        user_id                 NUMERIC NOT NULL,
        name                    VARCHAR(255) NOT NULL,
        username                VARCHAR(255) NOT NULL,
        password                VARCHAR(255) NOT NULL,
        admin                   BOOLEAN default TRUE NOT NULL
    )
    </cfquery>

</cfsilent>