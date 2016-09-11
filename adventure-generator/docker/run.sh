docker pull jekyll/jekyll:3.2.1
docker run -v ${PWD}:/srv/ -p 4000:4000 -w /srv jekyll/jekyll:3.2.1 jekyll serve