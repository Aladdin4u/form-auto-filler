# form-auto-filler

Form Auto Filler is a chrome extension. A productive tools to automatically fill form.

## Getting Started

You can install ready extension directly from Chrome Web Store [here](https://chromewebstore.google.com/).
Feedback and contribute are highly appreciated!

### Prerequisites

Google Chrome browser

### Usage

- All form input element must include name attribute for extension to work well
- name attribute can be in snake_case, camelCase, or PascalCase

```
<form>
    <label for="username">Username:</label>
    <input type="text" id="username" name="username">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email">
    <label for="cars">Choose a car:</label>
    <select id="cars" name="cars" size="3">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="fiat">Fiat</option>
    <option value="audi">Audi</option>
    </select>
    <label for="job descripton">Job Discription:</label>
    <textarea
        name="job_descripton"
        rows="10"
        cols="30"
    ></textarea>
</form>
```

### Installing

- Clone this repo. run `git clone https://github.com/Aladdin4u/form-auto-filler.git`
- Open Google Chrome
- Go to the Extensions page by entering `chrome://extensions` in a new tab.
- Click the Load unpacked button and select the extension directory.

With that done you have successfully the extension and you can start using it in development

## Features

- Support all form input elements and input types
- Auto detect and randomly generate value for form
- Manually add rules
- Add and delete rules

## Built With

- HTML - HTML is the standard markup language for creating Web pages.
- CSS - It can control the layout of multiple web pages all at once.
- Javascript - JavaScript is the programming language of the Web.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/Aladdin4u/form-auto-filler/tags).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
