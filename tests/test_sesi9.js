const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

describe('SauceDemo', function () {
    let driver;
    this.timeout(20000); // Set timeout untuk menghindari false fail pada koneksi lambat

    /**
     * Helper: Login ke SauceDemo
     * @param {string} username - Username untuk login (default: standard_user)
     * @param {string} password - Password untuk login (default: secret_sauce)
     */
    async function login(username = 'standard_user', password = 'secret_sauce') {
        await driver.get('https://www.saucedemo.com');
        await driver.findElement(By.css('[data-test="username"]')).sendKeys(username);
        await driver.findElement(By.css('[data-test="password"]')).sendKeys(password);
        await driver.findElement(By.css('[data-test="login-button"]')).click();
    }

    // Jalankan sekali sebelum semua test: setup WebDriver
    before(async function () {
        const options = new chrome.Options().addArguments('--incognito'); // Mode incognito untuk mencegah cache/sesi lama
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    });

    // Jalankan sekali setelah semua test: tutup WebDriver
    after(async function () {
        await driver.quit();
    });

    it('User berhasil login', async function () {
        await login();

        // Verifikasi elemen cart muncul setelah login
        const cartButton = await driver.wait(until.elementLocated(By.css('.shopping_cart_link')), 10000);
        assert.ok(await cartButton.isDisplayed(), 'Keranjang belanja tidak tampil');

        // Verifikasi teks logo sesuai
        const logo = await driver.findElement(By.className('app_logo'));
        const logoText = await logo.getText();
        assert.strictEqual(logoText, 'Swag Labs', 'Logo tidak sesuai');
    });

    it('User berhasil sort produk A-Z', async function () {
        await login();

        // Pilih sort option A-Z
        const sortDropdown = await driver.wait(until.elementLocated(By.css('select.product_sort_container')), 5000);
        await sortDropdown.click();
        await driver.findElement(By.css('select.product_sort_container option[value="az"]')).click();

        // Ambil semua nama produk
        const productNames = await driver.findElements(By.css('.inventory_item_name'));
        const namesText = await Promise.all(productNames.map(el => el.getText()));

        // Buat array terurut untuk dibandingkan
        const sortedNames = [...namesText].sort();

        // Validasi hasil sort
        assert.deepStrictEqual(
            namesText,
            sortedNames,
            `Produk tidak terurut A-Z.\nActual  : ${namesText.join(', ')}\nExpected: ${sortedNames.join(', ')}`
        );
    });
});
