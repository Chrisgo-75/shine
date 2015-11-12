RSpec::Matchers.define :violate_check_constraint do |constraint_name|
  supports_block_expectations
  # 1- By default the "match" method or "custom matchers" don't support block syntax we're using.
  #    So the "match" method would be given the result of the test code.
  # 2- Since we need to EXECUTE code within the "match" method we need to use the block syntax. The
  #    "supports_block_expectations" method tells RSpec that.
  #
  match do |code_to_test|
    begin
      # Passed in "code_to_test" is:
      #   #<Proc:0x000000056bc9e8@/home/cgarndt/ror_dev/tutorials/pragprog_rails_angular_postgres/shine/spec/models/user_spec.rb:15>
      #   So it is calling the rspec test within user_spec, on line 15.
      code_to_test.()
      # We want an exception to occur! If it doesn't then the next line "false" will fail our test.
      false
    rescue ActiveRecord::StatementInvalid => ex
      # catching the exception we are expecting AND assert that the message caught from exception is what we expect.
      ex.message =~ /#{constraint_name}/
    end
  end # END match do

end