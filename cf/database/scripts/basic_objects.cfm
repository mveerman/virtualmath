<!--- IP restrict --->
<cfscript>
	// add localhost to iprestrict
	UserGW = application._modelglue.getBean("UserGateway");
	adminUser = UserGW.get();
	adminUser.setName("Administrator");
	adminUser.setUsername("admin");
	adminUser.setPassword(hash("admin"));
	adminUser.setAdmin(true);
	UserGW.save(adminUser);
</cfscript>

