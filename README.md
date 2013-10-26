Box-provider
============

While talking with the Box team here at TC Disrupt, we realised search was a challenge for modern applications.
Users wants more, and they want it faster.

Unlike its competitors, Box already offers a basic search interface. However, we thought we could do better.

We got to work, hoping to search in the contents of every document ; whether it be a Powerpoint Presentation, a picture from a sheet of paper or a markdown file, we wanted to generate a preview o the file and a meaningful snippet.

Since Box offers a fully featured API (well.. it may lack a persistant `refresh_token` for tests!), we started coding in node.js.

Nodejs is our tool of choice to write asynchronous code, allowing us to fetch the content of up to 15 folders at the same time while downloading files and uploading them to our indexing server.

## Installation
Git clone, then `npm install`.

To run the code, you'll need to specify a set of tokens. Write this into a `keys.sh` file and source it before running `npm start`:

```sh
# Go to https://www.box.com/ to register a new app
export BOX_ID="your_box_id"
export BOX_SECRET="your_box_secret"

# Callback after box consent, most probably https://your-host/init/callback
export BOX_CALLBACK_URL="http://localhost:8000/init/callback"
export BOX_CONNECT_URL="http://localhost:8000/init/connect"

# Cluestr app id and secret
export BOX_CLUESTR_ID=""
export BOX_CLUESTR_SECRET=""

export BOX_TEST_REFRESH_TOKEN="waiting for box"
```

## How does it work
We firt get authorization from the Box.com user to use our API.
We retrieve metadatas about every file in every folder of a Box user, using a recursive breadth-first-search.
Each file is then sequentially downloaded (botlle-necked to 5 concurrent files) and uploaded to our indexer server.
This indexer server, available on http://anyfetch.com, begins "hydrating" the document using the open source Tika project to retrieve a textual representation of the file.
For images, we use Tesseract, a free OCR reader, to extract content.

Finally, every piece of data is put into ElasticSearch for fast and accurate querying.
