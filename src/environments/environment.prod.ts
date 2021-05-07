export const environment = {
  production: true,
  baseUrl: 'https://mastercorpdevapi.azurewebsites.net',
  fileurl: 'https://testmcstorage.blob.core.windows.net/htmaster/',
  stripe: 'pk_test_rI2ObieGIf2HL5nmZkUBSnn800u16zSXu6',
  reCaptcha_SiteKey: '6Lfa1_AZAAAAAKcRDyRDIVJCW5sXeOPV15Pgi4KW',
  reCaptcha: '6Lfa1_AZAAAAAMRfgwp-ef3fs68l_8GQ26kg6J8o',
  tokenUrl: null, // For IdentityServer/Authorization Server API. You can set to null if same as baseUrl
  loginUrl: '/login'
};
