*** WORKING FROM THE un-required branch ** 

# React Uploader
react component that depends on UploadCare to persist uploads.

### Develop
* `npm run dev` starts webpack-dev-server

### Distribute
* `npm run build` write to dist folder
* `npm version patch` updates version in package.json
* `npm publish` publishes package to public registry
* `npm install react-uploader` from another project to install
* See src/index.html for how to initialize ReactUplaoder


### Initialize in project
See src/index.html for a complete example. This file will be shown when developing with `npm run build`.

#### Step 1: Include CSS
include react-uploader stylesheet in head of document:
`<link rel="stylesheet" href="/react-uploader.css">`

#### Step 2: Include JS
include react-uploader bundle(the output of `npm run build`, which ends up in the dist folder) and uploadcare script from cdn:
```
<script charset="utf-8" src="//ucarecdn.com/widget/2.8.2/uploadcare/uploadcare.full.min.js"></script>
<script src="/react-uploader.js"></script>
```

#### Step 3: Include UploadCare Config Variables
```
UPLOADCARE_LIVE = false;
UPLOADCARE_LOCALE = "en";
UPLOADCARE_TABS = "file url facebook gdrive dropbox instagram evernote flickr skydrive";
UPLOADCARE_PUBLIC_KEY = "38a39e1da7c78a598632";
```

#### Step 4: Create an instance of ReactUploader
`var uploader = new ReactUploader.default(initialData, options, notifier)`

* initialData (ARRAY) should include data from the server if it exists. If data does not exist, pass an empty array.
* options (OBJECT) { allowVideoUploads: (BOOLEAN), descriptionMaxLength: (NUMBER) }
* notifier (FUNCTION) Optional. If included, this function fire every time the uploader state changes. The function will pass an argument that is another function which can be invoked to cancel the last state change in React. Example shown in src/index.html

