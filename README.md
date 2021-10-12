# express4.17.1-in-docker
EXPRESS 4.17 SPA

IMPORTANT NOTES:

    1. Make sure you follow the steps mentioned under "PROJECT START STEPS" and ensure that the steps execute successfully. 
    2. Make sure you follow the steps mentioned under "DOCKER START STEPS" and ensure that the steps execute successfully. 

PROJECT START STEPS:

    Pre-requisites:
    1. Install node, npm
    2. Install express (npm install express --save)
    3. install memcached locally (https://www.journaldev.com/1/install-memcached-mac)
        $ curl -O https://memcached.org/files/memcached-1.5.0.tar.gz
        $ tar -xvf memcached-1.5.0.tar.gz 
        $ cd memcached-1.5.0
        $ ./configure --prefix=/usr/local
        $ make
        $ memcached

$ sudo make install

    Steps:
    1. To run this application, do the following:
        1.a. Go to the project root directory.
        1.b. Run the following commands respectively in the terminal/command line to build and run the app:
            - npm install
            - npm start
    
    2. Go to http://localhost:8080 in your browser to view it.
    3