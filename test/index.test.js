const puppeteer = require('puppeteer');
let page;
let browser;
beforeAll(async()=>{
    browser = await puppeteer.launch({
    headless:true,
    timeout:0
    });
    page = await browser.newPage();
    }
);
afterAll(async()=>{
    await browser.close();
   }
);
jest.setTimeout(200000);
describe("Test Website functionalities",()=>
{
    test("loading Page", async()=>
    {
        await page.goto("http://localhost:8000/",{waitUntil:"domcontentloaded"});
        await page.screenshot(
            {
                path:"./screenshot.png"
            }
        );
        const pageTitle = await page.title();
        expect(pageTitle).toBe("Resource Hub | Just a Thought");
    }
    ); 
    test("entering texts into the search bar", async()=>
    {
        await page.waitForSelector("#autoComplete");
        await page.type("#autoComplete", "the");
        const text = await page.evaluate(()=> document.getElementById("autoComplete").value);
        expect(text).toBe("the");
    });
    test("check the results", async()=>
    {
        await page.waitForSelector("#autoComplete_list_1");
        //let results = await page.evaluate([document.querySelectorAll('.results')]);
        let thing = await page.evaluate(()=>
        {
            return document.querySelectorAll('.results')[2].textContent;
            
        })
        console.log(thing);
        expect(thing).toBe('Seeing Things Clearly resource');
    })
    test("check if particular card shows up", async()=>
    {
        await page.waitForSelector('.card-resources_Title');
        let visibleCard = await page.evaluate(()=>
        {
            let cards = document.querySelectorAll('.card-resources');
            for(i=0; i< cards.length; i++)
            {
                if(document.querySelectorAll('.card-resources_Title')[i].textContent == "Seeing Things Clearly resource")
                {
                    return cards[i].style.visibility;
                }
            }
        }
        )
        console.log(visibleCard);
        expect(visibleCard).toBe("visible");
    }
    );
    test("check if quick search buttons works",async()=>
    {
        await page.waitForSelector(".buttonWrapper_Button");
        let pressedButton = await page.evaluate(()=>
        {
            let buttons = document.querySelectorAll(".buttonWrapper_Button");
            buttons[0].click();
            let autoComplete = document.querySelector("#autoComplete");
            return autoComplete.value;
        })
        console.log(pressedButton);       
         expect(pressedButton).toBe("Anxiety");
    })
}
)