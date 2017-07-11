# CTRL-Group-Challenge

#### This repo was created using the CLI and the GitHub API:

`curl -u 'antoniotrkdz' https://api.github.com/user/repos -d '{name:CTRL-Group-Challenge}'`

### The challenge is described [here](./Pathway_app_API_Challenge.pdf).

Briefly:

Build a Back-end that can deal with
>clients that send data intermittently over long periods
of time, and may or may not be offline when used.

And that helps on this front too:
>Furthermore, the server stores entities in
highly generic form, so a lot of the client-side API interaction code deals with shoehorning local data into an acceptable format.

I will try to do this using Node.js and PostgreSQL database.

The first solution that came to my mind was to use [Socket.io](https://socket.io/),
which allow real time bi-directional communications between devices.

It could be a viable solution, but I thought that a better way to reach the goal is to use Push Notifications. Namely APNs (Apple Push Notification service).

![APNs_diagram](http://serverdensity.wpengine.com/wp-content/uploads/2009/07/remote_notif_simple.jpg)

Usually this system is used to deliver content from a provider to apple devices (and their users), but according to [this IBM source](https://www.ibm.com/support/knowledgecenter/en/SSYRPW_9.0.1/APNS.html):
>Based on the device configuration, APNS messages can cause the device to change the app badge count, show an alert, and so on. [...], __APNS messages can also cause the app to sync in the background__.

Here we could use this feature to our advantage.

Ino order to simplify APNs operations in Node.js the [apns module](https://www.npmjs.com/package/apns) can be used.

First a little introduction to how I think the database should store the relevant information.

The database diagram:

![database diagram](./QuickDBD-P_diagram.png)

Bonus: The database [SQL file](./QuickDBD-P_diagram.sql) and [documentation](./QuickDBD-P_diagram.pdf).

The main function described in [nodeServer.js](./nodeServer.js) is a PSEUDOCODE (or incomplete/untested code) of the main parts of the concept.

It uses... well, APNs, [Moment.js](http://momentjs.com/) and node's [cron](https://www.npmjs.com/package/cron).

It does the assembly of the payload and the connection to APNs for each user device stored in the database and sends notifications every 12 hours.
This is not a problem as every notification will contain the list missing samples and it will supersede the previous one.
The badge count will represent the number of days missing and the payload will contain an array of days to collect, its main purpose is to give the notification high priority, but it could possibly help in case of partial submssion of the dataset.

Obviously the whole solution is based on the assumption that on the remote device (phone) _the data will be stored in with a sytem that grants unicity of the sample_.

A way of achieving this is using [UUIDs](http://www.ietf.org/rfc/rfc4122.txt). Each sampling could be stored using encoded using uuidv5.
This version allows to encode UUID from arbitrary strings, such as the PatientID, the apple device token and the date of acquisition.

When on line and upon verification of the UUIDs the remote device sends back the requested data to the server.

The [file](./nodeServer.js) includes also the code that will take care of the endpoint that remote devices reach on posting the collected data.
the lastAcquisition field and the relative fields will be update only when there is no other entry with the same UUID. This will grant data
>retention and validity on the server [...].

An elagant example of an alternative sytem is represented by [IBM's Loopback](https://strongloop.com/strongblog/node-js-api-offline-sync-replication/), only available for client side Angularjs and JavaScript web apps. 
