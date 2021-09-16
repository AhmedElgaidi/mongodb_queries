// If you want to run a monogdb server on either a dedicated, private server to have more controll over it.
// There are many hosting provider that offer such servies: 
// - DigitalOcean (droplets) => we can scale our droplets and increase there numbers.
// - Hetzer (offers dedicatd, vps)
// - godaddy (offers dedicatd, vps)
// - Amazon EC2 (private servers)



// Let's use EC2 services
// 1) Go to services and choose compute EC2 => launch an instance
// 2) choose the free tier ubuntu server
// 3) choose the micro type => launch
// 4) create key pair for connection, let's name it ec2 and download the value => launch
// 5) press connect button and follow the instructions (ssh connection)


// we used Awazon ec2 (to get a vps), but we could do the same from any hosting provider.
// Now we created our server and connected to it and everything is good
// Now install mongodb with the help of manual page instructions

// Now, we need to make mongodb server accept external connections (by default, only accept local connections)
// we need to find out what ip this vps server has by ifconfig

// to know all the ips and ports that mongodb server listen to on this machine we run this:
// sudo netstat -plant | grep mongod

// now, let's open the mongodb config file by
// - sudo nano etc/monogod.conf

// navigate to network interface => if you want to make anyone can access it change the ip from local host into 0.0.0.0
// now, you need to restart mongod service to reflect the chages by "sudo service mogod restart" then "sudo netstat -plant | grep mongod"
// you will notice that the ip changes from 127.0.0.1 to 0.0.0.0, so any ip can access it
// now we can connect successfully, we just need the ip of the vps by ifconfig command

// we configured the mongodb server to accept any external connection, now we need to do some config for the vps server itself, as by default, only ssh connection is available

// Go to the hosting provider dahsboard => add the port number (27017) with tcp connection to the server (by deafult, you will only find port 22 for ssh connections), now you need to add the ip addres of the server that will establish the connection with our vps and then mongo server, so no one can access it (don't make it 0.0.0.0)


// Now, we need to create an admin user in our monogdb server for adminstrations tasks
// switch the monodb shell
// use admin => to use admin database as , we specified in our command below
// db.creatUser({
    //user: "admin",
    // pwd: "my password",
    // roles: [
        // {
            // role: "root",
            // db: "admin"
        // }
    // ] 
// })

// show users => this will give us all users (admin for now)

// now go to /etc/mongod.conf file and navigate to hte security part and un-comment it and add the following:
// authorization: enabled
// crt+x and save
// restart our service again => sudo service mongod restart


// now in our computer, lets' connect to mongodb server
// - mongo "mongodb://<username>:<password>@<public_DNS-name_of_vps>/<DATABASE_NAME>"

// and that's it