# Contributing

Thanks for considering contributing to bird!

## Opening issues

If you find a bug, please feel free to [open an issue](https://github.com/amovah/bird/issues).

If you taking the time to mention a problem, even a seemingly minor one, it is greatly appreciated, and a totally valid contribution to this project. Thank you!

## Fixing bugs

We love pull requests. Here’s a quick guide:

1. [Fork this repository](https://github.com/amovah/bird/fork) and then clone it locally:

  ```bash
  git clone https://github.com/amovah/bird
  ```

2. Change whatever you want and fix the issue (or bug).

3. Build your code:

  ```bash
  gulp prod
  ```

  Note: Probably you need install gulp. Install gulp: `[sudo] npm install -g gulp-cli`

4. Commit your changes:

  ```bash
  git commit -am "Adds a fix for that thing!"
  ```

  Note: For having better commit messages, you should [read this](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit).

5. If everything looks good, push your changes:

  ```bash
  git push origin master
  ```

7. [Submit a pull request.](https://help.github.com/articles/creating-a-pull-request)

8. Enjoy being the wonderful person you are

## Adding new features

Thinking of adding a new feature? Cool! [Open an issue](https://github.com/amovah/bird/issues) and let’s design it together.

### Router

To add routers, you should create a file in `src/routers/` directory, the simplest way is to write `./bird router ROUTERNAME` in command line.

### Model(Database Collections)

To add collecions, you should create a file in `src/models` directory, the simplest way is to write `./bird model MODELNAME` in command line.

### Public Files

To add CSS, JavaScript, Fonts or Images you should put them in `src/public` file.

Note: CSS files must have .less extension in `/src/public/css/`, except `/src/public/css/lib/` that must have .css

### Utilities

To add utilities you should add files to `src/utils/`

### View

To add html files you should add them to `/src/views/`

Note: In this project we're using nunjucks template, so your files must have .njk extension

### Permissions

To add a permission, add the file to `src/perms/`

## Before you push

Make sure that your files are lint.

You can lint js files in `src/public/js` files using `gulp client:lint` command.

And Other JS files using `gulp server:lint` command.
