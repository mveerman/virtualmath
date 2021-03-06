<cfscript>
    secService = application._modelglue.getBean("AdminSecurityService");

    UserGW = application._modelglue.getBean("UserGateway");
    adminUser = UserGW.get();
    adminUser.setName("Administrator");
    adminUser.setUsername("admin");
    adminUser.setPassword(secService.saltPassword("admin"));
    adminUser.setAdmin(true);
    adminUser.setTeacher(false);
    adminUser.setResearcher(false);
    UserGW.save(adminUser);

    UserGW = application._modelglue.getBean("UserGateway");
    teacher = UserGW.get();
    teacher.setName("Dummy teacher");
    teacher.setUsername("teacher");
    teacher.setPassword(secService.saltPassword("teacher"));
    teacher.setAdmin(false);
    teacher.setTeacher(true);
    teacher.setResearcher(false);
    UserGW.save(teacher);

    UserGW = application._modelglue.getBean("UserGateway");
    researcher = UserGW.get();
    researcher.setName("Dummy researcher");
    researcher.setUsername("researcher");
    researcher.setPassword(secService.saltPassword("researcher"));
    researcher.setAdmin(false);
    researcher.setTeacher(false);
    researcher.setResearcher(true);
    UserGW.save(researcher);
</cfscript>

