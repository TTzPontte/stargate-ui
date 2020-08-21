# Stardust Front-End Template ✨

Stardust is the next generation of projects of the @pontte. It brings you an entire configuration to start a new project in a button click distance.

![](https://github.com/pontte/stardust/workflows/promote-prod-from-preprod-branch/badge.svg)

## Getting Started

You **must change** some information in the `package.json`:

- `name`
- `description`
- `files`
- `homepage`
- `main`
- `repository.url`
- `bugs.url`
- `homepage`

If your project will be a consumable one, don't forget to add distribution folder into `files` and specify `main` file.

You **can change** but will be need to change Github Actions workflows:

- `scripts.build`
- `scripts.test-lint`
- `scripts.test-unit`

You **can't change**:

- `version`

Any other changes in `package.json` or Github Actions workflows **could break automation**. Be careful.
