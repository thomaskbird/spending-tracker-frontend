# How to Configure Git's Hook Directory

**Setting a custom hook directory requires Git version 2.9+**

Run `git config core.hooksPath .githooks` in the project directory.

To reset the hook directory run `git config core.hooksPath .git/hooks` in the project directory.

Or remove this line from **.git/config**:

    hooksPath = .githooks

Git hook scripts must be set as executable before being commited to the repository or they will not execute:

    chmod +x commit-msg
