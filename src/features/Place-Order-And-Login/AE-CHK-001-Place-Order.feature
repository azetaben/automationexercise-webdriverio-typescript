@regression @checkout
Feature: Checkout

  Scenario: Place an order as a logged in user
    Given I navigate to url "/"
    When I click on the "Signup / Login" link
    And I should be on the login page
    And I login with valid credentials
    Then I should see "Logged in as" at the top right menu
    When I add 3 products to the cart
    And I proceed to checkout
    Then I should see address details and order review
    When I place the order with valid payment details
    Then I should see the order confirmation
