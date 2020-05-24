require('dotenv').config()
import playwright, { chromium } from 'playwright'
import { MongoClient } from 'mongodb'

let browser: playwright.ChromiumBrowser
let context: playwright.BrowserContext
let page: playwright.Page
const BASE_URL = 'localhost:3000'

const email = 'a@a.com'
const password = 'aaaaa'

describe('session', () => {

  beforeEach(async () => {
    browser = await chromium.launch()
    context = await browser.newContext()
    page = await context.newPage()
    await page.goto(BASE_URL)
  })

  afterEach(async () => {
    await browser.close()
  })

  afterAll(async () => {
    try {
      const client = new MongoClient(`mongodb://localhost:27017`,
        { useUnifiedTopology: true, useNewUrlParser: true, authSource : 'admin' })
      await client.connect()
      await client.db(process.env.DB_NAME).collection('users').deleteMany({})
      await client.db(process.env.DB_NAME).collection('professionals').deleteMany({})
      await client.db(process.env.DB_NAME).collection('sessions').deleteMany({})
      await client.db(process.env.DB_NAME).collection('centers').deleteMany({})

      await client.close()
    } catch (e) {
      console.error(e)
    }
  })

  describe('register', () => {
    it('can navigate to register', async () => {
      await page.click('text=Registrarme')
      await page.waitForSelector('text=¡Empieza a usar FisioHub!')

      expect(page.url()).toMatch('/register')
    })
    it('can register', async () => {
      await page.goto(BASE_URL + '/register')
      await page.fill('input[name=email]', email)
      await page.fill('input[name=password]', password)
      await page.fill('input[name=repeatPassword]', password)
      await page.click('text=Registrarme')

      await page.fill('input[name=firstName]', 'mockName')
      await page.fill('input[name=lastName]', 'mockLast')
      await page.fill('input[name=centerName]', 'mockCenterName')
      await page.click('text=Finalizar')

      const result = await page.waitForSelector('text=Dirección de')
      expect(result).toBeDefined()
    })
    it('shows a warning when trying to register with an existing email', async () => {
      await page.goto(BASE_URL + '/register')
      await page.fill('input[name=email]', email)
      await page.fill('input[name=password]', password)

      expect(await page.waitForSelector('text=Vaya,')).toBeDefined()
    })
  })

  describe('login', () => {
    it('can log in', async () => {
      await page.fill('input[name=email]', email)
      await page.fill('input[name=password]', password)
      await page.click('text=Iniciar sesión')

      await page.waitForSelector('text=Dirección de')

      expect(page.url()).toMatch('/user')
    })
  })
})