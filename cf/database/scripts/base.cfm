<cfsilent>

    <cfquery datasource="#attributes.datasource#">
    CREATE TABLE users
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

    <cfquery datasource="#attributes.datasource#">
    CREATE TABLE students
    (
        student_id          NUMERIC NOT NULL,
        name                VARCHAR(255) NOT NULL,
        age                 NUMERIC NOT NULL,
        schoolname          VARCHAR(255),
        schooltype          VARCHAR(50),
        schoollevel         NUMERIC,
        mathtype            VARCHAR(50),
        teacher             VARCHAR(255),
        PRIMARY KEY (student_id)
    )
    </cfquery>

    <cfquery datasource="#attributes.datasource#">
    CREATE TABLE entries
    (
        entry_id                NUMERIC NOT NULL,
        student_id              NUMERIC NOT NULL,
        timestamp               DATETIME NOT NULL,
        score                   NUMERIC NOT NULL,
        help1shown              BOOLEAN default FALSE NOT NULL,
        help2shown              BOOLEAN default FALSE NOT NULL,
        PRIMARY KEY (entry_id),
        FOREIGN KEY (student_id) REFERENCES students(student_id)
    )
    </cfquery>

    <cfquery datasource="#attributes.datasource#">
    CREATE TABLE entryruns
    (
        run_id                  NUMERIC NOT NULL,
        entry_id                NUMERIC NOT NULL,
        run_index               NUMERIC NOT NULL,
        score                   NUMERIC NOT NULL,
        help1shown              BOOLEAN default FALSE NOT NULL,
        help2shown              BOOLEAN default FALSE NOT NULL,
        PRIMARY KEY (run_id),
        FOREIGN KEY (entry_id) REFERENCES entries(entry_id)
    )
    </cfquery>

    <cfquery datasource="#attributes.datasource#">
    CREATE TABLE runassignments
    (
        assignment_id           NUMERIC NOT NULL,
        run_id                  NUMERIC NOT NULL,
        assignmentnumber        NUMERIC NOT NULL,
        data                    BLOB NOT NULL,
        PRIMARY KEY (assignment_id),
        FOREIGN KEY (run_id) REFERENCES entryruns(run_id)
    )
    </cfquery>

</cfsilent>