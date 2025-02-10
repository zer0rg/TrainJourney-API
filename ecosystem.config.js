const config = {
  apps: [
    {
      name: 'mi-app',
      script: 'src/index.ts',
      interpreter: 'ts-node',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      env_file: '.env',
    }
  ]
};

module.exports = config;
