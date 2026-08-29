# Friend Code Validator Plugin

::: tip Plugin
This feature is provided by the **Empostor.Plugins.FriendCodeValidator** plugin (`duck.Empostor.friendcodevalidator`). It must be installed and enabled for this to work.
:::

## Overview

The Friend Code Validator plugin validates player friend codes against a format pattern and a built-in dictionary of safe/allowed words. This helps prevent inappropriate friend codes on your server.

## Validation Rules

1. **Format**: Friend codes must match the pattern `^([a-zA-Z]+)#(\d{4})$` — a word followed by `#` and exactly 4 digits.
2. **Dictionary**: The word portion must be a recognized English word from the built-in dictionary (approximately 5,000+ words).

If a friend code does not meet both criteria, the player is rejected with a localized message.

## Configuration

This plugin has no configurable options. All validation rules are compiled into the plugin.

## Admin Panel

The admin panel shows an informational tab displaying:
- The validation format pattern
- A note that no configuration options are available

## Multi-Language Support

The plugin supports:
- English (`en`)
- Simplified Chinese (`zh_CN`)
- Traditional Chinese (`zh_TW`)
