
# Changenow Bot

## Description

@ChangeNOW_officialbot helps you to exchange cryptocurrency securely and anonymously. No ID, no registration. Just crypto exchange

## How to start

To start Exchange, just visit [Telegram](http://t.me/changeNOW_officialbot_) and press /start!

## Server setup

1. Setup domain with SSL-certificate
2. git clone https://github.com/EvercodeLab/changenow-bot.git
3. cd changenow-bot
4. npm i @babel/core @babel/node @babel/preset-env -g
5. npm install
6. create _.env_ file and enter fields from .env.example
7. npm run serve

## Database setup
1. Install mongodb (https://docs.mongodb.com/v4.0/administration/install-on-linux/)
2. Set db name in DB_NAME .env parameter
3. Create user and password in this db name (`db.createUser()`)
4. Set DB_USERNAME and DB_PASS parameters
5. MongoDB should use ssl connection

## Development setup

1. git clone https://github.com/EvercodeLab/changenow-bot.git
2. cd changenow-bot
3. install mongodb (https://docs.mongodb.com/v4.0/administration/install-on-linux/)
4. npm install
5. create _.env_ file and enter fields from .env.example
6. npm run dev

Tip: Use `dev` branch for testing environment!



