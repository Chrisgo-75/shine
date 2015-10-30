class CustomerSearchTerm

  attr_reader :where_clause, :where_args, :order

  def initialize(search_term)
    search_term = search_term.downcase
    @where_clause = "" # initializing instance variables
    @where_args = {} # initializing instance variables
    if search_term =~ /@/
      build_for_email_search(search_term)
    else
      build_for_name_search(search_term)
    end
  end


  def build_for_name_search(search_term)
    @where_clause << case_insensitive_search(:first_name)
    @where_args[:first_name] = starts_with(search_term)
    @where_clause << " OR #{case_insensitive_search(:last_name)}"
    @where_args[:last_name] = starts_with(search_term)
    @order = "last_name asc"
  end


  def build_for_email_search(search_term)
    @where_clause << case_insensitive_search(:first_name)
    @where_args[:first_name] = starts_with(extract_name(search_term))

    @where_clause << " OR #{case_insensitive_search(:last_name)}"
    @where_args[:last_name] = starts_with(extract_name(search_term))

    @where_clause << " OR #{case_insensitive_search(:email)}"
    @where_args[:email] = search_term

    # "search_term" value is provided by user, therefore susceptible to SQL Injection. To prevent this we need to
    # SQL-escape before sending to database. ActiveRecord provides a method "quote".
    @order = "lower(email) = " +
        ActiveRecord::Base.connection.quote(search_term) +
        " desc, last_name asc"
  end


  # Helper Method - appends % to our search term.
  #
  def starts_with(search_term)
    search_term + "%"
  end


  # Helper Method - constructs the SQL fragment.
  #
  def case_insensitive_search(field_name)
    "lower(#{field_name}) like :#{field_name}"
  end


  # Helper Method - uses regular expressions in gsub to remove everything after the @ as well as any digits.
  #
  def extract_name(email)
    email.gsub(/@.*$/,'').gsub(/[0-9]+/,'')
  end

end