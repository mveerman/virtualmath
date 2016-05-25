<!--- IP restrict --->
<cfscript>
	// add localhost to iprestrict
	UserGW = application._modelglue.getBean("UserGateway");
	adminUser = UserGW.get();
	adminUser.setName("Adminisgtrator");
	adminUser.setUsername("admin");
	adminUser.setPassword("admin");
	adminUser.setAdmin(true);
	UserGW.save(adminUser);
</cfscript>

