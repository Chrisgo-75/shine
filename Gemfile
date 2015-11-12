source 'https://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.4'

# Devise
# Setup
#   a) Bootstrap Devise in this app:  rails generate devise:install
#      => create  config/initializers/devise.rb
#      => create  config/locales/devise.en.yml
#   b) Need to tell Devise what Model and Database table we'll use for authentication.
#      $ rails g devise user
gem 'devise'

# 1st: Install below gem running: "bundle"
#      FYI: Bower-rails will look for Bowerfile to find a list of dependencies. Similar to Gemfile.
# 2nd: Create Bowerfile in this application root directory: vim Bowerfile
#      Then add this line to the Bowerfile: asset 'bootstrap-sass-official'
# 3rd: Install Bootstrap thru Bower by running: rake bower:install
#      FYI: bower-rails places files in "/vendor/assets/bower_components/"
gem 'bower-rails'

# Use postgresql as the database for Active Record
gem 'pg'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development, :test do
  # Install gem and depency gems: $ bundle install
  # Add necessary configuration by running: $ rails g rspec:install
  # Edit /spec/spec_helper.rb which contains the majority of RSpec's configuration.
  #
  gem 'rspec-rails'

  # Brings in Capybara as a dependency.
  # Edit rails_helper.rb file
  gem 'poltergeist'

  # Resets database back to a prestine state w/o using transactions (although it can).
  gem 'database_cleaner'

  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'
  gem 'faker' # not using this in production environment.
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'
end

