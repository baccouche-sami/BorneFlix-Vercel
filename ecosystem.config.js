module.exports = {
  apps: [{
    name: 'borneflix',
    script: 'dist/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
      DB_HOST: 'localhost',
      DB_USER: 'borneflix_user',
      DB_PASSWORD: 'your_secure_password',
      DB_NAME: 'borneflix_db',
      SMTP_HOST: 'ssl0.ovh.net',
      SMTP_PORT: 587,
      SMTP_USER: 'contact@borneflix.com',
      SMTP_PASS: 'your_email_password',
      SESSION_SECRET: 'your_session_secret'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
}; 