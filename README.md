# Thinkful-API-Capstone

A Coding challenge to use data from 1 or more API's to implement a front-end app. 

Developed by: Jeremy Sutton
Web: http://JeremySutton.Solutions
Contact: Jeremy.M.Sutton@gmail.com


### Introduction ###


Goal
------------

The goal of this challenge was to integrate 2 API's in order to create a novevl function. 

With this goal, the Table Topics Picture Generator uses 2 API's in conjunction to return 
loosely related images with which one can practice public speaking in the form of "Table Topics". 

Table Topics are a time-tested practice for rising to the occasion in interviews, dates, meetings, 
and more.

They are a cornerstone of meetings in the groups Toastmasters International, which is a 
not-for-profit organization with the mission to create a supportive environment in which 
people can practice their communication and leadership skills. 


### Functionality ###


API Use:
      * DataMuse
      * Flickr

When a user submits a word or phrase, first this app submits the query to the DataMuse. 
In turn, data muse returns 5 words or phrases related to the initial term submitted. 

Once this list of words/phrases is returned from DataMuse, the app then submits
each of these entries to Flickr, one at at time. For each string, the Flickr API then
returns 3 publically available images subumitted by the Flickr user community. 

Additional Features: 
      * Image display controls
      * On screen Toastmasters Light/Timer

As the images arrive from the Flickr API, each batch of images is displayed on the homepage.
Submitting a search reveals a control panel for that allows the users to toggle each batch of 
images to display or hide. Thus the users can hide any batch of images they do not wish to 
use for their speech practice. 

Additionally, a classic Toastmaster's Timer also appears upon search. This time is fixed to the
bottom right of the display screen. As is custom in Toastmaster meetings, the light turns
green after 60 seconds, yellow after 90, and red after 120. They goal is to speak until 
the green light turns on, then wrap up your speech eloquantly before the red. 


### Future Developments ###


Main Point for Improvement
---------------

The evolution of this project has been a boon for my coding abilities, but this particular
iteration is not as useful as it could be. Here are the primary issues to solve as this 
projects continues to develop

Core Issue: 

The picture format is an interesting function in that it allows a user to generate a 
trigger that is unpredictable. This allows users to practice speaking on topics or 
subjects that they had not thought about previously.

However, in Toastmasters meetings, table topics are generally presented as questions,
not images. So even for experienced Toastmasters, the picture format is difficult as 
an entry point into an impromptu speech.

Solution Table Topics DB
------------------------

As a result of this feedback and user-observation, I've since undertaken an addendum 
project: to create the first database of Table Topics questions. This will allow users a 
new level of interactivity with the app. 

In addition to practicing table topics in a more familiar way, the Table Topics DB will 
encourage user contribution, engagement, and interaction. 
