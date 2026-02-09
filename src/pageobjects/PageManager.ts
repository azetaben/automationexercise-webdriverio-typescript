import AccountCreatedPage from "./AccountCreatedPage";
import AuthPage from "./AuthPage";
import {LoginSignupPage} from "./LoginSignupPage";
import {AccountPage} from "pageobjects/AccountPage";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import ContactFormSuccessPage from "./ContactFormSuccessPage";
import ContactUsPage from "./ContactUsPage";
import CookiePage from "./CookiePage";
import DeletedAccountPage from "./DeletedAccountPage";
import FooterPage from "./FooterPage";
import HomePage from "./HomePage";
import LeftSidebarPage from "./LeftSidebarPage";
import PaymentDonePage from "./PaymentDonePage";
import PaymentPage from "./PaymentPage";
import ProductDetailsPage from "./ProductDetailsPage";
import ProductsPage from "./ProductsPage";
import SearchPage from "./SearchPage";
import SignupPage from "./SignupPage";
import TestCasesPage from "./TestCasesPage";
import TopNavigationBarPage from "./NaviPage.ts";
import VideoTutorialPage from "./VideoTutorialPage";
import SearchResultPage from "./SearchResultPage";
import OrderConfirmationPage from "./OrderConfirmationPage";
import Page from "./Page";


/**
 * PageManager acts as a central repository for all Page Objects.
 * It provides lazy instantiation, ensuring pages are only created when accessed.
 */
class PageManager {
    // Since we are exporting instances from the page files (e.g., `export default new HomePage()`),
    // the manager simply provides a clean interface to access these singletons.
    // If you were exporting classes, this manager would handle the `new Class()` instantiation.
    get page() {
        return Page;
    }

    get loginSignupPage() {
        return LoginSignupPage;
    }

    get accountCreatedPage() {
        return AccountCreatedPage;
    }

    get accountPage() {
        return AccountPage;
    }

    get authPage() {
        return AuthPage;
    }

    get cartPage() {
        return CartPage;
    }

    get checkoutPage() {
        return CheckoutPage;
    }

    get contactFormSuccessPage() {
        return ContactFormSuccessPage;
    }

    get contactUsPage() {
        return ContactUsPage;
    }

    get cookiePage() {
        return CookiePage;
    }

    get deletedAccountPage() {
        return DeletedAccountPage;
    }

    get footerPage() {
        return FooterPage;
    }

    get homePage() {
        return HomePage;
    }

    get leftSidebarPage() {
        return LeftSidebarPage;
    }

    get paymentDonePage() {
        return PaymentDonePage;
    }

    get paymentPage() {
        return PaymentPage;
    }

    get productDetailsPage() {
        return ProductDetailsPage;
    }

    get productsPage() {
        return ProductsPage;
    }

    get searchPage() {
        return SearchPage;
    }

    get searchResultPage() {
        return SearchResultPage;
    }

    get signupPage() {
        return SignupPage;
    }

    get testCasesPage() {
        return TestCasesPage;
    }

    get topNavigationBarPage() {
        return TopNavigationBarPage;
    }

    get videoTutorialPage() {
        return VideoTutorialPage;
    }

    get orderConfirmationPage() {
        return OrderConfirmationPage;
    }
}

// Export a single instance of the manager
export default new PageManager();
