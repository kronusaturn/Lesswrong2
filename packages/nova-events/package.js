Package.describe({
  name: "nova:events",
  summary: "Telescope event tracking package",
  version: "0.26.5-nova",
  git: "https://github.com/TelescopeJS/Telescope.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");
  
  api.use([

    'ecmascript',

    'nova:lib@0.26.5-nova'
  ]);

  api.mainModule("lib/server.js", "server");
  api.mainModule("lib/client.js", "client");

});
