const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

describe('Project Sauce Demo', function () {
    let driver;
    this.timeout(20000); // Timeout global

    /**
     * Helper: Login ke SauceDemo
     */
    async function login(username = 'standard_user', password = 'secret_sauce') {
        await driver.get('https://www.saucedemo.com');
        await driver.findElement(By.css('[data-test="username"]')).sendKeys(username);
        await driver.findElement(By.css('[data-test="password"]')).sendKeys(password);
        await driver.findElement(By.css('[data-test="login-button"]')).click();
    }

    /**
     * Helper: Logout dari SauceDemo
     */
    async function logout() {
    // Cek apakah tombol menu ada di halaman
    const menuButtons = await driver.findElements(By.css('#react-burger-menu-btn'));
    if (menuButtons.length > 0) {
        const isDisplayed = await menuButtons[0].isDisplayed();
        if (isDisplayed) {
            await menuButtons[0].click();
            const logoutLinks = await driver.findElements(By.css('#logout_sidebar_link'));
            if (logoutLinks.length > 0) {
                await driver.wait(until.elementIsVisible(logoutLinks[0]), 5000);
                await logoutLinks[0].click();
                }
            }
        }
    }


    // Setup WebDriver (sekali sebelum semua test)
    before(async function () {
        const options = new chrome.Options().addArguments('--incognito');
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    });

    // Jalankan sebelum setiap test
    beforeEach(async function () {
        await login(); // Semua test mulai dalam keadaan sudah login
    });

    // Jalankan setelah setiap test
    afterEach(async function () {
        try {
            await logout(); // Bersihkan state supaya test tidak saling mempengaruhi
        } catch (err) {
            console.warn('Gagal logout di afterEach:', err.message);
        }
    });

    // Tutup browser setelah semua test
    after(async function () {
        await driver.quit();
    });

    it('User berhasil login', async function () {
        const cartButton = await driver.wait(until.elementLocated(By.css('.shopping_cart_link')), 10000);
        assert.ok(await cartButton.isDisplayed(), 'Keranjang belanja tidak tampil');

        const logo = await driver.findElement(By.className('app_logo'));
        const logoText = await logo.getText();
        assert.strictEqual(logoText, 'Swag Labs', 'Logo tidak sesuai');
    });

    it('User berhasil sort produk A-Z', async function () {
        const sortDropdown = await driver.wait(until.elementLocated(By.css('select.product_sort_container')), 5000);
        await sortDropdown.click();
        await driver.findElement(By.css('select.product_sort_container option[value="az"]')).click();

        const productNames = await driver.findElements(By.css('.inventory_item_name'));
        const namesText = await Promise.all(productNames.map(el => el.getText()));

        const sortedNames = [...namesText].sort();

        assert.deepStrictEqual(
            namesText,
            sortedNames,
            `Produk tidak terurut A-Z.\nActual  : ${namesText.join(', ')}\nExpected: ${sortedNames.join(', ')}`
        );
    });
});
