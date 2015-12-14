class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # Turn off CSRF protection for AJAX requests
  skip_before_action :verify_authenticity_token, if: :json_request?

  # Devise Controller Filter - this restricts all pages and actions.
  before_action :authenticate_user!


  protected

  def json_request?
    request.format.json?
  end

end
