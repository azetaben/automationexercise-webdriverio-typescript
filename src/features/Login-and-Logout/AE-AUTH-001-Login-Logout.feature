@smoke @regression @auth
Feature: Login and Logout

  Scenario: Login with valid credentials then logout
    Given I navigate to url "/"
    When I click on the "Signup / Login" link
    And I should be on the login page
    And I login with valid credentials
    Then I should see "Logged in as" at the top right menu
    When I click on the "Logout" link
    Then I should be on the login page
