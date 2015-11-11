require 'rails_helper'

# Explicitly require our customizations otherwise by configuring RSpec to auto-require everything in
# spec/support, doing so will make specs harder to understand.
require 'support/violate_check_constraint_matcher'

describe User do
  describe "email" do
    let(:user) {
      User.create!(email: "foo@example.com",
                   password: "qwertyuiop",
                   password_confirmation: "qwertyuiop")
    }
    it "absolutely prevents invalid email addresses" do
      expect {
        user.update_attribute(:email, "foo@bar.com")
      }.to raise_error(ActiveRecord::StatementInvalid,
                       /email_must_be_company_email/i)
    end
  end
end