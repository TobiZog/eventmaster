# v.0.3.0 (2025-02-28)
## 🚀 Features
- Swagger Documentation
- RPM Image

## 🐛 Bugfixes
- Bugfix on search page for Band datasets

# v.0.2.0 (2024-12-05)
## 🚀 Features
- Adding "Test Environment" banner in the bottom right corner
- License handling system
- New SQL-Injection exercise 2.1
- Solution code based on Matrikelnummer and number of completed exercises

## 🌟 Enhancements
- Improve exercise solution of 2.1, 2.2, 2.3, 2.4 and 2.6
- Light mode improvements
- Global color schema
- More feedback through notifications
- More hints on text fields
- Redesign account pages, split payments and addresses, new dashboard

## 🐛 Bugfixes
- More server stability
- Bugfix file manager in Electron application

# v.0.1.0 (2024-11-21)
## 🚀 Features
- Frontend
  - VueJS frontend framework with Vuetify UI library
  - Homepage with upcoming concerts, top locations and slider of all bands
  - "All Bands" & "All Concerts" pages with filter option
  - "All Locations" groups locations by city
  - Band detail page with concerts, member, rating and gallery section
  - Location detail page with concerts and seat plan
  - Concert booking page. Seat can be selected by user and added to the basket
  - User register, login and management system. Orders are visible after booking is complete
  - Global search: Search for band names, locations and concerts
  - URL simulation bar (needed for some exercises) with previous/next, go and reload buttons
  - Preferences:
    - Two themes (dark, light)
    - Two languages (German, English)
    - Database and exercise progress reset
    - Reset to factory settings. Triggers also first install wizard
  - Admin Panel
    - Bands, concerts, locations, accounts, genres and orders page shows data in a data table
    - File browser of open accessable file on server like images and scripts
- Backend
  - ExpressJS backend server with Sequelize database management system
  - Multiple API access points for data exchange
  - SQLite 3 Database hosts all data
    - 4 Account roles
    - 7 Accounts with multiple addresses and payments
    - 8 bands with
      - 24 music genres
      - 35 band members
      - 13 rating datasets
    - 17 event locations with
      - 4 different cities
      - 79 seat groups total
      - 300 seat rows total
      - 2170 seats total
    - 27 concerts
    - 3 orders with 4 tickets
- Exercises
  - 12 exercises in four exercise groups
  - Every exercise displays a notification message on solution
  - Progress is visible on the help page in frontend
  - PDF export of exercise progress with name and student register number
