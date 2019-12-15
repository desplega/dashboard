module.exports = {
  deploy : {
    production : {
      user : 'ubuntu',
      host : 'localhost',
      ref  : 'origin/master',
      repo : 'git@github.com:desplega/dashboard.git',
      path : '/var/www/dashboard-test',
      "pre-deploy-local": "rm -rf dist",
      'post-deploy' : 'npm install && npm run build',
      "env"  : {
        "NODE_ENV": "production"
      }
    }
  }
};