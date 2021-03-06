source 'https://rubygems.org'
ruby '2.5.7'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

# core gems
gem 'rails', '~> 5.2.4'
gem 'bootsnap'
gem 'puma', '~> 3.12.6'

# DB
gem 'pg', '~> 0.20'
gem 'pg_search'
gem 'scenic'
gem 'secondbase'

# UI, assets
gem 'coffee-rails', '~> 4.2'
gem 'sass-rails', '~> 5.0'
gem 'sprockets',  '~> 3.7.2'
gem 'turbolinks', '~> 5'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker'

# API
gem 'active_model_serializers', '~> 0.10.0'
gem 'api-pagination'
gem 'faraday'
gem 'kaminari'

# Admin panel
gem 'activeadmin'
gem 'devise'
gem 'trix-rails', require: 'trix'

# storage
gem 'aws-sdk-rails', '~> 2'
gem 'aws-sdk-s3', '~> 1'

# jobs
gem 'sidekiq', '>= 6.1.0'

# Error monitoring
gem 'appsignal'

# other
# Moved to global gems because of this
# https://github.com/rails/rails/issues/24063
gem 'activerecord-import'
gem 'listen', '>= 3.0.5', '< 3.2'
gem 'oj'
gem 'rubyzip'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'capybara', '~> 2.13'
  gem 'dotenv-rails'
  gem 'factory_bot_rails'
  gem 'rails-controller-testing'
  gem 'rspec-collection_matchers'
  gem 'rspec-rails', '~> 3.5'
  gem 'selenium-webdriver'
end

group :development do
  gem 'annotate'
  gem 'brakeman', require: false
  gem 'bundler-audit', require: false
  gem 'rubocop', require: false
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end

group :test do
  gem 'json-schema'
  gem 'simplecov', require: false
  gem 'test-prof'
  gem 'vcr'
  gem 'webmock'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

git 'https://github.com/ClimateWatch-Vizzuality/climate-watch-gems.git' do
  gem 'cw_data_uploader', '~> 0.5.1', require: 'data_uploader'
  gem 'climate_watch_engine', '~> 1.4.3'
end

# for debugging
# gem 'cw_data_uploader', '~> 0.5.1', require: 'data_uploader', path: '../climate-watch-gems'
