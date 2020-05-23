import playwright, { chromium } from 'playwright'
import { MongoClient } from 'mongodb'

let browser: playwright.ChromiumBrowser
let context: playwright.BrowserContext
let page: playwright.Page
const BASE_URL = 'localhost:3000'

describe('login', () => {

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
    const client = new MongoClient(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PW}@localhost`)
    await client.connect()
    await client.db(process.env.DB_NAME).collection('users').deleteMany({})
    await client.db(process.env.DB_NAME).collection('professionals').deleteMany({})
    await client.db(process.env.DB_NAME).collection('sessions').deleteMany({})
    await client.db(process.env.DB_NAME).collection('centers').deleteMany({})
  })

  describe('register', () => {
    it('can navigate to register', async () => {
      await page.click('text=Registrarme')
      await page.waitForSelector('text=¡Empieza a usar FisioHub!')

      expect(page.url()).toMatch('/register')
    })
    it('can register', async () => {
      await page.goto(BASE_URL + '/register')
      await page.fill('input[name=email]', 'a@a.a')
      await page.fill('input[name=password]', 'aaaaa')
      await page.fill('input[name=repeatPassword]', 'aaaaa')
      await page.click('text=Registrarme')

      // Register center form shown
      expect(await page.waitForSelector('text=a@a.com')).toBeDefined()

      await page.fill('input[name=firstName]', 'mockName')
      await page.fill('input[name=lastName]', 'mockLast')
      await page.fill('input[name=centerName]', 'mockCenterName')
      await page.click('text=Finalizar')

      const result = await page.waitForSelector('text=Dirección de')
      expect(result).toBeDefined()
    })
    it('shows a warning when trying to register with an existing email', async () => {
      await page.goto(BASE_URL + '/register')
      await page.fill('input[name=email]', 'a@a.a')

      await page.click('text=Inicia sesión')
      expect(await page.waitForSelector('text=¿Has cambiado de idea?')).toBeDefined()
    })
  })
  it('can log in', async () => {
    await page.fill('input[name=email]', 'a@a.com')
    await page.fill('input[name=password]', 'aaaaa')
    await page.click('text=Iniciar sesión')

    await page.waitForSelector('text=Dirección de')

    expect(page.url()).toMatch('/user')
  })
})