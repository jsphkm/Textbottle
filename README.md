# Textbottle
This is an web-based WYSIWYG editor.

![landscape login](https://user-images.githubusercontent.com/28643797/44761951-0d827700-aafa-11e8-81b9-f59bfac30362.png)

## Demo

* [Live Demo](https://guarded-woodland-18277.herokuapp.com)

### Login Info (for testing)
 - email: john@doe.com
 - password: passwordpassword

 You will be able to view a couple of excerpts from actual Medium articles.

## Editor

![editor](https://user-images.githubusercontent.com/28643797/44765385-4ece5300-ab09-11e8-9980-fa03cff01c28.png)

This editor provides a few formatting options, which are bold, italics, hyperlinks, headers, and quotes.  These are styled similarly to Medium.

Auto-save
===
This editor has an auto-save feature.  The writing will be automatically saved after a certain amount of time has passed when the user has stopped typing. It saves the writing with the following format:

  - Title: First line of the writing
  - Subtitle: Second line of the writing
  - Full content: The entire writing (innerHTML format)
  - Last edited date

## Side Pane

<img src='https://user-images.githubusercontent.com/28643797/44765688-ba64f000-ab0a-11e8-9291-542ec310234d.png' alt='mobile-image' width='200' />

The hamburger menu will 'pull and squeeze' in wide display, or it will 'pop-over' when viewing in small display sizes.
The writings will be listed in chronological order of creation with the latest on the top to the oldest on the bottom.

## Built/Tested With
 - Express
 - Mongo
 - Mongoose
 - Chai
 - Passport
 - Heroku
 - Travis
