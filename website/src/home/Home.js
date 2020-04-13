import React, { Component } from 'react';

class Home extends Component {

  render() {
    return (
      <div id="home-root">
        <h0>
          This is the Altairix Help Website.
          This contains helpful code snippets and functional tools to help you code faster.
        </h0>
        <p>
          Case Substitution is like a find a replace on steroids.
          It not only does a find a replace, but it will also search for different cases.
          Such as PascalCase, CamelCase, CONST_CASE and css-case
        </p>
        <p>
          The Formatter is used to organize code and code beautification.
          The table will format large blocks with comma spaced values into columns.
          The pivot will prepend whitespace before the pivot character to align the following characters
        </p>
        <p>
          The Templater is used to create reusable templates. This generates files with replaceable symbols.
          Use this if you want to create a template that is going to be reused many times like Tcd and TcdField objects.
        </p>
        <p>
          The Generator uses templates to generate files.
        </p>
        <p>
          The Package Builder is similar to the Generator, but they generate entire folders instead of a single file.
        </p>
      </div>
    );
  }
}

export default Home;