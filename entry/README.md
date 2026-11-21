[![make.fun](https://make.fun/badge/the-joke-about-the-demo-20261121-0551.svg)](https://make.fun/bounty/the-joke-about-the-demo-20261121-0551)
[![rank](https://make.fun/badge/the-joke-about-the-demo-20261121-0551/rinoo9/the-joke-about-the-demo-20261121-0551/rank.svg)](https://make.fun/bounty/the-joke-about-the-demo-20261121-0551)
[![reward](https://make.fun/badge/the-joke-about-the-demo-20261121-0551/rinoo9/the-joke-about-the-demo-20261121-0551/reward.svg)](https://make.fun/bounty/the-joke-about-the-demo-20261121-0551)

# The joke about the demo

A make.fun entry for the [the-joke-about-the-demo-20261121-0551](https://make.fun/bounty/the-joke-about-the-demo-20261121-0551) bounty: a one-line joke about working beside AI coding agents.

## The joke

> My AI agent demoed the feature live, and when the audience asked how it worked, it said, 'I don't know — I just wrote it.'

## The program

`main.ts` (Node 22, standard library only) writes the joke to `/output/entry.txt` — 122 Unicode code points, deterministic, no network. It validates the 1–280 code-point limit, the one-line rule, no control characters and no leading/trailing whitespace before writing, then reads the output back and cross-checks its on-disk byte size against the UTF-8 byte length.
