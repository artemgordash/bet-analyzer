import puppeteer from 'puppeteer';

const matchUrl = 'https://www.sofascore.com/cruz-azul-club-america/ONsXN';
const selectors = {
  teamNames: '//h2[@class="sc-87be47b1-1 epWIWm"]',
  playerName: '//div[contains(@class, "sc-f98cc691-7")]',
  substitutionPlayerName: '//span[@class="sc-5068292-4 reKeb" and string-length(text()) > 3]',
  teamLink: '//div[contains(@class, "sc-74da74c7-1")]//a',
  teamBestPlayers: '//div[contains(@class, "sc-18688171-0 fXAhuT fw-medium")]',
  ratingFilter: '//li[.="Rating"] | //button[.="Rating"]',
  goalsFilter: '//li[.="Goals"] | //button[.="Goals"]',
  assistsFilter: '//li[.="Assists"] | //button[.="Assists"]',
  clearancesFilter: '//li[.="Clearances per game"] | //button[.="Clearances per game"]',
  bigChancesFilter: '//li[.="Big chances created"] | //button[.="Big chances created"]',
  interceptionsFilter: '//li[.="Interceptions per game"] | //button[.="Interceptions per game"]',
  topName: '//div[contains(@class, "sc-18688171-0 fXAhuT fw-medium")]',
  topValue: '//div[contains(@class, "sc-cd4cfbdc-0 sc-a2e18b6f-2 hDkGff gpLVyV")]//div[@class="sc-492bf320-0 crIwBV"]',
  showMorePlayersButton: '//span[contains(@class, "sc-crHmcD cpSmgk") and .="Show more"]'
};

export default async function handler(req, res) {

  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true
  });
  const firstTeamPage = await browser.newPage();
  const secondTeamPage = await browser.newPage();
  const page = await browser.newPage();

  await page.setViewport({
    height: 600,
    width: 1300
  });
  await firstTeamPage.setViewport({
    height: 600,
    width: 1300
  });
  await secondTeamPage.setViewport({
    height: 600,
    width: 1300
  });

  console.log('Browser initialised');

  await page.goto(matchUrl, { waitUntil: 'networkidle2' });

  await page.waitForXPath(selectors.playerName);
  const lineUp = await page.$x(selectors.playerName).then(items =>
    Promise.all(items.map((el) => el.evaluate(el => el.textContent.replace(/^\(c\) /gm, '')))));

  const firstTeam = {};
  const secondTeam = {};

  await page.waitForXPath(selectors.teamNames);
  await page.$x(selectors.teamNames)
    .then(items => items[0].evaluate(el => el.textContent))
    .then(item => item.split(' - '))
    .then(names => {
      firstTeam.name = names[0];
      secondTeam.name = names[1];
    });

  console.log(firstTeam);
  console.log(secondTeam);

  firstTeam.substitutions = await page.$x(selectors.substitutionPlayerName).then(items =>
    Promise.all(items.map((el) => el.evaluate(el => el.textContent.replace(/^\(c\) /gm, '')))));

  secondTeam.substitutions = await page.$x(selectors.substitutionPlayerName).then(items =>
    Promise.all(items.map((el) => el.evaluate(el => el.textContent.replace(/^\(c\) /gm, '')))));

  firstTeam.lineUp = lineUp.slice(0, 11);
  secondTeam.lineUp = lineUp.slice(11);

  await page.waitForXPath(selectors.teamLink);
  const [firstTeamLink, secondTeamLink] = await page.$x(selectors.teamLink).then(items =>
    Promise.all(items.map(el => el.evaluate(el => el.href))));

  console.log(`Team links gotted: ${firstTeamLink}, ${secondTeamLink}`);

  await (firstTeamPage.goto(firstTeamLink), secondTeamPage.goto(secondTeamLink));
  const selectTopCategoryToParse = async (page, nextSelector, prevSelector) => {
    const [button] = await page.$x(prevSelector);
    await button.click();
    const [filterButton] = await page.$x(nextSelector);
    await filterButton.click();
    const [showMorePlayersButton] = await page.$x(selectors.showMorePlayersButton) || 0;
    await showMorePlayersButton && showMorePlayersButton.click();

  };

  await selectTopCategoryToParse(firstTeamPage, selectors.goalsFilter, selectors.ratingFilter);
  await selectTopCategoryToParse(secondTeamPage, selectors.goalsFilter, selectors.ratingFilter);

  const parseTopPlayersValue = async (page) => {
    return await page.$x(selectors.topValue).then(items =>
      Promise.all(items.map(async el => ({ 'value': await el.evaluate(el => el.textContent.replace(/^\(c\) /gm, '')) }))));
  };

  const parseTopPlayersName = async (page, arrayWithValues) => {
    return await page.$x(selectors.topName).then(item =>
      Promise.all(item.map(async (el, i) =>
        (Object.assign({ 'name': await el.evaluate(el => el.textContent.replace(/^\(c\) /gm)) }, arrayWithValues[i])))));
  };

  firstTeam.topScorers = await parseTopPlayersValue(firstTeamPage);
  firstTeam.topScorers = await parseTopPlayersName(firstTeamPage, firstTeam.topScorers);

  secondTeam.topScorers = await parseTopPlayersValue(secondTeamPage);
  secondTeam.topScorers = await parseTopPlayersName(secondTeamPage, secondTeam.topScorers);

  console.log('Top scorers parsed');
  console.log(firstTeam.topScorers);
  console.log(secondTeam.topScorers);


  await selectTopCategoryToParse(firstTeamPage, selectors.assistsFilter, selectors.goalsFilter);
  await selectTopCategoryToParse(secondTeamPage, selectors.assistsFilter, selectors.goalsFilter);

  firstTeam.topAssistents = await parseTopPlayersValue(firstTeamPage);
  firstTeam.topAssistents = await parseTopPlayersName(firstTeamPage, firstTeam.topAssistents);

  secondTeam.topAssistents = await parseTopPlayersValue(secondTeamPage);
  secondTeam.topAssistents = await parseTopPlayersName(secondTeamPage, secondTeam.topAssistents);

  console.log('Top assistents parsed');
  console.log(firstTeam.topAssistents);
  console.log(secondTeam.topAssistents);

  await selectTopCategoryToParse(firstTeamPage, selectors.clearancesFilter, selectors.assistsFilter);
  await selectTopCategoryToParse(secondTeamPage, selectors.clearancesFilter, selectors.assistsFilter);

  firstTeam.topClearance = await parseTopPlayersValue(firstTeamPage);
  firstTeam.topClearance = await parseTopPlayersName(firstTeamPage, firstTeam.topClearance);

  secondTeam.topClearance = await parseTopPlayersValue(secondTeamPage);
  secondTeam.topClearance = await parseTopPlayersName(secondTeamPage, secondTeam.topClearance);

  console.log('Top assistents parsed');
  console.log(firstTeam.topClearance);
  console.log(secondTeam.topClearance);

  await selectTopCategoryToParse(firstTeamPage, selectors.bigChancesFilter, selectors.clearancesFilter);
  await selectTopCategoryToParse(secondTeamPage, selectors.bigChancesFilter, selectors.clearancesFilter);

  firstTeam.topBigChances = await parseTopPlayersValue(firstTeamPage);
  firstTeam.topBigChances = await parseTopPlayersName(firstTeamPage, firstTeam.topBigChances);

  secondTeam.topBigChances = await parseTopPlayersValue(secondTeamPage);
  secondTeam.topBigChances = await parseTopPlayersName(secondTeamPage, secondTeam.topBigChances);

  console.log('Top big chances parsed');
  console.log(firstTeam.topBigChances);
  console.log(secondTeam.topBigChances);

  await selectTopCategoryToParse(firstTeamPage, selectors.interceptionsFilter, selectors.bigChancesFilter);
  await selectTopCategoryToParse(secondTeamPage, selectors.interceptionsFilter, selectors.bigChancesFilter);

  firstTeam.topInterceptions = await parseTopPlayersValue(firstTeamPage);
  firstTeam.topInterceptions = await parseTopPlayersName(firstTeamPage, firstTeam.topInterceptions);

  secondTeam.topInterceptions = await parseTopPlayersValue(secondTeamPage);
  secondTeam.topInterceptions = await parseTopPlayersName(secondTeamPage, secondTeam.topInterceptions);

  console.log('Top interceptions parsed');
  console.log(firstTeam.topInterceptions);
  console.log(secondTeam.topInterceptions);


  console.log('Finish');
  browser.close();

  res.status(200).send(
    JSON.stringify({
      firstTeam,
      secondTeam
    }, null, 2)
  );
}
