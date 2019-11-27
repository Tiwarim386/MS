# Entry_Management_System
Entry Management Software (Innovaccer Summergeeks SDE intern 2020 assignment)



## Approach

As the visitors in office and outside are high, so made a Entry Management System.

Workflow of the software is like when a visitor enter the office. Guard seated at the entrance take his/her details and details of the person whom they want to meet and fill the check-in form. To track the visitor entered in the office, this data is POSTed onto the server-side route /checkin which contains the logic to store the details of the person in the Entry Schema. There we store guest name(string), guest email(string), guest phone(string), host name(String), host email(String), host Phone(String) and Check-In & Check-Out time(String using moment.js). Along with storing the details in the database, the system send e-mail (using NodeMailer api) and message (using nexmo api) notification to the host regarding details of the visitor coming to meet him.

When the meeting gets over and the visitor starts leaving the office at the exit gate, guard ask the mail-id of the visitor and make entry in Check-out form. This data is PATCHed onto the server-side route /checkout which contains logic to update the Check-Out time of the visitor in the Entry Schema. Along with this the system send e-mail to the visitor regarding meeting details. Also, this data gets deleted from the Entry Schema as now the visitor has been checked out and added to another database schema named Logbook.

( Why I am creating two collections? This is my assumption that someone visiting today can also make a visit next day, now if we will have only one collection then that will lead towards confusion at the time of updating Check-out time of the visitor. As now we will have two such entry, so which should be updated that's why made two collections. One 'Entry' table to maintain details of visitor presently inside the office & another 'Logbook' table to maintain details of all entry of visitors exited (means they are not inside office). This also helps in differentiating & maintaining list of current visitors and past visitors which leads to fast processing of updating query in Entry table and getting data request query from Logbook table. Although, we can do this using one table also then, we have to add another attribute. The attribute can be a boolean value that will hold detail of whether the visitor has checked out or not. So, according to that boolean value we can match among the duplicate entries that whose Check-Out time needs to be updated. ) 

Now, details of all past visitor logs are shown in logbook view using GET request onto the server-side which contains logic to get all entry of Logbook Schema.


## Technology Stack

- NodeJS
- MongoDB
- ExpressJS
- AngularJS
- Nexmo API (for messaging)
- NodeMailer API (for email)


## Getting Started

To test, contribute or just see what we did follow few easy steps:
- clone the repository
- cd to the directory with the repository
- run `yarn install` (or `npm install` if you don't use yarn)
- Go to Nexmo website (<https://www.nexmo.com>), signup there and get your API key and secret
- Make .env file and insert details there regarding API_KEY,API_SECRET for making connection to nexmo api and details of your e-mail and password required to send mail using nodemailer api.
- run the app using `yarn start` (or `npm start`)
- now, open (<http://localhost:3000>) & enjoy!


## Project Folder Structure

> Folder structure does not include node_modules & .env 

    ├── bin                   
    ├── api 
    │   ├── mailer.js
    │   └── send-sms.js
    ├── model
    │   ├── entry.js
    │   └── Logbook.js
    ├── config
    │   ├── db.js
    │   └── env_var.js
    ├── controller
    │   └── user_entry.js
    ├── public
    │   ├── images
    │   ├── stylesheets
    │   │   └── style.css
    │   └── javascripts
    │   │   └── angularapp.js
    ├── routes
    │   └── index.js
    ├── views
    │   ├── index.ejs
    │   ├── option.ejs
    │   ├── checkin.ejs
    │   ├── checkout.ejs
    │   └── logbook.ejs
    ├── app.js
    ├── package.json
    └── README.md

## Contributing

1. Fork it (<https://github.com/Tiwarim386/MS>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
