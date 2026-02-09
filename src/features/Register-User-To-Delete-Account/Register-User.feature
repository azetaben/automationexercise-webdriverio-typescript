@smoke @regression @auth
Feature: User Registration

  Scenario: Register a new user successfully and delete account
    Given I navigate to url "/"
    When I click on the "Signup / Login" link
    And I sign up with a unique user
    Then I should see "Account Created!" message
    Then I should see account created confirmation
    And I tap on the continue button
    When I should see "Logged in as" at the top right menu
    When I click on the Delete Account link
    And I tap on the continue button


