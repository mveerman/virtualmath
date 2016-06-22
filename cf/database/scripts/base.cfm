<cfsilent>

    /* Create Tables */
    <cfquery datasource="#attributes.datasource#">
    CREATE TABLE STUDENTS
    (
        student_id          NUMERIC NOT NULL,
        name                VARCHAR(255) NOT NULL,
        age                 NUMERIC NOT NULL,
        schoolname          VARCHAR(255),
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
        timestamp               DATETIME NOT NULL,
        score                   NUMERIC NOT NULL,
        help1shown              BOOLEAN default FALSE NOT NULL,
        help2shown              BOOLEAN default FALSE NOT NULL,
        PRIMARY KEY (entry_id)
    )
    </cfquery>

    <cfquery datasource="#attributes.datasource#">
    CREATE TABLE ENTRYRUNS
    (
        run_id                  NUMERIC NOT NULL,
        entry_id                NUMERIC NOT NULL,
        run_index               NUMERIC NOT NULL,
        score                   NUMERIC NOT NULL,
        help1shown              BOOLEAN default FALSE NOT NULL,
        help2shown              BOOLEAN default FALSE NOT NULL,
        PRIMARY KEY (run_id)
    )
    </cfquery>

    <cfquery datasource="#attributes.datasource#">
    CREATE TABLE RUNASSIGNMENTS
    (
        assignment_id           NUMERIC NOT NULL,
        run_id                  NUMERIC NOT NULL,
        assignmentnumber        NUMERIC NOT NULL,
        data                    BLOB NOT NULL,
        PRIMARY KEY (assignment_id)
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