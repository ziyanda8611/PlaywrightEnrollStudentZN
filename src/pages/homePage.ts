import { Locator } from '@playwright/test';  
import { BasePage } from './BasePage';


export class HomePage extends BasePage {

    get verifyHomePage(): Locator {
        return this.page.getByRole('heading',{ name: 'Welcome back, Magaye! 👋' });
    }
    
 async verifyHomePageIsVisible(){
    await this.verifyElementVisible(this.verifyHomePage);
 }
}
