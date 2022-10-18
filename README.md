# 📦 HyperTuner INI parser

![Lint and test](https://github.com/hyper-tuner/ini/actions/workflows/test.js.yml/badge.svg?branch=master)
[![CodeQL](https://github.com/hyper-tuner/ini/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hyper-tuner/ini/actions/workflows/codeql-analysis.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/6037e4d75ed48df20016/maintainability)](https://codeclimate.com/github/hyper-tuner/ini/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6037e4d75ed48df20016/test_coverage)](https://codeclimate.com/github/hyper-tuner/ini/test_coverage)
![License](https://img.shields.io/github/license/hyper-tuner/ini)

## Installation

Make sure you have registry specified in the `.npmrc` file:

```bash
@speedy-tuner:registry=https://npm.pkg.github.com
```

Authenticate to GitHub Packages:

[authenticating-to-github-packages](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages)

Proceed with the installation:

```bash
npm i --save @hyper-tuner/ini
```

## CLI capabilities

You can also run this package as a CLI tool.

First you need to provide PAT as a ENV:

```bash
export NPM_GITHUB_TOKEN=my_github_personal_access_token
```

No you can run the tool:

```bash
npx hyper-tuner/ini validate test/data/ini/202103.ini
```
