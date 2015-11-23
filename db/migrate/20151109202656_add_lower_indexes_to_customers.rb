class AddLowerIndexesToCustomers < ActiveRecord::Migration
  # cmd to generate this migration file w/o content
  #   rails g migration add-lower-indexes-to-customers
  def up
    execute %{
      CREATE INDEX
        customers_lower_last_name
      ON
        customers (lower(last_name) varchar_pattern_ops)
      }
    execute %{
      CREATE INDEX
        customers_lower_first_name
      ON
        customers (lower(first_name) varchar_pattern_ops)
      }
    execute %{
      CREATE INDEX
        customers_lower_email
      ON
        customers (lower(email))
      }
  end
  def down
    remove_index 'customers_lower_last_name'
    remove_index 'customers_lower_first_name'
    remove_index 'customers_lower_email'
  end
end
