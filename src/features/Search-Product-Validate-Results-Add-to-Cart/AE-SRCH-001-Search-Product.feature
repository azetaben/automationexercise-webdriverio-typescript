@regression @search @cart
Feature: Search and add to cart

  Scenario Outline: Search product and add to cart
    Given I navigate to url "/"
    When I click on the "Products" link in the top navigation bar
    And I search for "<keyword>"
    And all results should contain the keyword "<keyword>"
    When I add the first searched product to the cart
    Then the cart should contain at least 1 item

    Examples:
      | keyword |
      | tshirt  |
