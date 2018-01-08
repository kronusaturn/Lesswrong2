import { Posts, Comments } from 'meteor/example-forum';
import Users from 'meteor/vulcan:users';
import RSSFeeds from '../collections/rssfeeds/collection.js';
import Sequences from '../collections/sequences/collection.js';
import { getSetting } from 'meteor/vulcan:core';
import htmlToText from 'html-to-text';
import ReactDOMServer from 'react-dom/server';
import { Components } from 'meteor/vulcan:core';
import React from 'react';
import { draftToHTML } from '../editor/utils.js';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

const contentToHtml = (content) => {
  if (content) {
    try {
      return draftToHTML(convertFromRaw(content));
    } catch(e) {
      console.log("Failed to convert content to html:", e);
    }
  } else {
    return null;
  }
}

