# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)

## [2.0.0] - 2023-01-03

### Added

- Support for default exports on route file exports. Validation has been added in place for routes files to support both module and default exports.
- Type declarations for TypeScript projects.

### Changed

- Remove class in place of function.
- Change "basePath" to "prefix" (no functionality change).
- This library is only going to work in CommonJS projects due to the nature of import/exports.

### Fixed

- Route file exports can now be both module and default exports.
