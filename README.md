## Technology & Introduction
 This Project is Developed by using Angular(v14) & Node.js(v18) 
 
 I Apologize for not to incorporate Object Recognition functionality from the Image. Because that needs some image processing library like tensorflow and preTrained models but i don't have knowledge on that so i implemented some other features what I can Implement and did good user Experiences. 

## pre-requisites
1, Node software must be installed to run Nodejs based applications. Refer-> https://nodejs.org/en
2, Node version should be >14.
3, Angular framework must be installed. Execute the following command after installed node software -> npm install - g @angular/cli@14
4, Angular framework version should be 14 or more.


## Steps to do before run project
1, Change the directory to inside of the Server folder in CommandPrompt or any editor terminal.
2, Execute the command -> npm install 
3, Change the directory to inside of the UI folder in CommandPrompt or any editor terminal.
4, Execute same command -> npm install


## Steps to do when encountering an error while installing packages
1, Delete "package-lock.json" file in Server/UI where you are getting error.
2, Do clean cache in Server/UI. Execute cmd -> npm cache clean --force
3, Try again to install, Execute cmd -> npm install

## steps to run the application
1, Open the Command Prompt where the Server folder is located and execute the command -> npm start
2, Once you are able to see "Server now listening on port : 3000" on cmd then open browser(Chrome preferable) and check the following url is giving some valid response -> http://localhost:3000/api/getAllimages

3, Open another Command Prompt where the UI folder is located and execute the command -> ng serve
4, Once you are able to see "Compiled successfully" message then open browser and enter the following URL -> http://localhost:4200 

## Accessing steps
1, Once application loaded click the UploadImage button on top right corner and upload the image 
2, Only .jpeg, .png and .gif extension images are supported. Make sure you are uploading only these type of images.
3, If you want to add some sample images into application I have given one images Folder along with server & UI that is named as "SampleImages" or you can upload your own images as well.
