<cfsilent>

    /* Create Tables */
    <cfquery datasource="#attributes.datasource#">
    CREATE TABLE STUDENTS
    (
        student_id          NUMERIC NOT NULL,
        name                VARCHAR(255) NOT NULL,
        age                 NUMERIC NOT NULL,
        school              VARCHAR(255),
        schooltype          VARCHAR(50),
        schoollevel         NUMERIC,
        mathtype            VARCHAR(50),
        PRIMARY KEY (student_id)
    )
    </cfquery>

    <cfquery datasource="#attributes.datasource#">
    CREATE TABLE ENTRIES
    (
        entry_id                NUMERIC NOT NULL,
        student_id              NUMERIC NOT NULL,
        data                    BLOB,
        score                   NUMERIC,
        PRIMARY KEY (entry_id)
    )
    </cfquery>

    <cfquery datasource="#attributes.datasource#">
    CREATE TABLE USERS
    (
        user_id                 NUMERIC NOT NULL,
        name                    VARCHAR(255) NOT NULL UNIQUE,
        username                VARCHAR(255) NOT NULL UNIQUE,
        password                VARCHAR(255) NOT NULL,
        admin                   BOOLEAN default FALSE NOT NULL,
        teacher                 BOOLEAN default FALSE NOT NULL,
        researcher              BOOLEAN default FALSE NOT NULL,
        PRIMARY KEY (user_id)
    )
    </cfquery>

</cfsilent>