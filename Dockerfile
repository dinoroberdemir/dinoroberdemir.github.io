FROM ruby:3.3-bookworm
WORKDIR /srv/jekyll
COPY Gemfile Gemfile.lock ./
RUN bundle install
EXPOSE 4000
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--force_polling"]
