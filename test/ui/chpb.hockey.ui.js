const expectChai = require('chai').expect
const HockeyPage = require('../../pageobjects/HockeyPage')
const { showInnerMenu, hideInnerMenu } = require('../../utils/helper.js')
const {
  clubHeader,
  footerLinksText,
  bannersAttr,
  logoSize,
  sponsorCategoriesText,
  sponsorsNumber,
  sponsorsSrc
} = require('../../utils/constants')
const {
  topMenuElementsText,
  topMenuElementsLength,
  topMenuInnerElementsText,
  topMenuInnerElementsLength,
  socialMediaLinks,
  socialMediaLinksLength
} = require('../../utils/pageMenus')
const { bannersLinks, title } = require('../../utils/constants.hockey')
describe(`Should open Hockey page and check`, async function () {
  before(async function () {
    await HockeyPage.maximize()
    await HockeyPage.open()
  })
  it(`Cookies modal is displayed`, async function () {
    console.info(`Check Home page open and cookies modal is displayed`)
    await expect(HockeyPage.cookiesModal).toExist()
    await HockeyPage.cookiesAcceptBtn.waitForDisplayed()
  })
  it(`Hockey page header is ${clubHeader}`, async function () {
    console.info(`Check Hockey page header is ${clubHeader}`)
    await HockeyPage.acceptCookies()
    const headerText = await HockeyPage.header.waitAndGetText()
    expectChai(headerText).to.eq(clubHeader)
  })
  it(`Hockey page title is displayed`, async function () {
    console.info(`Hockey page title is displayed`)
    const title = await HockeyPage.title
    await expect(title).toBeDisplayed()
  })
  it(`Hockey page title is ${title}`, async function () {
    console.info(`Check Hockey page title is '${title}'`)
    const pageTitle = await HockeyPage.title.waitAndGetText()
    expectChai(pageTitle).to.eq(title)
  })
  it(`Home page club logotype is displayed`, async function () {
    console.info(`Home page club logotype is displayed`)
    const logotype = await HockeyPage.logotype
    await expect(logotype).toBeDisplayed()
  })
  it(`Home page club logotype has attribute 'sizes' equal to '${logoSize}'`, async function () {
    console.info(
      `Image banners have attribute 'data-sizes' equal to '${logoSize}'`
    )
    const logotype = await HockeyPage.logotype
    await expect(logotype).toHaveAttribute('sizes', logoSize)
  })
  it(`Hockey Page main image content is displayed`, async function () {
    console.info(`Hockey Page main image content is displayed`)
    await expect(HockeyPage.mainImg).toExist()
    await expect(HockeyPage.mainImg).toBeDisplayed()
  })
  it(`Top menu number of elements`, async function () {
    console.info(`Top menu number of elements`)
    const topMenuLength = await HockeyPage.topMenuDropdownElements
    await expect(topMenuLength).toBeElementsArrayOfSize(topMenuElementsLength)
  })
  it(`Top menu elements are displayed`, async function () {
    console.info(`Top menu elements are displayed`)
    await HockeyPage.header.waitForDisplayed()
    const topMenu = await HockeyPage.topMenuDropdownElements
    for (let el of topMenu) {
      await expect(el).toBeDisplayed()
    }
  })
  topMenuElementsText.forEach((el, i) => {
    it(`Top menu each element\'s text corresponds '${el}'`, async function () {
      console.info(`Top menu each element\'s text corresponds '${el}'`)
      const topMenu = await HockeyPage.topMenuDropdownElements
      expectChai(await topMenu[i].getText()).to.eq(el)
    })
  })
  it(`Top menu inner elements are displayed`, async function () {
    console.info(`Top menu inner elements are displayed`)
    await showInnerMenu(HockeyPage.topMenuContainer)
    const topMenuInner = await HockeyPage.topMenuInnerElements
    for (let el of topMenuInner) {
      await expect(el).toBeDisplayed()
    }
  })
  it(`Top menu number of inner elements`, async function () {
    console.info(`Top menu number of inner elements`)
    const topMenuInnerLength = await HockeyPage.topMenuInnerElements
    await expect(topMenuInnerLength).toBeElementsArrayOfSize(
      topMenuInnerElementsLength
    )
  })
  topMenuInnerElementsText.forEach((el, i) => {
    it(`Top menu each inner dropdown element\'s text corresponds '${el}'`, async function () {
      console.info(
        `Top menu each inner dropdown element\'s text corresponds '${el}'`
      )
      const topMenuInner = await HockeyPage.topMenuInnerElements
      expectChai(await topMenuInner[i].getText()).to.eq(el)
    })
  })
  it(`Top social links are displayed`, async function () {
    console.info(`Top social links are displayed`)
    await hideInnerMenu(HockeyPage.topMenuContainer)
    await HockeyPage.header.waitForDisplayed()
    const socialMedia = await HockeyPage.socialMediaLinksTop
    for (let el of socialMedia) {
      await expect(el).toBeDisplayed()
    }
  })
  it(`Top social links number of elements`, async function () {
    console.info(`Top social links number of elements`)
    const socialMediaLength = await HockeyPage.socialMediaLinksTop
    await expect(socialMediaLength).toBeElementsArrayOfSize(
      socialMediaLinksLength
    )
  })
  it(`Top social links href attribute against '${socialMediaLinks.join(
    ' , '
  )}'`, async function () {
    console.info(
      `Top social links href attribute against '${socialMediaLinks.join(
        ' , '
      )}'`
    )
    const socialLinks = await HockeyPage.socialMediaLinksTop.map(el =>
      el.getAttribute('href')
    )
    console.table(socialLinks)
    for (let i = 0; i < socialLinks.length; i++) {
      expectChai(socialLinks[i]).to.eq(socialMediaLinks[i])
    }
  })
  it(`Image banners on the Home page are displayed`, async function () {
    console.info(`Image banners on the Home page are displayed`)
    const banners = await HockeyPage.imageBanners
    for (let el of banners) {
      await expect(el).toBeDisplayed()
    }
  })
  it(`Image banners have attribute 'data-sizes' equal to '${bannersAttr}'`, async function () {
    console.info(
      `Image banners have attribute 'data-sizes' equal to '${bannersAttr}'`
    )
    const banners = await HockeyPage.imageBanners
    for (let el of banners) {
      await expect(el).toHaveAttribute('data-sizes', bannersAttr)
    }
  })
  it(`Image banners on the Home page href attribute against '${bannersLinks.join(
    ' , '
  )}'`, async function () {
    console.info(
      `Image banners on the Home page href attribute against '${bannersLinks.join(
        ' , '
      )}'`
    )
    const bannerHrefs = await HockeyPage.bannersLinks.map(el =>
      el.getAttribute('href')
    )
    console.table(bannerHrefs)
    for (let i = 0; i < bannerHrefs.length; i++) {
      expectChai(bannerHrefs[i]).to.eq(bannersLinks[i])
    }
  })
  it(`Footer on the Home page is displayed`, async function () {
    console.info(`Footer on the Home page is displayed`)
    const footer = await HockeyPage.footer
    await expect(footer).toBeDisplayed()
  })
  footerLinksText.forEach((el, i) => {
    it(`Footer links text corresponds '${el}'`, async function () {
      console.info(`Footer links text corresponds '${el}'`)
      const footerLinks = await HockeyPage.footerLinks.slice(0, -1)
      expectChai(await footerLinks[i].getText()).to.eq(el)
    })
  })
  sponsorCategoriesText.forEach((el, i) => {
    it(`Sponsor categories each element\'s text corresponds '${el}'`, async function () {
      console.info(
        `Sponsor categories each element\'s text corresponds '${el}'`
      )
      const sponsorCategories = await HockeyPage.sponsorsCategories
      expectChai(await sponsorCategories[i].getText()).to.eq(el)
    })
  })
  it(`Sponsors list number of elements is ${sponsorsNumber}`, async function () {
    console.info(`Sponsors list number of elements is ${sponsorsNumber}`)
    const sponsors = await HockeyPage.sponsorsList
    await expect(sponsors).toBeElementsArrayOfSize(sponsorsNumber)
  })
  it(`Sponsors list elements have attribute 'data-src' that contains '${sponsorsSrc}'`, async function () {
    console.info(
      `Sponsors list elements have attribute 'data-src' that contains '${sponsorsSrc}'`
    )
    const sponsors = await HockeyPage.sponsorsList
    for (let el of sponsors) {
      await expect(el).toHaveAttrContaining('data-src', sponsorsSrc)
    }
  })
})
