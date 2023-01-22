<h1 align=center>Hugo PaperModulo </h1> 

A fork of a [fork](https://github.com/reorx/hugo-PaperModX) of a ["fork"](https://github.com/adityatelange/hugo-PaperMod) of [Paper](https://github.com/nanxiaobei/hugo-paper). What other Mod themed names remain?

<br>


But in all seriousness, thanks [reorx](https://www.github.com/reorx/) and [adityatelange](https://github.com/adityatelange/) for your themes. This is primarily a personal tweak to get used to editing hugo for my own site. See: https://justin.vc for an example of this theme. 

If you're not a fan of my aesthetics, I'd recommend sticking with [PaperMod](https://github.com/adityatelange/hugo-PaperMod) and integrating any changes using the layouts / feel free to copy how I added Utterances, for example.

<br>

## Install

Inside the folder of your Hugo project, run:
```
git submodule add https://github.com/brickfrog/hugo-PaperModulo themes/PaperModulo
```

## Options

Primarily the same as PaperMod / PaperModX. See my [personal config](https://github.com/brickfrog/justin.vc/blob/master/config.yml) for some differences.

## Differences, why fork?

There's a couple things I planned to remove / change around when I have more free time. Right now, things are mostly cosmetic, however I have added:

- [x] Getting dark theme closer to Dracula / Chroma edits
- [x] Utterances for commenting, using the standard PaperMod/X config
- [x] Sidenotes shortcode (thanks for idea/initial code: https://danilafe.com/blog/sidenotes )
- [x] https://omg.lol status integration on homepage
- [x] https://micro.blog mini-feed on homepage
- [x] filter for icon to change color between dark/light mode

TODO:

- [ ] Alternative to InstantClick (outdated?)
- [ ] [giscus](https://github.com/giscus/giscus) support (kinda like utterances, but for github discussions - still in "beta", so keep utterances as option)