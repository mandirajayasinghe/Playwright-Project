import { test, expect, Page } from '@playwright/test';

const BASE_URL = 'https://www.swifttranslator.com/';

// ---------------- HELPER FUNCTION ----------------
async function translate(page, text) {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });

  const singlishInput = page.locator('textarea[placeholder*="Singlish"]');
  const sinhalaOutput = page.locator('.card:has(.panel-title:text("Sinhala")) .whitespace-pre-wrap');

  await singlishInput.fill('');
  await singlishInput.type(text, { delay: 30 });
  await singlishInput.press('Enter');

  // Wait until non-empty text appears
  await sinhalaOutput.waitFor({ state: 'visible', timeout: 30000 });
  await expect(sinhalaOutput).not.toHaveText('', { timeout: 30000 });

  return (await sinhalaOutput.innerText()).trim();
}

// ---------------- TEST SUITE ----------------

test.describe('Singlish → Sinhala Transliteration Tests', () => {

  // ---------------- Positive Functional ----------------

  test('Pos_Fun_0001: Simple present sentence', async ({ page }) => {
    const output = await translate(page, 'mama dhath madhinavaa');
    expect(output).toBe('මම දත් මදිනවා');
  });

   test('Pos_Fun_0002: Simple present sentence', async ({ page }) => {
    const output = await translate(page, 'suba udhaeesanak!');
    expect(output).toBe('සුබ උදෑසනක්!');
  });

  test('Pos_Fun_0003: Polite request', async ({ page }) => {
    const output = await translate(page, 'mata paeena poddak dhenna puLuvandha?');
    expect(output).toBe('මට පෑන පොඩ්ඩක් දෙන්න පුළුවන්ද?');
  });

  test('Pos_Fun_0004: Future tense', async ({ page }) => {
    const output = await translate(page, 'mama anidhdhata enavaa');
    expect(output).toBe('මම අනිද්දට එනවා');
  });

  test('Pos_Fun_0005: Past tense', async ({ page }) => {
    const output = await translate(page, 'mama giya maase rata giyaa');
    expect(output).toBe('මම ගිය මාසෙ රට ගියා');
  });

  test('Pos_Fun_0006: Negative sentence', async ({ page }) => {
    const output = await translate(page, 'mata badagini naee');
    expect(output).toBe('මට බඩගිනි නෑ');
  });

  test('Pos_Fun_0007: Compound sentence', async ({ page }) => {
    const output = await translate(page, 'mama adha godak vaeda kalaa , ee nisaa mahansiyi');
    expect(output).toBe('මම අද ගොඩක් වැඩ කලා , ඒ නිසා මහන්සියි');
  });

  test('Pos_Fun_0008: Imperative command', async ({ page }) => {
    const output = await translate(page, 'Ikmanin yanna');
    expect(output).toBe('ඉක්මනින් යන්න');
  });

  test('Pos_Fun_0009: Plural pronoun', async ({ page }) => {
    const output = await translate(page, 'eyaala veelaasanin giyaa');
    expect(output).toBe('එයාල වේලාසනින් ගියා');
  });

  test('Pos_Fun_0010: Mixed English term', async ({ page }) => {
    const output = await translate(page, 'mama ehema karanne naehae.');
    expect(output).toContain('මම එහෙම කරන්නේ නැහැ.');
  });

  test('Pos_Fun_0011: Place name', async ({ page }) => {
    const output = await translate(page, 'vaessa vunath api yanna epaeyi kiyalaa mama hithanavaa.');
    expect(output).toContain('වැස්ස වුනත් අපි යන්න එපැයි කියලා මම හිතනවා.');
  });

  test('Pos_Fun_0012: Currency format', async ({ page }) => {
    const output = await translate(page, 'api dhaen kaeema kanavaa.');
    expect(output).toContain('අපි දැන් කෑම කනවා.');
  });

  test('Pos_Fun_0013: Time format', async ({ page }) => {
    const output = await translate(page, 'oyaayi maayi eyaava hamuvenna yamu.');
    expect(output).toContain('ඔයායි මායි එයාව හමුවෙන්න යමු.');
  });

  test('Pos_Fun_0014: Date format', async ({ page }) => {
    const output = await translate(page, 'Lamayi paasal yanavaa.');
    expect(output).toContain('ළමයි පාසල් යනවා.');
  });

  test('Pos_Fun_0015: Measurement units', async ({ page }) => {
    const output = await translate(page, 'mata poddak inna oonee.');
    expect(output).toContain('මට පොඩ්ඩක් ඉන්න ඕනේ.');
  });

  test('Pos_Fun_0016: Greeting phrase', async ({ page }) => {
    const output = await translate(page, 'suba aluth avurudhdhak veevaa!');
    expect(output).toBe('සුබ අලුත් අවුරුද්දක් වේවා!');
  });

  test('Pos_Fun_0017: Informal request', async ({ page }) => {
    const output = await translate(page, 'oyaa kavadhdha enne?');
    expect(output).toContain('ඔයා කවද්ද එන්නෙ?');
  });

  test('Pos_Fun_0018: Present continuous action', async ({ page }) => {
    const output = await translate(page, 'mama haemadhaama paasal yanavaa');
    expect(output).toBe('මම හැමදාම පාසල් යනවා');
  });

  test('Pos_Fun_0019: Repeated emphasis', async ({ page }) => {
    const output = await translate(page, 'balanna balanna');
    expect(output).toBe('බලන්න බලන්න');
  });

  test('Pos_Fun_0020: Polite request', async ({ page }) => {
    const output = await translate(page, 'karuNaakaralaa oyaata eeka genalla dhenna puluvandha?');
    expect(output).toContain('කරුණාකරලා ඔයාට ඒක ගෙනල්ල දෙන්න පුලුවන්ද?');
  });

test('Pos_Fun_0021: Polite request', async ({ page }) => {
    const output = await translate(page, 'oyaa gedhara yanavanam apith ekka yamu');
    expect(output).toContain('ඔයා ගෙදර යනවනම් අපිත් එක්ක යමු');
  });

  test('Pos_Fun_0022: Polite request', async ({ page }) => {
    const output = await translate(page, 'adha api pansal yanavaa');
    expect(output).toContain('අද අපි පන්සල් යනවා');
  });

  test('Pos_Fun_0023: Polite request', async ({ page }) => {
    const output = await translate(page, 'heta dhina rajayee nivaadu dhinayak vana baevin heta dhina  paevathviimata thibuu siyaluma upakaaraka pQQthi nopavathina bava meyin dhanvaa sitimi. ema pQQthi sadhahaa venath dhinayak pasuva apa dhaenum dhennemu. namuth heta dhina paevaethviimata thibuu viBhahaga ee aakaarayenma pavathvana bavadha meyin dhanvaa sitimu. ee sadhahaa obata labaa dhii aethi velaavan thuladhii paeminenna.');
    expect(output).toContain('හෙට දින රජයේ නිවාඩු දිනයක් වන බැවින් හෙට දින  පැවත්වීමට තිබූ සියලුම උපකාරක පංති නොපවතින බව මෙයින් දන්වා සිටිමි. එම පංති සදහා වෙනත් දිනයක් පසුව අප දැනුම් දෙන්නෙමු. නමුත් හෙට දින පැවැත්වීමට තිබූ විභහග ඒ ආකාරයෙන්ම පවත්වන බවද මෙයින් දන්වා සිටිමු. ඒ සදහා ඔබට ලබා දී ඇති වෙලාවන් තුලදී පැමිනෙන්න.');
  });

test('Pos_Fun_0024: Polite request', async ({ page }) => {
    const output = await translate(page, 'supiriyak thamayi broo!');
    expect(output).toContain('සුපිරියක් තමයි බ්‍රෝ!');
  });
  // ---------------- Negative Functional ----------------

  test('Neg_Fun_0001: Joined words', async ({ page }) => {
    const output = await translate(page, 'adhakaeematikarasaayi');
    expect(output).not.toBe('අදකෑමටිකරසායි');
  });

  test('Neg_Fun_0002: Heavy typo', async ({ page }) => {
    const output = await translate(page, 'mee paarisaraya goddak lashshanai');
    expect(output).not.toBe('මේ පාරිසරය ගොඩ්ඩක් ලශ්ශනෛ');
  });

  test('Neg_Fun_0003: Random characters', async ({ page }) => {
    const output = await translate(page, 'dhjufg mee nivasa harima pirisidhuuyi');
    expect(output).toMatch(/[^\u0D80-\u0DFF]/);
  });

  test('Neg_Fun_0004: Repeated punctuation', async ({ page }) => {
    const output = await translate(page, 'oyaa vaththa pirisiDHAu kalaadha?????');
    expect(output).toContain('****');
  });

  test('Neg_Fun_0005: Emoji handling', async ({ page }) => {
    const output = await translate(page, 'api kohehari yamu adha havasata 🤓');
    expect(output).toContain('!!!');
  });

  test('Neg_Fun_0006: Numbers inside words', async ({ page }) => {
    const output = await translate(page, 'mama 678 gedhara nae');
    expect(output).toContain('###');
  });

  test('Neg_Fun_0007: Random symbols', async ({ page }) => {
    const output = await translate(page, 'oyaa edhaata ### yannee');
    expect(output).toContain('!!!');
  });

  test('Neg_Fun_0008: Invalid punctuation sequence', async ({ page }) => {
    const output = await translate(page, 'mama!!! karanavaa??');
    expect(output).toContain('###');
  });

  test('Neg_Fun_0009: Invalid characters', async ({ page }) => {
    const output = await translate(page, 'eyaala ??? giyaa');
    expect(output).toContain('$$$');
  });

  test('Neg_Fun_0010: Long repetitive input', async ({ page }) => {
    const longText = 'ammaa '.repeat(100);
    const output = await translate(page, longText);
    expect(output.length).toBeGreaterThan(100);
  });

  // ---------------- UI Test ----------------

  test('Pos_UI_0001: Real-time update', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

    const inputBox = page.locator('#singlishInput');
    const outputBox = page.locator('#sinhalaOutput');

    await inputBox.waitFor({ state: 'visible', timeout: 60000 });

    await inputBox.type('mama gedhara yanvaa', { delay: 100 });

    await expect(outputBox).not.toHaveText('', { timeout: 60000 });

    const output = await outputBox.textContent();

    expect(output?.trim()).toBe('මම ගෙදර යනවා');
  });

});