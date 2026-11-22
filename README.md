# Keyboard Accessible Task Manager

## Overview
This project implements full keyboard accessibility so users can **add**, **toggle**, and **delete** list items using only a keyboard.

## Implemented Requirements
1. **`tabindex` on List Items & Action Buttons**: All list items (`<li tabindex="0">`), toggle controls (`role="checkbox" tabindex="0"`), and delete buttons (`tabindex="0"`) are reachable sequentially via the `Tab` key.
2. **`Enter` and `Space` Key Event Listeners**: Custom `keydown` handlers listen for `Enter` and `Space` keys (`e.preventDefault()` included to stop page scrolling on `Space`) to toggle completion or delete tasks.
3. **Visible CSS Focus Outlines**: High-contrast `:focus-visible` and `:focus` outlines (`3px solid #38bdf8` with `3px` offset) ensure clear visual feedback for the currently focused element.
4. **Tested Keyboard Flow**:
   - Type a task in the input box and press `Enter` (or `Tab` to **Add Task** and press `Enter`/`Space`) to add an item.
   - Press `Tab` to move through list items and toggle controls, then press `Enter` or `Space` to mark items complete/incomplete.
   - Press `Tab` to focus a **Delete** button and press `Enter` or `Space` to remove the task (focus automatically shifts to the next item or back to the input).
