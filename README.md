# anerdymous404
![anerdymous404_logo](http://i.imgur.com/hbApy7c.png)
Anonymous Twitter portal to tweet out all your nerdy feelings without being judged.  
[anerdymous404 deployed on heroku](https://anerdymous404.herokuapp.com/)

# Primary Technology
* Node.js app using Sequelize, ejs, and jQuery.
* Twitter API.
* Mapbox API.
* Profanity-Filter node module.

# Key Features
* Input field that is tied to a standalone Twitter account. Adds Tweet and general location data to a database. (Location is only tracked with user consent.)
* Twitter feed with the latest posts from @anerdymous404.
* Heat maps showing relative location of where tweets originated from. Accurate to within 20 miles of initial location given. (Defaults to the Space Needle if no location is found.)
* Heat map automatically zooms to encompass all heat markers.
* Profanity filter replaces explatives with random characters.

# Known Issues
* Profanity filter is too strict, and will filter out words even if they're a part of a longer clean word.
* Reloading the page from the button doesn't include all heat markers, but retyping the url will.

# Future Features
* Automaically like all tweets that @ mention anerdymous404.
* Add option to upload media. (May not happen due to not being able to automatically fitler content.)
